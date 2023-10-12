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
   * @param {string} locale
   */
  localeUpdated(locale) {
    this.#logger.log(`Locale ${kleur.italic(locale)} updated`);
  }

  /**
   * @param {string} locale
   */
  localeDeleted(locale) {
    this.#logger.warn(`Locale ${kleur.italic(locale)} deleted`);
  }

  /**
   * @param {string} locale
   */
  localeCreated(locale) {
    this.#logger.success(`Locale ${kleur.italic(locale)} created`);
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
