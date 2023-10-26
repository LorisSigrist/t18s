// THE CLIENT SIDE CODE FOR $t18s
import { writable } from "svelte/store";
import {
  verbose,
  fallbackLocale,
  locales,
} from "t18s-internal:config";
import {  doubleKeyedSetter } from "./utils.js";

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

//Keeps track of the current catalogue of dictionaries. Double-Keyed by locale and domain
/** @type {Record<string, Record<string, Record<string, CompiledMessage>>>} */
const Catalogue = {};
const setDictionary = doubleKeyedSetter(Catalogue);


if (import.meta.hot) {
  /**
   * Force-reloads the dictionary for the given locale and domain
   * @param {string} locale
   * @param {string} domain
   */
  async function forceReloadDictionary(locale, domain) {
    const dictionary = (
      await import(
        /* @vite-ignore */ `/@id/__x00__t18s-dictionary:${locale}:${domain}?${crypto.randomUUID()}`
      )
    ).default;

    setDictionary(locale, domain, dictionary);
  }

  import.meta.hot.on("t18s:addDictionary", async (data) => {
    await Promise.all([
      forceReloadDictionary(data.locale, data.domain),
    ]);

  });

  import.meta.hot.on("t18s:reloadDictionary", async (data) => {
    await forceReloadDictionary(data.locale, data.domain);
  });

  import.meta.hot.on("t18s:removeDictionary", async (data) => {
    /**@type {{locale: string, domain: string}} */
    const { locale, domain } = data;

    const domainsForLocale = Catalogue[locale];
    if (domainsForLocale) {
      delete domainsForLocale[domain];

      if (Object.keys(domainsForLocale).length === 0) {
        delete Catalogue[locale];
      }
    }
  });
}
