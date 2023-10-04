import { basename, resolve } from "path";
import { readdir, writeFile } from "fs/promises";
import { YamlHandler } from "./file-handling/formats/yaml.js";
import { JsonHandler } from "./file-handling/formats/json.js";
import { Logger } from "./utils/logger.js";
import {
  RESOLVED_VIRTUAL_MODULE_PREFIX,
  VIRTUAL_MODULE_PREFIX,
  DEFAULT_CONFIG,
} from "./constants.js";
import { SvelteStoreAdapter } from "./adapter/svelte/index.js";
import { FileHandler } from "./file-handling/fileHandler.js";
import { LoadingException } from "./file-handling/exception.js";

export { t18sToolkit } from "./toolkit/index.js";

/**
 * @typedef {{
 *  translationsDir: string,
 *  dts: string,
 *  verbose: boolean,
 * }} T18sUserConfig Configuration options for the t18s plugin
 */

/**
 * TypeSafe translations for Svelte & SvelteKit.
 * @param {Partial<T18sUserConfig>} userConfig
 * @returns {import("vite").Plugin}
 */
export function t18s(userConfig = {}) {
  /** @type {import("./types.js").ResolvedPluginConfig} */
  let config;

  /** @type {Logger} */
  let logger;

  /** @type {SvelteStoreAdapter} */
  let adapter;

  const fileHandler = new FileHandler([YamlHandler, JsonHandler]);

  /** @type {import("./types.js").LocaleDictionaries} */
  const localeDictionaries = new Map();

  /**
   * Register a new translation file.
   * @param {string} filePath Absolute path to the file that needs to be invalidated
   */
  async function addTranslationFile(filePath) {
    const locale = getLocale(filePath);

    try {
      const dictionary = await fileHandler.handle(filePath, locale);
      localeDictionaries.set(locale, dictionary);
    } catch (e) {
      if (!(e instanceof LoadingException)) throw e;
      logger.error(e.message);
    }

    await regenerateDTS();
    adapter.HMRAddLocale(locale);
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
      const dictionary = await fileHandler.handle(filePath, locale);
      localeDictionaries.set(locale, dictionary);
    } catch (e) {
      if (!(e instanceof LoadingException)) throw e;
      logger.error(e.message);
    }

    await regenerateDTS();
    adapter.HMRInvalidateLocale(locale);
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
    adapter.HMRRemoveLocale(locale);
  }

  async function regenerateDTS() {
    const dts = adapter.getTypeDefinition(localeDictionaries);
    await writeFile(config.dtsPath, dts, { encoding: "utf-8" });
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
    await Promise.all(paths.map(invalidateTranslationFile));
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

  return {
    name: "t18s",
    enforce: "pre",

    async configResolved(resolvedConfig) {
      const fullUserConfig = { ...DEFAULT_CONFIG, ...userConfig };

      config = {
        dtsPath: resolve(resolvedConfig.root, fullUserConfig.dts),
        translationsDir: resolve(
          resolvedConfig.root,
          fullUserConfig.translationsDir,
        ),
        verbose: fullUserConfig.verbose,
      };

      logger = new Logger(config.verbose);
      adapter = new SvelteStoreAdapter(config);

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
      id = id.split("?")[0] ?? ""; //Remove query parameters
      if (!id.startsWith(RESOLVED_VIRTUAL_MODULE_PREFIX)) return;

      if (id === RESOLVED_VIRTUAL_MODULE_PREFIX) {
        return adapter.getMainCode(localeDictionaries);
      }

      const locale = id.split("/")[2];
      if (!locale) return;
      return adapter.getDictionaryCode(
        localeDictionaries.get(locale) || new Map(),
      );
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

      adapter.useServer(server);
    },
  };
}
