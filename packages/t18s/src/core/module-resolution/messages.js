import { parse } from "@formatjs/icu-messageformat-parser";
import { precompile } from "../../../compiler/precompile.js";
import { MessageCatalogue } from "../MessageCatalogue.js";

/** @type {import("./types.js").IDResolver} */
export const resolveMessagesModuleId = (unresolved_id) => {
  if (!unresolved_id.startsWith("$t18s/messages")) return null;
  const [_, __, domain, extra] = unresolved_id.split("/");
  if (extra) return null;
  return "\0" + unresolved_id;
};

/** @type {import("./types.js").ModuleLoader} */
export const loadMessagesModule = async (resolved_id, config, Catalogue) => {
  if (!resolved_id.startsWith("\0$t18s/messages")) return null;
  const [_, __, domain, extra] = resolved_id.split("/");
  if (extra) return null;
  return generateMessagesModuleCode(Catalogue, domain ?? "");
};

/**
 * @param {MessageCatalogue} Catalogue
 * @param {string} domain
 * @returns {string}
 */
function generateMessagesModuleCode(Catalogue, domain) {
  let code = "";
  code += 'import { locale } from "$t18s";\n';
  code += 'import { get, derived } from "svelte/store";\n';
  code += 'import { verbose, fallbackLocale } from "t18s-internal:config";\n\n';

  let messageKeys = new Set();
  let locales = new Set();

  for (const [locale, dictionary] of Catalogue.getMessages(domain)) {
    locales.add(locale);
    for (const key in dictionary) {
      const value = dictionary[key];
      if (!value || typeof value !== "string") continue;
      messageKeys.add(key);
    }
  }

  for (const key of messageKeys) {
    //We need to mark the derived store as pure, so that it will get treeshaken if it is not used.
    code += `export const ${key} = /* @__PURE__ */ derived(locale, currentLocale => {
            return (values = undefined) => {
                const translations = {
                    ${[...locales]
                      .map(
                        (locale) =>
                          `"${locale}": ${
                            precompile(parse(Catalogue.getDictionary(locale, domain)?.[key] ?? ""), locale)
                          }`
                      )
                      .join(",\n")}
                };

                if(!translations[currentLocale]) {
                    if(verbose) console.warn("Missing translation for key ${key} in locale " + currentLocale);
                    return "${key}";
                }

                return typeof translations[currentLocale] === "function" ? translations[currentLocale](values) : translations[currentLocale];
            }
        });\n`;
  }

  code += `
    if(import.meta.hot) {
      import.meta.hot.accept((newModule) => {
        if (newModule) {
          // newModule is undefined when SyntaxError happened
          console.log(newModule)
        }
      })
    }
`;

  return code;
}
