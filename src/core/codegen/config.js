/**
 * @param {import("../types.js").ResolvedPluginConfig} config 
 */
export function generateConfigModule(config) {
    return "export default " + JSON.stringify(config);
}