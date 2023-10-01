import { Dictionary } from "../types.js";

export type Loader = {
  fileExtensions: string[];

  /**
   * Loads the given file and returns a dictionary.
   * @param filePath - The path of this file - Only used in Error messages.
   * @param fileContent - The text content of this file.
   * @param locale - The locale this file is for.
   * @throws {Error} - If the file content is invalid.
   * @returns A dictionary.
   */
  load: (
    filePath: string,
    fileContent: string,
    locale: string,
  ) => Promise<Dictionary>;
};
