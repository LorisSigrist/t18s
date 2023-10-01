import { load as loadYaml } from "js-yaml";
import { getDictionary } from "../generateDictionary.js";
import { LoadingException } from "../exception.js";

/** @type {import("../types.js").Loader} */
export const yamlLoader = {
  fileExtensions: ["yaml", "yml"],
  load: async (filePath, content, locale) => {
    try {
      const parsed = loadYaml(content, {
        filename: filePath,
      });
      return getDictionary(parsed, locale);
    } catch (e) {
      throw new LoadingException(
        `Could not parse YAML file ${filePath}: ${e.message}`,
        { cause: e },
      );
    }
  },
};
