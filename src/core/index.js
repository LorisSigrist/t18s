import { basename, dirname, resolve } from "node:path";
import { readdir, writeFile, readFile } from "node:fs/promises";
import { YamlHandler } from "./file-handling/formats/yaml.js";
import { JsonHandler } from "./file-handling/formats/json.js";
import { Logger } from "./utils/logger.js";
import {
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
import { generateConfigModule } from "./codegen/config.js";
import { generateLoaderModule } from "./codegen/loaders.js";

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
  let hmrDispatch = () => {};

  /** Keeps track of the messages that exist & where to find them */
  const Catalogue = new MessageCatalogue(pluginConfig.locales);
  Catalogue.addEventListener(
    "messages_changed",
    async () => await regenerateDTS()
  );
  Catalogue.addEventListener("dictionary_added", (e) => {
    hmrDispatch("t18s:addDictionary", {
      locale: e.detail.locale,
      domain: e.detail.domain,
    });
  });
  Catalogue.addEventListener("dictionary_removed", (e) => {
    reporter.unregisterTranslations(e.detail.locale, e.detail.domain);
    hmrDispatch("t18s:removeDictionary", {
      locale: e.detail.locale,
      domain: e.detail.domain,
    });
  });
  Catalogue.addEventListener("dictionary_changed", (e) => {
    const { locale, domain } = e.detail;
    reporter.translationsChanged(locale, domain);
    hmrDispatch("t18s:reloadDictionary", { locale, domain });
  });

  /** Handles interactions with translation files */
  const fileHandler = new FileHandler([YamlHandler, JsonHandler]);

  /**
   * Register a new translation file.
   * @param {string} filePath Absolute path to the file that needs to be invalidated
   */
  async function registerTranslationFile(filePath) {
    const { locale, domain } = categorizeFile(filePath);
    if (!config.locales.includes(locale)) {
      reporter.warnAboutFileForInvalidLocale(filePath, locale);
      return;
    }

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
    reporter.translationsRegistered(locale, domain);
  }

  /**
   * Invalidate a _translation_ file, causing it to be reloaded.
   * Assumes the file is in the `translationsDir` directory.
   *
   * @param {string} filePath Absolute path to the file that needs to be invalidated
   */
  async function invalidateTranslationFile(filePath) {
    const { locale, domain } = categorizeFile(filePath);
    if (!config.locales.includes(locale)) {
      console.warn("Attempted to invalidate file for invalid locale: " + locale);
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
   * Safely list the files that are in the given directory. If the reading fails, an empty array is returned & a warning is logged.
   * @example ["file1.txt", "file2.txt"]
   *
   * @param {string} dir
   * @returns {Promise<string[]>}
   */
  async function getFilesInDir(dir) {
    const readdirResult = await buffer(readdir(dir));
    return new ResultMatcher(readdirResult)
      .catchAll((e) => {
        logger.warn("Could not read directory " + dir);
        return [];
      })
      .run();
  }

  /**
   * Reads the initial translation files and generates the initial code.
   * @param { import("./types.js").ResolvedPluginConfig} config
   */
  async function loadInitialLocales(config) {
    const files = await getFilesInDir(config.translationsDir);
    const paths = files.map((file) => resolve(config.translationsDir, file));

    /** @param {string} filePath */
    async function loadFile(filePath) {
      const { locale, domain } = categorizeFile(filePath);
      if (!config.locales.includes(locale)) {
        reporter.warnAboutFileForInvalidLocale(filePath, locale);
        return;
      }
      const readResult = await buffer(fileHandler.read(filePath));
      const keyVal = new ResultMatcher(readResult)
        .catch(LoadingException, (e) => {
          logger.error(e.message);
          return new Map();
        })
        .run();

      const { dictionary, invalidKeys } = compileToDictionary(keyVal, locale);
      if (invalidKeys) reporter.warnAboutInvalidKeys(filePath, invalidKeys);

      Catalogue.registerDictionary(locale, domain, filePath, dictionary);
    }

    //Load all locale-files
    await Promise.all(paths.map(loadFile));
  }

  async function regenerateDTS() {
    await writeFile(config.dtsPath, generateDTS(config, Catalogue));
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
    if (!second) return { locale: first, domain: config.defaultDomain };
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
        defaultDomain: pluginConfig.defaultDomain,
        locales: pluginConfig.locales,
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
        resolveConfigModuleId,
        resolveLoaderModuleId
      ];

      for (const resolver of resolvers) {
        const resolved = resolver(id);
        if (resolved) return resolved;
      }

      return null;
    },

    async load(id) {
      id = cleanUrl(id);

      const loaders = [
        loadMainModule,
        loadDictionaryModule,
        loadRuntimeModule,
        loadConfigModule,
        loadLoaderModule
      ];

      //Attempt to load the module from all loaders
      const loadingPromises = loaders.map((loader) =>
        loader(id, config, Catalogue)
      );
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
      hmrDispatch = createHMRDispatcher(server);
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
 * @param {import("./types.js").ResolvedPluginConfig} config
 * @param {MessageCatalogue} Catalogue
 * @returns {Promise<string | null>}
 */
async function loadMainModule(resolved_id, config, Catalogue) {
  if (resolved_id !== RESOLVED_VIRTUAL_MODULE_PREFIX) return null;
  return generateMainModuleCode();
}

/**
 * Returns the code for the dictionary module if the resolved_id is for the main module.
 * @param {string} resolved_id
 * @param {import("./types.js").ResolvedPluginConfig} config
 * @param {MessageCatalogue} Catalogue
 * @returns {Promise<string | null>}
 */
async function loadDictionaryModule(resolved_id, config, Catalogue) {
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
 *  @param {import("./types.js").ResolvedPluginConfig} config

 * @param {MessageCatalogue} Catalogue
 * @returns {Promise<string | null>}
 */
async function loadRuntimeModule(resolved_id, config, Catalogue) {
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
 * @param {string} resolved_id
 *  @param {import("./types.js").ResolvedPluginConfig} config
 *
 * @param {MessageCatalogue} Catalogue
 * @returns {Promise<string | null>}
 */
async function loadConfigModule(resolved_id, config, Catalogue) {
  if (resolved_id !== "\0t18s-internal:config") return null;
  return generateConfigModule(config);
}

/**
 * @param {string} resolved_id
 *  @param {import("./types.js").ResolvedPluginConfig} config
 *
 * @param {MessageCatalogue} Catalogue
 * @returns {Promise<string | null>}
 */
async function loadLoaderModule(resolved_id, config, Catalogue) {
  if (resolved_id !== "\0t18s-internal:loaders") return null;
  return generateLoaderModule(config, Catalogue);
};

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

/**
 * If the unresolved_id is for the t18s config, this function will resolve it.
 * @param {string} unresolved_id
 * @returns {string | null}
 */
function resolveConfigModuleId(unresolved_id) {
  if (unresolved_id !== "t18s-internal:config") return null;
  return "\0t18s-internal:config";
}

/**
 * @param {string} unresolved_id
 * @returns {string | null}
 */
function resolveLoaderModuleId(unresolved_id) {
  if (unresolved_id !== "t18s-internal:loaders") return null;
  return "\0t18s-internal:loaders";
}