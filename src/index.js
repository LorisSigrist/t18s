import { t18sCore } from "./core/index.js";
import { t18sToolkit } from "./toolkit/index.js";

/** @type {import("./types.js").t18sDefaultConfig} */
const DEFAULT_CONFIG = {
  translationsDir: "src/translations",
  dts: "src/$t18s.d.ts",
  verbose: true,
  defaultDomain: "messages",
};

/**
 * TypeSafe translations for Svelte & SvelteKit.
 * @param {import("./types.js").t18sUserConfig} userConfig
 * @returns {import("vite").Plugin[]}
 */
export function t18s(userConfig) {
  const pluginConfig = { ...DEFAULT_CONFIG, ...userConfig };
  return [t18sToolkit(), t18sCore(pluginConfig)];
}
