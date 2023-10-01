import { LoadingException } from "../exception.js";
import { getDictionary } from "../generateDictionary.js";

/** @type {import("../types.js").Loader} */
export const jsonLoader = {
  fileExtensions: ["json"],
  load: async (filePath, content, locale) => {
    try {
      const parsed = JSON.parse(content);
      return getDictionary(parsed, locale);
    } catch (e) {
      throw new LoadingException(
        `Could not parse JSON file ${filePath}: ${e.message}`,
        { cause: e },
      );
    }
  },
};
