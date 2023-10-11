import { t18sCore } from "./core/index.js";
import { t18sToolkit } from "./toolkit/index.js";

/**
 * @typedef {{
*  translationsDir: string,
*  dts: string,
*  verbose: boolean,
* }} T18sUserConfig Configuration options for the t18s plugin
*/

/**
 * TypeSafe translations for Svelte & SvelteKit.
 * @param {Partial<T18sUserConfig>} userConfig
 * @returns {import("vite").Plugin[]}
 */
export function t18s(userConfig = {}) {
    return [
        t18sCore(userConfig),
        t18sToolkit(),
    ];
}