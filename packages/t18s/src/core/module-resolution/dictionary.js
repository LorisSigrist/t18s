import { MessageCatalogue } from "../MessageCatalogue.js";
import { generateDictionaryModule } from "../codegen/dictionary.js";

/**
 * If the unresolved_id is for a t18s dictionary, this function will resolve it.
 * Dictionary modules have the format "t18s-dictionary:<locale>:<domain>"
 * 
 * @type {import("./types.js").IDResolver}
 */
export const resolveDictionaryModuleId = (unresolved_id) => {
  if (!unresolved_id.startsWith("t18s-dictionary:")) return null;

  const [_, locale, domain] = unresolved_id.split(":");
  if (!locale || !domain) return null;

  const resolved_id = "\0" + unresolved_id;
  return resolved_id;
}

/**
 * Returns the code for the dictionary module if the resolved_id is for the main module.
 * @type {import("./types.js").ModuleLoader}
 */
export const loadDictionaryModule = async (resolved_id, config, Catalogue)  => {
  if (!resolved_id.startsWith("\0t18s-dictionary:")) return null;

  const [_, locale, domain] = resolved_id.split(":");
  if (!locale || !domain) return null;

  const dictionary = Catalogue.getDictionary(locale, domain);

  return dictionary
    ? generateDictionaryModule(dictionary)
    : "export default {}";
}
