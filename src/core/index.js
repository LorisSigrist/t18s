import { basename, dirname, resolve } from "node:path";
import { readdir, writeFile, readFile } from "node:fs/promises";
import { YamlHandler } from "./file-handling/formats/yaml.js";
import { JsonHandler } from "./file-handling/formats/json.js";
import { Logger } from "./utils/logger.js";
import {
  DEFAULT_DOMAIN,
  RESOLVED_VIRTUAL_MODULE_PREFIX,
  VIRTUAL_MODULE_PREFIX,
} from "./constants.js";
import { FileHandler } from "./file-handling/fileHandler.js";
import { LoadingException } from "./file-handling/exception.js";
import { generateDTS } from "./codegen/dts.js";
import { generateDictionaryModule } from "./codegen/dictionary.js";
import { generateMainModuleCode } from "./codegen/main.js";
import { compileToDictionary } from "./compiler/index.js";
import { Reporter } from "./utils/reporter.js";
import { ResultMatcher } from "./utils/resultMatcher.js";
import { buffer } from "./utils/bufferPromise.js";
import {
  MessageCatalogue,
  LocaleNotFoundException,
} from "./MessageCatalogue.js";
import { normalizePath } from "vite";
import { fileURLToPath } from "node:url";
import { cleanUrl } from "./utils/id.js";
import { existsSync } from "node:fs";
import { createHMRDispatcher } from "./HMR.js";

/**
 * TypeSafe translations for Svelte & SvelteKit.
 * @param {import("../types.js").t18sFullConfig} pluginConfig
 * @returns {import("vite").Plugin}
 */
