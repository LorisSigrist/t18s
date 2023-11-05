// THE CLIENT SIDE CODE FOR $t18s
import { writable } from "svelte/store";
import { fallbackLocale, locales } from "t18s-internal:config";

/** @type {import("svelte/store").Writable<string>} */
export const locale = writable(locales[0]);
export const setLocale = locale.set;

/**
 * @param {any} param
 * @returns {param is (typeof import("t18s-internal:config").locales)[number]}
 */
export const isLocale = (param) => locales.includes(param);
export const isLoading = writable(false);

export { fallbackLocale, locales };
