import { LoadingException } from "../exception.js";
import { generateDictionaryFromTree } from "../utils.js";

/** @type {import("../types.js").FormatHandler} */
export const JsonHandler = {
  fileExtensions: ["json"],
  load: async (filePath, content, locale) => {
    try {
      const parsed = JSON.parse(content);
      return generateDictionaryFromTree(parsed, locale);
    } catch (e) {
      if (!(e instanceof Error)) throw e;
      throw new LoadingException(
        `Could not parse JSON file ${filePath}: ${e.message}`,
        { cause: e },
      );
    }
  },
};
