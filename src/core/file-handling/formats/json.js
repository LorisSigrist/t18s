import { ResultMatcher } from "../../utils/resultMatcher.js";
import { LoadingException } from "../exception.js";
import { flattenTree } from "../utils.js";

/** @type {import("../types.js").FormatHandler} */
export const JsonHandler = {
  fileExtensions: ["json"],
  load: (filePath, content) => {
    content = content.trim();
    if (content.length === 0) return new Map();

    /** @param {Error} e */
    const raiseLoadingException = e => {
      console.warn("Raising loading exception");
      throw new LoadingException(
        `Could not parse JSON file ${filePath}: ${e.message}`,
        { cause: e },
      );
    }

    return new ResultMatcher(JSON.parse)
      .ok(flattenTree)
      .catch(SyntaxError, raiseLoadingException)
      .run(content);
      
  },
  setPath() {
    throw new Error("Not implemented");
  },
};
