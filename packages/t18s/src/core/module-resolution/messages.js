import { MessageCatalogue } from "../MessageCatalogue.js";
import { Tree } from "../utils/Tree.js";
import { Message } from "../Message.js";

/** @type {import("./types.js").IDResolver} */
export const resolveMessagesModuleId = (unresolved_id) => {
  if (!unresolved_id.startsWith("$t18s/messages")) return null;
  return "\0" + unresolved_id;
};

/** @type {import("./types.js").ModuleLoader} */
export const loadMessagesModule = async (resolved_id, config, Catalogue) => {
  if (!resolved_id.startsWith("\0$t18s/messages")) return null;
  const [domainString, pathString] = resolved_id.split(":");
  if (!domainString) return null;
  const [_, __, second] = domainString.split("/");


  const domain = second ?? "";
  const path = pathString?.split("/") ?? [];
  return generateMessagesModuleCode(Catalogue, domain ?? "", path);
};

/**
 * @param {MessageCatalogue} Catalogue
 * @param {string} domain
 * @param {string[]} path
 * @returns {string}
 */
function generateMessagesModuleCode(Catalogue, domain, path) {
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
      const submoduleID = (domain ? `$t18s/messages/${domain}` : "$t18s/messages") + ":" + newPath.join("/");
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
