import { Logger } from "./logger.js";

/**
 * Provides a Standard Interface for generating & displaying errors in the console.
 */
export class ErrorReporter {
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
    const invalidKeysString = [...invalidKeys].join(", ");
    this.#logger.error(`Invalid keys in ${filePath}: ${invalidKeysString}`);
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