export function t18sCore(pluginConfig) {
  /** @type {import("./types.js").ResolvedPluginConfig} */
  let config;

  /** @type {Logger} */
  let logger;

  /** @type {Reporter} */
  let reporter;

  /** @type {import("vite").ViteDevServer | null}*/
  let viteDevServer = null;

  /**
   * Dispatch an HMR event to the client.
   * @type {import("./HMR.js").HMREventDispatcher}
   */
  let dispatch = () => {};

  /** Keeps track of the messages that exist & where to find them */
  const Catalogue = new MessageCatalogue();

  Catalogue.addEventListener("changed", async () => await regenerateDTS());
  Catalogue.addEventListener("dictionary_added", (e) => {
    reporter.localeCreated(e.detail.locale);
    dispatch("t18s:addDictionary", {
      locale: e.detail.locale,
      domain: e.detail.domain,
    });
  });
  Catalogue.addEventListener("dictionary_removed", (e) => {
    reporter.localeDeleted(e.detail.locale);
    dispatch("t18s:removeDictionary", { locale: e.detail.locale, domain: e.detail.domain });
  });
  Catalogue.addEventListener("dictionary_changed", (e) => {
    reporter.localeUpdated(e.detail.locale);
    dispatch("t18s:reloadDictionary", { locale: e.detail.locale, domain: e.detail.domain });
  });

  /** Handles interactions with translation files */
  const fileHandler = new FileHandler([YamlHandler, JsonHandler]);

  /**
   * Register a new translation file.
   * @param {string} filePath Absolute path to the file that needs to be invalidated
   */
  async function registerTranslationFile(filePath) {
    const { locale, domain } = categorizeFile(filePath);

    if (Catalogue.hasDictionary(locale, domain)) {
      logger.error(
        `Locale ${locale} already exists. Skipping file ${filePath}`
      );
      return;
    }

    //Try to read the file & buffer the result
    const bufferedFileRead = await buffer(fileHandler.read(filePath));

    const keyVal = new ResultMatcher(bufferedFileRead)
      .catch(LoadingException, (e) => {
        logger.error(e.message);
        return new Map();
      })
      .run();

    const { dictionary, invalidKeys } = compileToDictionary(keyVal, locale);
    if (invalidKeys) reporter.warnAboutInvalidKeys(filePath, invalidKeys);
    Catalogue.registerDictionary(locale, domain, filePath, dictionary);
  }

  /**
   * Invalidate a _translation_ file, causing it to be reloaded.
   * Assumes the file is in the `translationsDir` directory.
   *
   * @param {string} filePath Absolute path to the file that needs to be invalidated
   */
  async function invalidateTranslationFile(filePath) {
    const { locale, domain } = categorizeFile(filePath);

    //Try to read the file & buffer the result
    const bufferedFileRead = await buffer(fileHandler.read(filePath));

    const keyVal = new ResultMatcher(bufferedFileRead)
      .catch(LoadingException, (e) => {
        logger.error(e.message);
        return new Map();
      })
      .run();

    const { dictionary, invalidKeys } = compileToDictionary(keyVal, locale);

    if (invalidKeys) reporter.warnAboutInvalidKeys(filePath, invalidKeys);
    Catalogue.setDictionary(locale, domain, dictionary);
  }

  /**
   * @param {string} filePath Absolute path to the translation file that no longer exists
   * @returns void
   */
  const unregisterTranslationFile = (filePath) => {
    const { locale, domain } = categorizeFile(filePath);
    Catalogue.unregisterDictionary(locale, domain);
  };

  /**
   * Sets (create or overwrite) the message for a given key and locale.   *
   * @param {string} locale
   * @param {string} domain
   * @param {string} key
   * @param {string} message_src
   */
  async function setMessage(locale, domain, key, message_src) {
    const filePath = Catalogue.getFile(locale, domain);
    fileHandler.setPath(filePath, key, message_src);
  }

  /**
   * Reads the initial translation files and generates the initial code.
   * @param { import("./types.js").ResolvedPluginConfig} config
   */
  async function loadInitialLocales(config) {
    const readdirResult = await buffer(readdir(config.translationsDir));

    const files = new ResultMatcher(readdirResult)
      .catchAll((e) => {
        logger.warn("Could not read translation directory\n" + e);
        return [];
      })
      .run();

    const paths = files.map((file) => resolve(config.translationsDir, file));

    /** @param {string} path */
    async function loadFile(path) {
      const { locale, domain } = categorizeFile(path);
      const readResult = await buffer(fileHandler.read(path));
      const keyVal = new ResultMatcher(readResult)
        .catch(LoadingException, (e) => {
          logger.error(e.message);
          return new Map();
        })
        .run();

      const { dictionary, invalidKeys } = compileToDictionary(keyVal, locale);
      if (invalidKeys) reporter.warnAboutInvalidKeys(path, invalidKeys);

      Catalogue.registerDictionary(locale, domain, path, dictionary);
    }

    //Load all locale-files
    await Promise.all(paths.map(loadFile));
  }

  async function regenerateDTS() {
    await writeFile(config.dtsPath, generateDTS(Catalogue));
  }

  /**
   * Categorizes to which locale & domain a given file belongs.
   * @param {string} path
   * @returns {{locale: string, domain: string}}
   */
  const categorizeFile = (path) => {
    const filename = basename(path).split(".").slice(0, -1).join(".");

    const [first, second] = filename.split(".");
    if (!first) throw new Error(`Could not determine locale for ${path}`);
    if (!second) return { locale: first, domain: DEFAULT_DOMAIN };
    return { locale: second, domain: first };
  };

  return {
    name: "t18s",
    enforce: "pre",

    async configResolved(resolvedConfig) {
      config = {
        dtsPath: resolve(resolvedConfig.root, pluginConfig.dts),
        translationsDir: resolve(
          resolvedConfig.root,
          pluginConfig.translationsDir
        ),
        verbose: pluginConfig.verbose,
      };

      logger = new Logger(resolvedConfig, config.verbose);
      reporter = new Reporter(logger);

      await loadInitialLocales(config);
    },

    resolveId(id) {
      id = cleanUrl(id);

      const resolvers = [
        resolveDictionaryModuleId,
        resolveMainModuleId,
        resolveRuntimeId,
      ];

      for (const resolver of resolvers) {
        const resolved = resolver(id);
        if (resolved) return resolved;
      }

      return null;
    },

    async load(id) {
      id = cleanUrl(id);

      const loaders = [loadMainModule, loadDictionaryModule, loadRuntimeModule];

      //Attempt to load the module from all loaders
      const loadingPromises = loaders.map((loader) => loader(id, Catalogue));
      const results = await Promise.allSettled(loadingPromises);

      //Pick the fulfilled result. There should only be one, otherwise we have a bug.
      for (const result of results) {
        if (result.status !== "fulfilled") continue;
        if (result.value) return result.value;
      }

      //If none of the loaders could load the module, return null.
      return null;
    },

    configureServer(server) {
      /**
       * Checks if we should react to changes made to the given path.
       * @param {string} path
       * @returns {boolean}
       */
      const fileInTranslationDir = (path) =>
        path.startsWith(config.translationsDir);

      server.watcher.on("unlink", async (filePath) => {
        if (!fileInTranslationDir(filePath)) return;
        unregisterTranslationFile(filePath);
      });

      server.watcher.on("add", async (filePath) => {
        if (!fileInTranslationDir(filePath)) return;
        await registerTranslationFile(filePath);
      });

      server.watcher.on("change", async (filePath) => {
        if (!fileInTranslationDir(filePath)) return;
        await invalidateTranslationFile(filePath);
      });

      server.ws.on("t18s:add-message", (event) => {
        setMessage(event.locale, event.domain, event.key, event.value);
      });

      viteDevServer = server;
      dispatch = createHMRDispatcher(server);
    },
  };
}

