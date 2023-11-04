import { Tree } from "../../utils/Tree.js";
import { ResultMatcher } from "../../utils/resultMatcher.js";
import { LoadingException } from "../exception.js";
import { isPOJSTree, setPathOnTree } from "../utils.js";

/** @type {import("../types.js").FormatHandler} */
export const JsonHandler = {
  fileExtensions: ["json"],
  load: (filePath, content) => {
    const tree = parseAsTree(content, filePath);
    return tree;
  },
  setPath(oldJSON, key, value) {
    const tree = parseAsTree(oldJSON);

    const path = key.split(".");
    setPathOnTree(tree, path, value);

    const newJSON = JSON.stringify(tree);
    return newJSON;
  },
};

/**
 * Parses a string into a POJS tree.
 *
 * @param {string} content
 * @param {string|undefined} filePath
 * @returns {import("../types.js").POJSTree}
 */
function parseAsTree(content, filePath = undefined) {
  content = content.trim();
  if (content.length === 0) return {};

  /** @param {Error} e */
  const raiseLoadingException = (e) => {
    throw new LoadingException(
      `Could not parse JSON file ${filePath ?? ""}: ${e.message}`,
      { cause: e },
    );
  };

  return new ResultMatcher(JSON.parse)
    .ok((res) => {
      if (!isPOJSTree(res)) return {};
      return res;
    })
    .catch(SyntaxError, (e) => raiseLoadingException(e))
    .run(content);
}
