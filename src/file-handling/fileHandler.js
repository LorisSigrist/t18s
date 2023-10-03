import { readFile } from "fs/promises";
import { basename } from "path";
import { LoadingException } from "./exception.js";

export class FileHandler {
  /** @type {import("./types.js").FormatHandler[]} handlers */
  #handlers;

  /** @param {import("./types.js").FormatHandler[]} handlers */
  constructor(handlers) {
    this.#handlers = handlers;
  }

  /**
   * @param {string} filePath Absolute path to the file that needs to be handled
   * @param {string} locale The locale for which the file should be handled
   * @returns {Promise<import("../types.js").Dictionary>} A dictionary
   *
   * @throws {LoadingException} If the file could not be handled
   */
  async handle(filePath, locale) {
    const handler = this.#getHandler(filePath);
    if (!handler) throw new Error(`Could not find handler for ${filePath}`);
    const textContent = await this.#readFileContent(filePath);
    const dictionary = await handler.load(filePath, textContent, locale);

    return dictionary;
  }

  /**
   * Resolved which handler should be used for the given file
   * @param {string} filePath
   * @returns {import("./types.js").FormatHandler | null}
   */
  #getHandler(filePath) {
    const filename = basename(filePath);
    const fileExtension = filename.split(".").at(-1);
    if (typeof fileExtension !== "string")
      throw new LoadingException(
        "Could not determine file extension for ${filePath}",
      );

    const handler = this.#handlers.find((l) =>
      l.fileExtensions.includes(fileExtension),
    );

    return handler ?? null;
  }

  /**
   * Reads the raw text content of the given file
   * @param {string} filePath
   * @returns {Promise<string>}
   *
   * @throws {LoadingException} If the file could not be read
   */
  async #readFileContent(filePath) {
    try {
      const textContent = await readFile(filePath, "utf-8");
      return textContent;
    } catch (e) {
      if (!(e instanceof Error)) throw e;
      throw new LoadingException(`Failed to read file ${filePath}`, {
        cause: e,
      });
    }
  }

  /**
   * Lists the file extensions for which a handler is available
   * @returns {string[]}
   */
  getSupportedFileExtensions() {
    return this.#handlers.flatMap((h) => h.fileExtensions);
  }
}
