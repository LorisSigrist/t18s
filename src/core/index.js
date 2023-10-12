import { basename, resolve } from "path";
import { readdir, writeFile } from "fs/promises";
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

  /** @type {import("./types.js").LocaleDictionaries} */
  const localeDictionaries = new Map();

  const fileHandler = new FileHandler([YamlHandler, JsonHandler]);

  /**
   * Register a new translation file.
   * @param {string} filePath Absolute path to the file that needs to be invalidated
   */
  async function addTranslationFile(filePath) {
    const locale = getLocale(filePath);

    try {
      const keyVal = await fileHandler.handle(filePath);
      const { dictionary, invalidKeys } = compileToDictionary(keyVal, locale);
      if (invalidKeys) reporter.warnAboutInvalidKeys(filePath, invalidKeys);
      localeDictionaries.set(locale, dictionary);
    } catch (e) {
      if (!(e instanceof LoadingException)) throw e;
      logger.error(e.message);
    }

    await regenerateDTS();
    triggerHMREvent("t18s:createLocale", locale);
    reporter.localeCreated(locale);
  }

  /**
   * Invalidate a _translation_ file, causing it to be reloaded.
   * Assumes the file is in the `translationsDir` directory.
   *
   * @param {string} filePath Absolute path to the file that needs to be invalidated
   */
  async function invalidateTranslationFile(filePath) {
    const locale = getLocale(filePath);

    try {
      const keyVal = await fileHandler.handle(filePath);
      const { dictionary, invalidKeys } = compileToDictionary(keyVal, locale);

      if (invalidKeys) reporter.warnAboutInvalidKeys(filePath, invalidKeys);
      else reporter.localeUpdated(locale);

      localeDictionaries.set(locale, dictionary);
    } catch (e) {
      if (!(e instanceof LoadingException)) throw e;
      logger.error(e.message);
    }

    await regenerateDTS();
    triggerHMREvent("t18s:invalidateLocale", locale);
  }

  /**
   * Remove a _translation_ file.
   * Assumes the file is in the `translationsDir` directory.
   * @param {string} filePath Absolute path to the translation file that no longer exists
   * @returns void
   */
  async function removeTranslationFile(filePath) {
    const filename = basename(filePath);
    const locale = filename.split(".")[0];

    if (!locale) throw new Error("Could not determine locale for ${filePath}");
    localeDictionaries.delete(locale);

    await regenerateDTS();
    triggerHMREvent("t18s:removeLocale", locale);
    reporter.localeDeleted(locale);
  }

  /**
   * Sets (create or overwrite) the message for a given key and locale.   *
   * @param {string} locale
   * @param {string} key
   * @param {string} message_src
   */
  async function setMessage(locale, key, message_src) {
    console.log("setMessage", locale, key, message_src);
  }

  /**
   * Reads the initial translation files and generates the initial code.
   * @param { import("./types.js").ResolvedPluginConfig} config
   */
  async function loadInitialLocales(config) {
    /** @type {string[]} */
    let files = [];
    try {
      files = await readdir(config.translationsDir);
    } catch (e) {
      logger.error("Could not read translation directory\n" + e);
      return;
    }
    const paths = files.map((file) => resolve(config.translationsDir, file));

    /** @param {string} path */
    async function loadFile(path) {
      const locale = getLocale(path);
      try {
        const keyVal = await fileHandler.handle(path);
        const { dictionary, invalidKeys } = compileToDictionary(keyVal, locale);
        if (invalidKeys) reporter.warnAboutInvalidKeys(path, invalidKeys);
        localeDictionaries.set(locale, dictionary);
      } catch (e) {
        if (!(e instanceof LoadingException)) throw e;
        logger.error(e.message);
      }
    }

    //Load all locale-files
    await Promise.all(paths.map(loadFile));

    //Generate Typedef
    await regenerateDTS();
  }

  async function regenerateDTS() {
    const dts = generateDTS(localeDictionaries);
    await writeFile(config.dtsPath, dts, { encoding: "utf-8", flag: "w" });
  }

  /**
   * Resolves the locale a given path belongs to.
   * @param {string} path
   * @returns {string}
   *
   * @throws {Error} If the path does not belong to any locale
   */
  const getLocale = (path) => {
    const filename = basename(path);
    const locale = filename.split(".")[0];
    if (!locale) throw new Error("Could not determine locale for ${filePath}");
    return locale;
  };

  /**
   * Triggers a HMR event, causing the browser to react to translation changes.
   *
   * @param {"t18s:createLocale" | "t18s:invalidateLocale" | "t18s:removeLocale"} event
   * @param {string} locale
   * @returns {void}
   */
  function triggerHMREvent(event, locale) {
    if (viteDevServer) {
      viteDevServer.ws.send({
        type: "custom",
        event,
        data: {
          locale,
        },
      });
    } else {
      logger.error(
        `Could not trigger HMR event '${event}' for locale '${locale}' beacuase the viteDevServer is not available. This should never happen.`
      );
    }
  }

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
      if (id.startsWith(VIRTUAL_MODULE_PREFIX)) {
        return id.replace(
          VIRTUAL_MODULE_PREFIX,
          RESOLVED_VIRTUAL_MODULE_PREFIX
        );
      }
    },

    load(id) {
      id = cleanUrl(id);
      if (!id.startsWith(RESOLVED_VIRTUAL_MODULE_PREFIX)) return;

      if (id === RESOLVED_VIRTUAL_MODULE_PREFIX) {
        const locales = [...localeDictionaries.keys()];
        return generateMainModuleCode(locales, config.verbose);
      }

      const locale = id.split("/")[2];
      if (!locale) return;

      const dictionary = localeDictionaries.get(locale);
      if (!dictionary) return;

      return generateDictionaryModule(dictionary);
    },

    configureServer(server) {
      /**
       * Checks if we should react to changes made to the given path.
       * @param {string} path
       * @returns {boolean}
       */
      const isTranslationFile = (path) =>
        path.startsWith(config.translationsDir);

      server.watcher.on("unlink", async (path) => {
        if (!isTranslationFile(path)) return;
        await removeTranslationFile(path);
      });

      server.watcher.on("add", async (path) => {
        if (!isTranslationFile(path)) return;
        await addTranslationFile(path);
      });

      server.watcher.on("change", async (path) => {
        if (!isTranslationFile(path)) return;
        await invalidateTranslationFile(path);
      });

      server.ws.on("t18s:add-message", (event) => {
        setMessage(event.locale, event.key, event.value);
      });

      viteDevServer = server;
    },
  };
}

/**
 * Remove hash and query parameters from a url.
 * @param {string} url
 */
function cleanUrl(url) {
  const postfixRE = /[?#].*$/s;
  return url.replace(postfixRE, "");
}
