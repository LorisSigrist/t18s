/** @type {string | null} */
let cachedCode = null;

/**
 * @param {import("../types.js").ResolvedPluginConfig} config
 */
export function generateConfigModule(config) {
  if (cachedCode !== null) return cachedCode;
  let code = "";
  code += `export const verbose = ${config.verbose ? "true" : "false"};\n`;
  code += `export const locales = ${JSON.stringify(config.locales)};\n`;
  code += `export const fallbackLocale = ${
    config.fallbackLocale ? `"${config.fallbackLocale}"` : "undefined"
  };\n`;
  code += `export const defaultDomain = "${config.defaultDomain}";\n`;
  cachedCode = code;
  return code;
}
