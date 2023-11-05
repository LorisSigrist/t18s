import { Logger } from "./logger.js";
import kleur from "kleur";

/**
 * Provides a Standard Interface for generating & displaying errors in the console.
 */
export class Reporter {
  /**
   * @type {Logger}
   */
  #logger;

  /**
   * @param {Logger} logger
   */
  constructor(logger) {
    this.#logger = logger;
  }

  /**
   * @param {string} filePath
   * @param {Set<string>} invalidKeys
   */
  warnAboutInvalidKeys(filePath, invalidKeys) {
    let errorMessage = `Found messages with invalid keys in ${filePath}`;
    errorMessage += `\nAll message-keys must be valid JavaScript variable names.`;
    for (const invalidKey of invalidKeys) {
      errorMessage += `\n· ${invalidKey}`;
    }
    this.#logger.warn(errorMessage);
  }

  /**
   * @param {string} filePath
   * @param {Set<string>} invalidMessageStrings
   */
  warnAboutInvalidMessageStrings(filePath, invalidMessageStrings) {
    let errorMessage = `Found messages with invalid syntax in ${filePath}`;
    for (const invalidMessage of invalidMessageStrings) {
      errorMessage += `\n· ${invalidMessage}`;
    }
    this.#logger.warn(errorMessage);
  }

  /**
   * Warn about invalid locales being registered in the config.
   * @param {Iterable<string>} invalidLocales
   */
  warnAboutInvalidLocalesInConfig(invalidLocales) {
    const locales = Array.from(invalidLocales);

    if (locales.length === 0) return;
    if (locales.length === 1) {
      const locale = locales.pop();
      if (!locale) return;

      this.#logger.warn(
        `An invalid locale was registered in the t18s plugin config: ${kleur.italic(
          locale
        )}. It will be ignored.  Locales must be valid unicode identifiers (eg. de, en-US or zh-Hans-CN))`
      );
    } else {
      let errorMessage = `Invalid locales were registered in the t18s plugin config:`;
      for (const locale of locales) {
        errorMessage += `\n· ${kleur.italic(locale)}`;
      }
      errorMessage += `\nThey will be ignored. Locales must be valid unicode identifiers (eg. de, en-US or zh-Hans-CN))`;
      this.#logger.warn(errorMessage);
    }
  }

  /**
   *
   * @param {Extract<import("../file-handling/categorizeFile.js").FileCategorizationResult, { success: false}>} failed_result
   */
  warnAboutFileCategorizationFailure(failed_result) {
    switch (failed_result.reason) {
      case "LOCALE_MISSING": {
        this.#logger.warn(
          `Could not load file ${kleur.italic(
            failed_result.path
          )}. The filename must contain a locale.`
        );
        break;
      }

      case "INVALID_DOMAIN_NAME": {
        this.#logger.warn(
          `The file ${kleur.italic(
            failed_result.path
          )} has an invalid domain name. Domain names must only contain letters, numbers, underscores and dashes.`
        );
        break;
      }

      case "UNREGISTERED_LOCALE": {
        let errorMessage = `Attempted to register a translation file for an unknown locale: ${failed_result.path}`;
        errorMessage += `\nDid you forget to register the locale in the t18s plugin config?`;

        this.#logger.warn(errorMessage);
        break;
      }

      default: {
        this.#logger.warn(
          `Could not load the file ${kleur.italic(
            failed_result.path
          )} because it's name is invalid.`
        );
        break;
      }
    }
  }

  /**
   * @param {string} locale
   * @param {string} domain
   */
  translationsRegistered(locale, domain) {
    this.#logger.log(
      `Domain ${kleur.italic(domain)} registered for locale ${kleur.italic(
        locale
      )}`
    );
  }

  /**
   * @param {string} locale
   * @param {string} domain
   */
  translationsChanged(locale, domain) {
    this.#logger.log(
      `Domain ${kleur.italic(domain)} changed for locale ${kleur.italic(
        locale
      )}`
    );
  }

  /**
   * @param {string} locale
   * @param {string} domain
   */
  unregisterTranslations(locale, domain) {
    this.#logger.log(
      `Domain ${kleur.italic(domain)} unregistered for locale ${kleur.italic(
        locale
      )}`
    );
  }

  /**
   * @param {string} locale
   * @param {string[]} filePaths
   */
  warnAboutDuplicateLocaleFiles(locale, filePaths) {
    this.#logger.error(
      `Multiple files for locale ${locale} found:\n    ${filePaths.join(
        "\n    "
      )}`
    );
  }
}
