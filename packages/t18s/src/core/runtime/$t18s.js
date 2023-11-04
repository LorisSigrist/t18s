// THE CLIENT SIDE CODE FOR $t18s
import { writable } from "svelte/store";
import { verbose, fallbackLocale, locales } from "t18s-internal:config";
import { doubleKeyedSetter } from "./utils.js";

/** @type {import("svelte/store").Writable<string | null>} */
const localeStore = writable(null);
export { localeStore as locale };
export const setLocale = localeStore.set;
export { fallbackLocale, locales };

/**
 * @param {any} param
 * @returns {param is (typeof import("t18s-internal:config").locales)[number]}
 */
export const isLocale = (param) => locales.includes(param);
export const isLoading = writable(false);
