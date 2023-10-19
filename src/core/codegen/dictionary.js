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
    let messageCode = "";
    if (message.typeDefinition) {
      messageCode += `/** @type {(args: ${message.typeDefinition}) => string} */\n`;
    }
    messageCode += `"${key}": ${message.precompiled}`;
    dictionaryBodyLines.push(messageCode);
  }
  const dictionaryBody = dictionaryBodyLines.join(",\n");

  let code = "";
  code += "export default {\n";
  code += indent(dictionaryBody);
  code += "\n};";
  return code;
}
