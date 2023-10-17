import { indent } from "./utils/stringUtils.js";

/**
 * Generates the code for a dictionary module.
 * A dictionary module exports a dictionary of translation functions as default.
 *
 * @param {import("../types.js").Dictionary} dictionary
 * @returns {string}
 */
export function generateDictionaryModule(dictionary) {
  const dictionaryBodyLines = [];
  for (const [key, message] of dictionary) {
    dictionaryBodyLines.push(`"${key}": ${message.precompiled}`);
  }
  const dictionaryBody = dictionaryBodyLines.join(",\n");

  let code = "";
  code += "export default {\n";
  code += indent(dictionaryBody);
  code += "\n};";
  return code;
}
