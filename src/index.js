import { t18sCore } from "./core/index.js";
import { t18sToolkit } from "./toolkit/index.js";

const DEFAULT_CONFIG = {
  translationsDir: "src/translations",
  dts: "src/$t18s.d.ts",
  verbose: true,
  defaultDomain: "messages",
  fallbackLocale: null,
};


//The template jujitsu is needed so that the consumer of the plugin doesn't have to specify "as const" on the locales option
/**
 * TypeSafe translations for Svelte & SvelteKit.
 * 
 * @template {string} Locale
 * @template {readonly [Locale, ...Locale[]]} Locales
 * @param {import("./types.js").t18sUserConfig<[...Locales]>} userConfig
 * @returns {import("vite").Plugin[]}
 */
export function t18s(userConfig) {
  const pluginConfig = { ...DEFAULT_CONFIG, ...userConfig };
  return [t18sToolkit(), t18sCore(pluginConfig)];
}


/**
 * My Super cool function
 * @template One
 * @template {readonly [One, ...One[]]} Two
 * @param {One} first
 * @param {Two} second
 * @returns {[One, ...Two]}
 */
export function makeTuple(first, second) {
  return [first, ...second]
}
