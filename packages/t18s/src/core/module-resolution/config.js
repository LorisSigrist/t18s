/**
 * If the unresolved_id is for the t18s config, this function will resolve it.
 * @type {import("./types.js").IDResolver}
 */
export const resolveConfigModuleId = (unresolved_id) => {
  if (unresolved_id !== "t18s-internal:config") return null;
  return "\0t18s-internal:config";
};

/**
 * @type {import("./types.js").ModuleLoader}
 */
export const loadConfigModule = async (resolved_id, config, Catalogue) => {
  if (resolved_id !== "\0t18s-internal:config") return null;
  return generateConfigModule(config);
};

/** @type {string | null} */
let cachedCode = null;

/**
 * @param {import("../types.js").ResolvedPluginConfig} config
 */
function generateConfigModule(config) {
  if (cachedCode !== null) return cachedCode;
  let code = "";
  code += `export const verbose = ${config.verbose ? "true" : "false"};\n`;
  code += `export const locales = ${JSON.stringify(config.locales)};\n`;
  code += `export const fallbackLocale = ${
    config.fallbackLocale ? `"${config.fallbackLocale}"` : "undefined"
  };\n`;
  code += `export const loadingDelay = 200;\n`;
  cachedCode = code;
  return code;
}
