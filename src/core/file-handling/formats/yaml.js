import { load as loadYaml } from "js-yaml";
import { flattenTree } from "../utils.js";
import { LoadingException } from "../exception.js";

/** @type {import("../types.js").FormatHandler} */
export const YamlHandler = {
  fileExtensions: ["yaml", "yml"],
  load: async (filePath, content, locale) => {
    try {
      const tree = loadYaml(content, {
        filename: filePath,
      });
      return flattenTree(tree);
    } catch (e) {
      if (!(e instanceof Error)) throw e;
      throw new LoadingException(
        `Could not parse YAML file ${filePath}: ${e.message}`,
        { cause: e },
      );
    }
  },
  async setPath() {
    throw new Error("Not implemented");
  },
};
