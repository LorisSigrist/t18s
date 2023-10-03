import { basename, resolve } from "path";
import { readFile, readdir, writeFile } from "fs/promises";
import { YamlHandler } from "./formatHandlers/yaml/index.js";
import { JsonHandler } from "./formatHandlers/json/index.js";
import { Logger } from "./utils/logger.js";
import {
  RESOLVED_VIRTUAL_MODULE_PREFIX,
  VIRTUAL_MODULE_PREFIX,
  DEFAULT_CONFIG,
} from "./constants.js";
import { SvelteStoreAdapter } from "./adapter/svelte/store.js";
import { LoadingException } from "./formatHandlers/exception.js";

const HANDLERS = [YamlHandler, JsonHandler];

/**
 * @typedef {{
 *  translationsDir: string,
 *  dts: string,
 * }} T18sUserConfig Configuration options for the t18s plugin
 */

/**
 * TypeSafe translations for Svelte & SvelteKit.
 * @param {Partial<T18sUserConfig>} userConfig
 * @returns {import("vite").Plugin}
 */
export function t18s(userConfig = {}) {
  const logger = new Logger();
  const Adapter = new SvelteStoreAdapter();

  /** @type {import("./types.js").ResolvedPluginConfig} */
  let config;

  /** @type {import("./types.js").LocaleDictionaries} */
  const localeDictionaries = new Map();

  /**
   * Gets the correct handler for a file, using it's file extension.
   * Logs error messages if no handler could be found.
   *
   * @param {string} filePath
   * @returns {import("./formatHandlers/types.js").FormatHandler | null}
   */
  function getHandler(filePath) {
    const filename = basename(filePath);
    const fileExtension = filename.split(".").at(-1);

    if (!fileExtension) {
      logger.error(`Could not determine file extension for ${filePath}`);
      return null;
    }

    const handler = HANDLERS.find((l) =>
      l.fileExtensions.includes(fileExtension),
    );

    if (!handler) {
      logger.warn(
        `Could not find translation handler for .${fileExtension} files. Ignoring file ${filePath}`,
      );
      return null;
    }

    return handler;
  }

  /**
   * Register a new translation file.
   * @param {string} filePath Absolute path to the file that needs to be invalidated
   */
  async function addTranslationFile(filePath) {
    const handler = getHandler(filePath);
    if (!handler) return;

    const filename = basename(filePath);
    const fileExtension = filename.split(".").at(-1);
    const locale = filename.split(".")[0];

    if (!fileExtension) {
      logger.error(`Could not determine file extension for ${filePath}`);
      return;
    }

    //Attempt to read the file
    let textContent = "";
    try {
      textContent = await readFile(filePath, "utf-8");
    } catch (e) {
      logger.error(`Could not read file ${filePath}`);
      return;
    }

    /** @type {import("./types.js").Dictionary} */
    let dictionary;
    try {
      dictionary = await handler.load(filePath, textContent, locale);
    } catch (e) {
      if (!(e instanceof LoadingException)) throw e;
      logger.error(e.message);
    }

    localeDictionaries.set(locale, dictionary);

    await regenerateDTS();
    Adapter.HMRAddLocale(locale);
  }

  /**
   * Invalidate a _translation_ file, causing it to be reloaded.
   * Assumes the file is in the `translationsDir` directory.
   *
   * @param {string} filePath Absolute path to the file that needs to be invalidated
   */
  async function invalidateTranslationFile(filePath) {
    const handler = getHandler(filePath);
    if (!handler) return;

    const filename = basename(filePath);
    const fileExtension = filename.split(".").at(-1);
    const locale = filename.split(".")[0];

    if (!fileExtension) {
      logger.error(`Could not determine file extension for ${filePath}`);
      return;
    }
    const textContent = await readFile(filePath, "utf-8");

    /** @type {import("./types.js").Dictionary} */
    let dictionary;
    try {
      dictionary = await handler.load(filePath, textContent, locale);
    } catch (e) {
      if (!(e instanceof LoadingException)) throw e;
      logger.error(e.message);
    }

    localeDictionaries.set(locale, dictionary);

    await regenerateDTS();
    Adapter.HMRInvalidateLocale(locale);
  }

  /**
   * Remove a _translation_ file.
   * Assumes the file is in the `translationsDir` directory.
   * @param {string} file Absolute path to the translation file that no longer exists
   * @returns void
   */
  async function removeTranslationFile(file) {
    const filename = basename(file);
    const locale = filename.split(".")[0];

    localeDictionaries.delete(locale);

    await regenerateDTS();
    Adapter.HMRRemoveLocale(locale);
  }

  async function regenerateDTS() {
    const dts = Adapter.getTypeDefinition(localeDictionaries);
    await writeFile(config.dtsPath, dts, { encoding: "utf-8" });
  }

  /**
   * Reads the initial translation files and generates the initial code.
   * @param { import("./types.js").ResolvedPluginConfig} config
   */
  async function init(config) {
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
   * Checks if the given path is a translation file that should be handled by this plugin.
   * @param {string} path
   * @returns {boolean}
   */
  const isTranslationFile = (path) => path.startsWith(config.translationsDir);

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
        fallbackLocale: "en",
      };

      await init(config);
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
      id = id.split("?")[0]; //Remove query parameters
      if (!id.startsWith(RESOLVED_VIRTUAL_MODULE_PREFIX)) return;

      if (id === RESOLVED_VIRTUAL_MODULE_PREFIX) {
        return Adapter.getMainCode(localeDictionaries);
      }

      const locale = id.split("/")[2];
      return Adapter.getDictionaryCode(
        localeDictionaries.get(locale) || new Map(),
      );
    },

    configureServer(server) {
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

      Adapter.useServer(server);
    },
  };
}
