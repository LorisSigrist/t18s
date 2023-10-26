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
  code += 'import { verbose, fallbackLocale } from "t18s-internal:config";\n\n'

  let messageKeys = new Set();
  let locales = new Set();

  for (const [locale, dictionary] of Catalogue.getMessages(domain)) {
    locales.add(locale);
    for (const [key, message] of dictionary.entries()) {
      messageKeys.add(key);
    }
  }

  for (const key of messageKeys) {
    code += `export const ${key} = derived(locale, currentLocale => {
            return (values = undefined) => {
                const translations = {
                    ${[...locales]
                      .map(
                        (locale) =>
                          `"${locale}": ${
                            Catalogue.getDictionary(locale, domain)?.get(key)
                              ?.precompiled
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
        import.meta.hot.on("t18s:removeDomain", ()=>{
            import.meta.hot.invalidate()
        });

        import.meta.hot.on("t18s:removeDomain", ()=>{
            import.meta.hot.invalidate()
        });
    }
`;

  return code;
}
