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
    const raiseLoadingException = (e) => {
      console.warn("Raising loading exception");
      throw new LoadingException(
        `Could not parse JSON file ${filePath}: ${e.message}`,
        { cause: e },
      );
    };

    return new ResultMatcher(JSON.parse)
      .ok(flattenTree)
      .catch(SyntaxError, raiseLoadingException)
      .run(content);
  },
  setPath(oldJSON, key, value) {
    oldJSON = oldJSON.trim().length > 0 ? oldJSON : "{}";
    const obj = JSON.parse(oldJSON);

    const path = key.split(".");

    /**
     * @param {any} tree
     * @param {string[]} path
     * @param {string} value
     * @returns
     */
    function setOnTree(tree, path, value) {
      //Split the path into the current level and the rest of the path
      const [current, ...rest] = path;
      if (!current)
        throw new Error("There must be at least one level in the path");

      if (rest.length === 0) {
        tree[current] = value;
        return;
      }

      if (!tree[current]) tree[current] = {};
      setOnTree(tree[current], rest, value);
    }

    setOnTree(obj, path, value);

    const newJSON = JSON.stringify(obj);
    return newJSON;
  },
};
