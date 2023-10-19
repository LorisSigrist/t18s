import { MessageCatalogue } from "../MessageCatalogue.js";
import { indent } from "./utils/stringUtils.js";

/**
 * @param {import("../types.js").ResolvedPluginConfig} config
 * @param {MessageCatalogue} Catalogue
 * @returns {string}
 */
export function generateLoaderModule(config, Catalogue) {
  /** @type {string[]} */
  const codeForLocales = [];

  for (const locale of config.locales) {
    let localeCode = "";
    const domains = Catalogue.getDomains(locale);
    localeCode += `"${locale}" : {\n`;

    /** @type {string[]} */
    const codeForDomains = [];
    for (const domain of domains) {
      codeForDomains.push(
        `"${domain}": async () => (await import("t18s-dictionary:${locale}:${domain}")).default`,
      );
    }

    let domainCode = codeForDomains.join(",\n");
    domainCode = indent(domainCode, 4);
    localeCode += domainCode + "\n}";

    codeForLocales.push(localeCode);
  }

  let localesCode = codeForLocales.join(",\n");
  let code = `export default {\n`;
  code += indent(localesCode, 4);
  code += `\n};`;
  return code;
}
