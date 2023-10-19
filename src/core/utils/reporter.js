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
    let errorMessage = `Invalid ICU Messageformat Strings found in ${filePath}`;
    for (const invalidKey of invalidKeys) {
      errorMessage += `\n· ${invalidKey}`;
    }
    this.#logger.error(errorMessage);
  }

  /**
   *
   * @param {string} filePath
   * @param {string} invalidLocale
   */
  warnAboutFileForInvalidLocale(filePath, invalidLocale) {
    let errorMessage = `Attempted to register a translation file for an unregistered locale: ${invalidLocale}`;
    errorMessage += `\nDid you forget to register the locale in the t18s plugin config?`;
    errorMessage += `\nFile: ${filePath}`;

    this.#logger.warn(errorMessage);
  }

  /**
   * @param {string} locale
   * @param {string} domain
   */
  translationsRegistered(locale, domain) {
    this.#logger.log(
      `Domain ${kleur.italic(domain)} registered for locale ${kleur.italic(
        locale,
      )}`,
    );
  }

  /**
   * @param {string} locale
   * @param {string} domain
   */
  translationsChanged(locale, domain) {
    this.#logger.log(
      `Domain ${kleur.italic(domain)} changed for locale ${kleur.italic(
        locale,
      )}`,
    );
  }

  /**
   * @param {string} locale
   * @param {string} domain
   */
  unregisterTranslations(locale, domain) {
    this.#logger.log(
      `Domain ${kleur.italic(domain)} unregistered for locale ${kleur.italic(
        locale,
      )}`,
    );
  }

  /**
   * @param {string} locale
   * @param {string[]} filePaths
   */
  warnAboutDuplicateLocaleFiles(locale, filePaths) {
    this.#logger.error(
      `Multiple files for locale ${locale} found:\n    ${filePaths.join(
        "\n    ",
      )}`,
    );
  }
}
