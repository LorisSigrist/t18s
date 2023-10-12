import { load as loadYaml, YAMLException } from "js-yaml";
import { flattenTree } from "../utils.js";
import { LoadingException } from "../exception.js";
import { ResultMatcher } from "../../utils/resultMatcher.js";

/** @type {import("../types.js").FormatHandler} */
export const YamlHandler = {
  fileExtensions: ["yaml", "yml"],
  load: (filePath, content) => {
    
    /** @param {YAMLException} e */
    const raiseLoadingException = (e) => {
      throw new LoadingException(
        `Could not parse YAML file ${filePath}: ${e.message}`,
        { cause: e }
      );
    }
    
    return new ResultMatcher(loadYaml)
      .ok(flattenTree)
      .catch(YAMLException, raiseLoadingException)
      .run(content, { filename: filePath });
  },
  setPath() {
    throw new Error("Not implemented");
  },
};
