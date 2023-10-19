/**
 * @typedef {Pick<import("../types.js").ResolvedPluginConfig, "defaultDomain" | "locales" | "verbose"|"fallbackLocale">} PublicConfig
 */


/** @type {string | null} */
let cachedCode = null;

/**
 * @param {import("../types.js").ResolvedPluginConfig} config 
 */
export function generateConfigModule(config) {

    if(cachedCode !== null) return cachedCode;

    /** @type {PublicConfig} */
    const publicConfig = {
        defaultDomain: config.defaultDomain,
        locales: config.locales,
        verbose: config.verbose,
        fallbackLocale: config.fallbackLocale
    }

    const code = "export default " + JSON.stringify(publicConfig, null, 2) + ";";
    cachedCode = code;
    return code;
}