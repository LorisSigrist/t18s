import { indent } from "./utils/stringUtils.js";

/**
 * Generates the code for a dictionary module.
 * A dictionary module exports a dictionary of translation functions as default.
 *
 * @param {import("../types.js").Dictionary} dictionary
 * @returns {string}
 */
export function generateDictionaryModule(dictionary) {
    let dictionaryBody = "";
  
    for (const [key, func] of dictionary) {
      dictionaryBody += `"${key}": ${func.precompiled},\n`;
    }
  
    let code = "";
    code += "export default {\n";
    code += indent(dictionaryBody);
    code += "};";
    return code;
  }
  