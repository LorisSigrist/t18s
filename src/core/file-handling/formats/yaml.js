import { dump, load as loadYaml, YAMLException } from "js-yaml";
import { flattenTree, setPathOnTree } from "../utils.js";
import { LoadingException } from "../exception.js";
import { ResultMatcher } from "../../utils/resultMatcher.js";

/** @type {import("../types.js").FormatHandler} */
export const YamlHandler = {
  fileExtensions: ["yaml", "yml"],
  load: (filePath, content) => {
    const tree = parseAsTree(content, filePath);
    return new ResultMatcher(flattenTree)
      .catchAll((e) => raiseLoadingException(e, filePath))
      .run(tree);
  },
  setPath(oldYaml, key, value) {
    const tree = parseAsTree(oldYaml);

    const path = key.split(".");
    setPathOnTree(tree, path, value);

    const newYaml = dump(tree);
    return newYaml;
  },
};

/**
 * @param {string} content
 * @param {string|undefined} filePath
 * @return {unknown}
 */
function parseAsTree(content, filePath = undefined) {
  return new ResultMatcher(loadYaml)
    .ok((res) => {
      if (typeof res !== "object") return {};
      return res;
    })
    .catch(YAMLException, (e) => raiseLoadingException(e, filePath))
    .run(content, { filename: filePath });
}

/**
 * @param {unknown} e
 * @param {string | undefined} filePath
 */
const raiseLoadingException = (e, filePath = undefined) => {
  const msg =
    e instanceof Error
      ? `Could not parse YAML file ${filePath ?? ""}: ${e.message}`
      : `Could not parse YAML file ${filePath ?? ""}`;
  throw new LoadingException(msg, { cause: e });
};
