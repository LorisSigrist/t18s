import { readFile, writeFile } from "fs/promises";
import { basename } from "path";
import { LoadingException } from "./exception.js";
import { Tree } from "../utils/Tree.js";
import { Message } from "../Message.js";
import { isValidMessageKey } from "./sanitation.js";
import { categorizeFile } from "./categorizeFile.js";

export class FileHandler {
  /** @type {import("./types.js").FormatHandler[]} */
  #handlers;

  /** @param {import("./types.js").FormatHandler[]} handlers */
  constructor(handlers) {
    this.#handlers = handlers;
  }

  /**
   * @param {string} filePath Absolute path to the file that needs to be handled
   * @param {string} locale
   * @param {string} domain
   * @throws {LoadingException} If the file could not be handled
   */
  async read(filePath, locale, domain) {
    const handler = this.#getHandler(filePath);
    if (!handler)
      throw new LoadingException(
        `Could not find handler for ${filePath}. Supported file extensions are ${this.getSupportedFileExtensions()}`,
      );

    const textContent = await this.#readFileContent(filePath);
    const pojsTree = handler.load(filePath, textContent);

    /** @type {Tree<string>} */
    const messageSrcTree = Tree.fromObject(pojsTree);

    const invalidKeys = new Set();

    const validMessageTree = messageSrcTree.filter((messageSrc, path) => {
      const key = path.at(-1);
      if (key === undefined) return true;

      if (isValidMessageKey(key)) {
        return true;
      } else {
        invalidKeys.add(path.join("."));
        return false;
      }
    });

    const invalidMessages = new Set();
    const dictionary = validMessageTree
      .map((messageSrc) => {
        try {
          return new Message(locale, messageSrc);
        } catch (e) {
          invalidMessages.add(messageSrc);
          return false;
        }
      })
      .filter(Message.isMessage);

    return { dictionary, invalidKeys, invalidMessages };
  }

  /**
   * The null read result is can be used as a fallback if an error prevents
   * a real read result from being generated.
   */
  static NullReadResult = {
    dictionary: new Tree(),
    invalidKeys: new Set(),
    invalidMessages: new Set(),
  };

  /**
   * @param {string} filePath Absolute path to the file that needs to be handled
   * @param {string} key
   * @param {string} value
   * @returns {Promise<void>} A Map of the Key-Value pairs in the file
   * @throws {LoadingException} If the file could not be handled
   */
  async setPath(filePath, key, value) {
    const handler = this.#getHandler(filePath);
    if (!handler)
      throw new LoadingException(
        `Could not find handler for ${filePath}. Supported file extensions are ${this.getSupportedFileExtensions()}`,
      );

    const textContent = await this.#readFileContent(filePath);
    const newContent = handler.setPath(textContent, key, value);
    await writeFile(filePath, newContent, { encoding: "utf-8" });
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
   * @returns {Set<string>}
   */
  getSupportedFileExtensions() {
    return new Set(this.#handlers.flatMap((h) => h.fileExtensions));
  }

  categorizeFile = categorizeFile;
}
