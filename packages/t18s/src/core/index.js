import { resolve } from "node:path";
import { readdir, writeFile } from "node:fs/promises";
import { YamlHandler } from "./file-handling/formats/yaml.js";
import { JsonHandler } from "./file-handling/formats/json.js";
import { Logger } from "./utils/logger.js";
import { FileHandler } from "./file-handling/fileHandler.js";
import { LoadingException } from "./file-handling/exception.js";
import { generateDTS } from "./codegen/dts.js";
import { resolveMainModuleId } from "./module-resolution/main.js";
import { Reporter } from "./utils/reporter.js";
import { ResultMatcher } from "./utils/resultMatcher.js";
import { buffer } from "./utils/bufferPromise.js";
import { MessageCatalogue } from "./MessageCatalogue.js";
import { cleanUrl } from "./utils/id.js";
import {
  loadConfigModule,
  resolveConfigModuleId,
} from "./module-resolution/config.js";
import { resolveIdSequence } from "./module-resolution/utils.js";
import {
  loadDictionaryModule,
  parseDictionaryModuleId,
  resolveDictionaryModuleId,
} from "./module-resolution/dictionary.js";
import { resolveMessageModuleId } from "./module-resolution/messages.js";
import { resolveDictionaryUtilsModuleId } from "./module-resolution/dictionaryUtils.js";

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

  /** @type {import("vite").ViteDevServer} */
  let viteDevServer;

  /** Keeps track of the messages that exist & where to find them */
  const Catalogue = new MessageCatalogue();
  Catalogue.addEventListener("messages_changed", async () => {
    await regenerateDTS();
  });

  Catalogue.addEventListener("dictionary_changed", (e) => {
    if (viteDevServer) {
      let invalidatedModuleIDs = new Set();
      for (const resolvedModuleId of viteDevServer.moduleGraph.idToModuleMap.keys()) {
        if (resolvedModuleId.startsWith(`\0t18s-internal:dictionary`)) {
          const { domain } = parseDictionaryModuleId(resolvedModuleId);
          if (domain === e.detail.domain)
            invalidatedModuleIDs.add(resolvedModuleId);
        }
      }

      let invalidatedModules = new Set();
      for (const moduleId of invalidatedModuleIDs) {
        const module = viteDevServer.moduleGraph.idToModuleMap.get(moduleId);
        if (module) {
          invalidatedModules.add(module);
        }
      }

      for (const module of invalidatedModules) {
        viteDevServer.moduleGraph.invalidateModule(module);
      }

      viteDevServer.ws.send({
        type: "full-reload",
      });
    }
  });

  /** Handles interactions with translation files */
  const fileHandler = new FileHandler([YamlHandler, JsonHandler]);

  /**
   * Register a new translation file.
   * @param {string} filePath Absolute path to the file that needs to be invalidated
   */
  async function registerTranslationFile(filePath) {
    const result = fileHandler.categorizeFile(filePath, config.locales);
    if (!result.success) {
      reporter.warnAboutFileCategorizationFailure(result);
      return;
    }

    const { locale, domain } = result;

    if (Catalogue.hasDictionary(locale, domain)) {
      logger.error(
        `Locale ${locale} already exists. Skipping file ${filePath}`
      );
      return;
    }

    //Try to read the file & buffer the result
    const bufferedFileRead = await buffer(fileHandler.read(filePath, locale, domain));

    const { dictionary, invalidKeys, invalidMessages } = new ResultMatcher(
      bufferedFileRead
    )
      .catch(LoadingException, (e) => {
        logger.error(e.message);
        return FileHandler.NullReadResult;
      })
      .run();

    if (invalidKeys.size > 0) {
      reporter.warnAboutInvalidKeys(filePath, invalidKeys);
    }

    if (invalidMessages.size > 0) {
      reporter.warnAboutInvalidMessageStrings(filePath, invalidMessages);
    }

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
    const result = fileHandler.categorizeFile(filePath, config.locales);
    if (!result.success) {
      reporter.warnAboutFileCategorizationFailure(result);
      return;
    }
    const { locale, domain } = result;

    //Try to read the file & buffer the result
    const bufferedFileRead = await buffer(fileHandler.read(filePath, locale, domain));

    const { dictionary, invalidKeys, invalidMessages } = new ResultMatcher(
      bufferedFileRead
    )
      .catch(LoadingException, (e) => {
        logger.error(e.message);
        return FileHandler.NullReadResult;
      })
      .run();

    if (invalidKeys.size > 0) {
      reporter.warnAboutInvalidKeys(filePath, invalidKeys);
    }

    if (invalidMessages.size > 0) {
      reporter.warnAboutInvalidMessageStrings(filePath, invalidMessages);
    }

    Catalogue.setDictionary(locale, domain, dictionary);
  }

  /**
   * @param {string} filePath Absolute path to the translation file that no longer exists
   * @returns void
   */
  const unregisterTranslationFile = (filePath) => {
    const result = fileHandler.categorizeFile(filePath, config.locales);
    if (!result.success) return;
    const { locale, domain } = result;

    Catalogue.unregisterDictionary(locale, domain);
  };

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
    await regenerateDTS();

    const files = await getFilesInDir(config.translationsDir);
    const paths = files.map((file) => resolve(config.translationsDir, file));

    /** @param {string} filePath */
    async function loadFile(filePath) {
      const result = fileHandler.categorizeFile(filePath, config.locales);
      if (!result.success) {
        reporter.warnAboutFileCategorizationFailure(result);
        return;
      }

      const { locale, domain } = result;
      const readResult = await buffer(fileHandler.read(filePath, locale, domain));

      const { dictionary, invalidKeys, invalidMessages } = new ResultMatcher(
        readResult
      )
        .catch(LoadingException, (e) => {
          logger.error(e.message);
          return FileHandler.NullReadResult;
        })
        .run();

      if (invalidKeys.size > 0) {
        reporter.warnAboutInvalidKeys(filePath, invalidKeys);
      }

      if (invalidMessages.size > 0) {
        reporter.warnAboutInvalidMessageStrings(filePath, invalidMessages);
      }

      Catalogue.registerDictionary(locale, domain, filePath, dictionary);
    }

    //Load all locale-files
    await Promise.all(paths.map(loadFile));
  }

  async function regenerateDTS() {
    await writeFile(config.dtsPath, generateDTS(config, Catalogue));
  }

  return {
    name: "t18s",
    enforce: "pre",

    async configResolved(resolvedConfig) {
      const verbose =
        pluginConfig.verbose && resolvedConfig.command === "serve";
      logger = new Logger(resolvedConfig, verbose);
      reporter = new Reporter(logger);

      /** @type {string[]} */
      const validLocales = [];
      /** @type {string[]} */
      const invalidLocales = [];

      for (const locale of pluginConfig.locales) {
        //Check if the Intl API supports the locale
        try {
          new Intl.Locale(locale);
          validLocales.push(locale);
        } catch (e) {
          invalidLocales.push(locale);
        }
      }

      if (invalidLocales.length > 0)
        reporter.warnAboutInvalidLocalesInConfig(invalidLocales);

      config = {
        dtsPath: resolve(resolvedConfig.root, pluginConfig.dts),
        translationsDir: resolve(
          resolvedConfig.root,
          pluginConfig.translationsDir
        ),
        verbose,
        locales: pluginConfig.locales,
        fallbackLocale: pluginConfig.fallbackLocale ?? null,
      };

      await loadInitialLocales(config);
    },

    resolveId: resolveIdSequence([
      resolveMainModuleId,
      resolveConfigModuleId,
      resolveDictionaryModuleId,
      resolveMessageModuleId,
      resolveDictionaryUtilsModuleId,
    ]),

    async load(id) {
      id = cleanUrl(id);

      /** @type {import("./module-resolution/types.js").ModuleLoader[]} */
      const loaders = [loadConfigModule, loadDictionaryModule];

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
      viteDevServer = server;
    },
  };
}