function getRuntimeEntryPath() {
  const thisModulePath = normalizePath(dirname(fileURLToPath(import.meta.url)));
  return thisModulePath.replace(
    /\/t18s\/src\/core$/,
    "/t18s/src/core/runtime/"
  );
}

/**
 * Returns the code for the main module if the resolved_id is for the main module.
 * @param {string} resolved_id
 * @param {MessageCatalogue} Catalogue
 * @returns {Promise<string | null>}
 */
async function loadMainModule(resolved_id, Catalogue) {
  if (resolved_id !== RESOLVED_VIRTUAL_MODULE_PREFIX) return null;
  return generateMainModuleCode(Catalogue, false);
}

/**
 * Returns the code for the dictionary module if the resolved_id is for the main module.
 * @param {string} resolved_id
 * @param {MessageCatalogue} Catalogue
 * @returns {Promise<string | null>}
 */
async function loadDictionaryModule(resolved_id, Catalogue) {
  if (!resolved_id.startsWith("\0t18s-dictionary:")) return null;

  const [_, locale, domain] = resolved_id.split(":");
  if (!locale || !domain) return null;

  const dictionary = Catalogue.getDictionary(locale, domain);

  return dictionary
    ? generateDictionaryModule(dictionary)
    : "export default {}";
}

/**
 * If the id is an id for the t18s-runtime, this function will load the runtime
 * @param {string} resolved_id
 * @param {MessageCatalogue} Catalogue
 * @returns {Promise<string | null>}
 */
async function loadRuntimeModule(resolved_id, Catalogue) {
  if (!resolved_id.startsWith(getRuntimeEntryPath())) return null;

  //Manually read the file content to bypass vite's fs.allow check
  if (existsSync(resolved_id)) {
    try {
      const contents = await readFile(resolved_id, "utf-8");
      return contents;
    } catch (e) {
      console.error(`[t18s-runtime] failed to read file: ${resolved_id}`);
    }
  }
  return null;
}

/**
 * If the unresolved_id is for the t18s-runtime, this function will resolve it.
 * @param {string} unresolved_id
 * @returns {string | null}
 */
function resolveRuntimeId(unresolved_id) {
  if (!unresolved_id.startsWith("$t18s-runtime:")) return null;
  return unresolved_id.replace("$t18s-runtime:", getRuntimeEntryPath());
}

/**
 * If the unresolved_id is for a t18s dictionary, this function will resolve it.
 * Dictionary modules have the format "t18s-dictionary:<locale>:<domain>"
 *
 * @param {string} unresolved_id
 * @returns {string | null}
 */
function resolveDictionaryModuleId(unresolved_id) {
  if (!unresolved_id.startsWith("t18s-dictionary:")) return null;

  const [_, locale, domain] = unresolved_id.split(":");
  if (!locale || !domain) return null;

  const resolved_id = "\0" + unresolved_id;
  return resolved_id;
}

/**
 * If the unresolved_id is for a t18s dictionary, this function will resolve it.
 * @param {string} unresolved_id
 * @returns {string | null}
 */
function resolveMainModuleId(unresolved_id) {
  if (unresolved_id !== VIRTUAL_MODULE_PREFIX) return null;
  return RESOLVED_VIRTUAL_MODULE_PREFIX;
}
