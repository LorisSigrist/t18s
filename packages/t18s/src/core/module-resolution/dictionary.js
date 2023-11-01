import { MessageCatalogue } from "../MessageCatalogue.js";
import { Tree } from "../utils/Tree.js";
import { Message } from "../Message.js";

/** @type {import("./types.js").IDResolver} */
export const resolveDictionaryModuleId = (unresolved_id) => {
  if (!unresolved_id.startsWith("t18s-internal:dictionary:")) return null;
  return "\0" + unresolved_id;
};

/** @type {import("./types.js").ModuleLoader} */
export const loadDictionaryModule = async (resolved_id, config, Catalogue) => {
  if (!resolved_id.startsWith("\0t18s-internal:dictionary:")) return null;
  const { domain, path } = parseDictionaryModuleId(resolved_id);
  return generateDictionaryModuleCode(Catalogue, domain, path);
};

/**
 * @param {string} resolved_id 
 * @returns {{ domain: string, path: string[] }}
 */
export function parseDictionaryModuleId(resolved_id) {
  let [_, __, domain, pathString] = resolved_id.split(":");
  domain = domain ?? "";
  pathString = pathString ?? "";
  const path = pathString.split("/").filter(Boolean) ?? [];

  return { domain, path }
}

/**
 * @param {MessageCatalogue} Catalogue
 * @param {string} domain
 * @param {string[]} path
 * @returns {string}
 */
function generateDictionaryModuleCode(Catalogue, domain, path) {
  let code = "";
  code += 'import { locale } from "$t18s";\n';
  code += 'import { get, derived } from "svelte/store";\n';
  code += 'import { verbose, fallbackLocale } from "t18s-internal:config";\n\n';

  /** @type {Tree<Message>[]} */
  const dictionaries = [];

  for (const [locale, dictionary] of Catalogue.getMessages(domain)) {
    dictionaries.push(dictionary);
  }

  const tree = Tree.mergeTrees(dictionaries);
  const subtree = tree.getPath(path);
  if (!(subtree instanceof Tree)) {
    return "export {}";
  }

  for (const [key, child] of subtree.children()) {
    if (child instanceof Tree) {
      const newPath = [...path, key];
      const submoduleID = `t18s-internal:dictionary:${domain}:` + newPath.join("/");
      code += `export * as ${key} from "${submoduleID}";\n`;
    } else {
      code += `export const ${key} = /* @__PURE__ */ (values = undefined) => {
          const currentLocale = get(locale) ?? fallbackLocale;
          const translations = {
              ${[...child]
                .map(
                  (message) =>
                    `"${message.locale}": ${message.precompiled}`
                )
                .join(",\n")}
          };

          if(!translations[currentLocale]) {

              if(fallbackLocale && translations[fallbackLocale]) {
                return typeof translations[fallbackLocale] === "function" 
                  ? translations[fallbackLocale](values) 
                  : translations[fallbackLocale];
              }

              if(verbose) console.warn("[t18s] Key '${key}' missing in domain ${domain} for locale " + currentLocale);
              return "${key}";
          }

          return typeof translations[currentLocale] === "function" 
            ? translations[currentLocale](values) 
            : translations[currentLocale];
      }\n`;
    }
  }

  return code;
}
