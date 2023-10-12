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
import { ResultMatcher } from "./utils/resultMatcher.js";
import { buffer } from "./utils/bufferPromise.js";
import { LocaleRegistry, LocaleNotFoundException } from "./localeRegistry.js";

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

  const registry = new LocaleRegistry();

  registry.addEventListener("changed", async () => await regenerateDTS());
  registry.addEventListener("locale_added", (e) => {
    triggerHMREvent("t18s:createLocale", e.detail.locale);
    reporter.localeCreated(e.detail.locale);
  });
  registry.addEventListener("locale_removed", (e) => {
    triggerHMREvent("t18s:removeLocale", e.detail.locale);
    reporter.localeDeleted(e.detail.locale);
  });
  registry.addEventListener("locale_updated", (e) => {
    triggerHMREvent("t18s:invalidateLocale", e.detail.locale);
    reporter.localeUpdated(e.detail.locale);
  });

  /** Handles interactions with translation files */
  const fileHandler = new FileHandler([YamlHandler, JsonHandler]);

  /**
   * Register a new translation file.
   * @param {string} filePath Absolute path to the file that needs to be invalidated
   */
  async function registerTranslationFile(filePath) {
    const locale = getLocale(filePath);

    if (registry.hasLocale(locale)) {
      logger.error(
        `Locale ${locale} already exists. Skipping file ${filePath}`,
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
    registry.registerLocale(locale, filePath, dictionary);
  }

  /**
   * Invalidate a _translation_ file, causing it to be reloaded.
   * Assumes the file is in the `translationsDir` directory.
   *
   * @param {string} filePath Absolute path to the file that needs to be invalidated
   */
  async function invalidateTranslationFile(filePath) {
    const locale = getLocale(filePath);

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
    registry.setDictionary(locale, dictionary);
  }

  /**
   * @param {string} filePath Absolute path to the translation file that no longer exists
   * @returns void
   */
  function unregisterTranslationFile(filePath) {
    registry.unregisterLocale(getLocale(filePath));
  }

  /**
   * Sets (create or overwrite) the message for a given key and locale.   *
   * @param {string} locale
   * @param {string} key
   * @param {string} message_src
   */
  async function setMessage(locale, key, message_src) {
    const filePath = registry.getFile(locale);
    fileHandler.setPath(filePath, key, message_src);
  }

  /**
   * Reads the initial translation files and generates the initial code.
   * @param { import("./types.js").ResolvedPluginConfig} config
   */
  async function loadInitialLocales(config) {
    const readdirResult = await buffer(readdir(config.translationsDir));

    const files = new ResultMatcher(readdirResult)
      .catch(LoadingException, (e) => {
        logger.error("Could not read translation directory\n" + e);
        return [];
      })
      .run();

    const paths = files.map((file) => resolve(config.translationsDir, file));

    /** @param {string} path */
    async function loadFile(path) {
      const locale = getLocale(path);
      const readResult = await buffer(fileHandler.read(path));
      const keyVal = new ResultMatcher(readResult)
        .catch(LoadingException, (e) => {
          logger.error(e.message);
          return new Map();
        })
        .run();

      const { dictionary, invalidKeys } = compileToDictionary(keyVal, locale);
      if (invalidKeys) reporter.warnAboutInvalidKeys(path, invalidKeys);

      registry.registerLocale(locale, path, dictionary);
    }

    //Load all locale-files
    await Promise.all(paths.map(loadFile));
  }

  async function regenerateDTS() {
    const dts = generateDTS(registry.getDictionaries());
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
        `Could not trigger HMR event '${event}' for locale '${locale}' because the viteDevServer is not available. This should never happen.`,
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
          pluginConfig.translationsDir,
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
          RESOLVED_VIRTUAL_MODULE_PREFIX,
        );
      }
    },

    load(id) {
      id = cleanUrl(id);
      if (!id.startsWith(RESOLVED_VIRTUAL_MODULE_PREFIX)) return;

      if (id === RESOLVED_VIRTUAL_MODULE_PREFIX) {
        const locales = registry.getLocales();
        return generateMainModuleCode(locales, config.verbose);
      }

      const locale = id.split("/")[2];
      if (!locale) return;

      const dictionary = registry.getDictionary(locale);
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

      server.watcher.on("unlink", async (filePath) => {
        if (!isTranslationFile(filePath)) return;
        unregisterTranslationFile(filePath);
      });

      server.watcher.on("add", async (filePath) => {
        if (!isTranslationFile(filePath)) return;
        await registerTranslationFile(filePath);
      });

      server.watcher.on("change", async (filePath) => {
        if (!isTranslationFile(filePath)) return;
        await invalidateTranslationFile(filePath);
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
