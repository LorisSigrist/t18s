import { LoadingException } from "../exception.js";
import { flattenTree } from "../utils.js";

/** @type {import("../types.js").FormatHandler} */
export const JsonHandler = {
  fileExtensions: ["json"],
  load: async (filePath, content, locale) => {
    try {
      content = content.trim();
      if (content.length === 0) return new Map();
      const tree = JSON.parse(content);
      return flattenTree(tree);
    } catch (e) {
      if (!(e instanceof Error)) throw e;
      throw new LoadingException(
        `Could not parse JSON file ${filePath}: ${e.message}`,
        { cause: e },
      );
    }
  },
  async setPath() {
    throw new Error("Not implemented");
  },
};
