// THE CLIENT SIDE CODE FOR $t18s
import { writable, get } from "svelte/store";
import {
  verbose,
  fallbackLocale,
  locales,
  defaultDomain,
} from "t18s-internal:config";
import initial_loaders from "t18s-internal:loaders";
import { doubleKeyedGetter, doubleKeyedSetter, sleep } from "./utils.js";

/** @type {import("svelte/store").Writable<string | null>} */
const localeStore = writable(null);
export { localeStore as locale };
export const setLocale = localeStore.set;
export { fallbackLocale, locales };

/** @param {any} param */
export const isLocale = (param) => locales.includes(param);

export const isLoading = writable(false);

//Functions to load dictionaries. Double-Keyed by locale and domain
let loaders = initial_loaders;
const getLoader = doubleKeyedGetter(loaders);

//Keeps track of the current catalogue of dictionaries. Double-Keyed by locale and domain
/** @type {Record<string, Record<string, Record<string, CompiledMessage>>>} */
const Catalogue = {};
const getDictionary = doubleKeyedGetter(Catalogue);
const setDictionary = doubleKeyedSetter(Catalogue);

/**
 * Executes the loader for the given locale and domain if it exists,
 * and adds the dictionary to the catalogue.
 *
 * @param {string} locale
 * @param {string} domain
 * @returns {Promise<void>}
 */
const loadDictionary = async (locale, domain) => {
  const loader = getLoader(locale, domain);
  if (!loader) return;
  const dictionary = await loader();
  setDictionary(locale, domain, dictionary);
  t.set(getMessage); //trigger a re-render
};

//List of domains that should be loaded eagerly when a new locale is loaded
const eagerlyLoadedDomains = new Set([defaultDomain]);
let loadingDelay = 200;

/**
 * Load the given locale quietly in the background
 *
 * @param {string} newLocale
 * @throws {Error} If the locale could not be loaded
 */
export async function preloadLocale(newLocale) {
  const domains = [...eagerlyLoadedDomains]; //The domains to load for this locale

  const localeChain = [newLocale];
  if (fallbackLocale) localeChain.push(fallbackLocale);

  /**
   * @type {Promise<{locale: string, domain: string, dictionary: Record<string, CompiledMessage>}>[]}
   */
  const loaderPromises = [];

  for (const locale of localeChain) {
    for (const domain of domains) {
      const loader = getLoader(locale, domain);
      if (!loader) continue;

      loaderPromises.push(
        new Promise((resolve, reject) => {
          loader()
            .then((dictionary) => resolve({ locale, domain, dictionary }))
            .catch(reject);
        })
      );
    }
  }

  const loaderResults = await Promise.allSettled(loaderPromises);
  for (const result of loaderResults) {
    if (result.status === "rejected") continue;
    const { locale, domain, dictionary } = result.value;
    setDictionary(locale, domain, dictionary);
  }
}

/** @param {string} domain */
export async function loadDomain(domain) {
  eagerlyLoadedDomains.add(domain);
  const currentLocale = get(localeStore);
  if (!currentLocale)
    throw new Error(
      "[t18s] No locale set. Did you forget to set one in `+layout.js`?"
    );

  await loadDictionary(currentLocale, domain);
}

/** @param {string} newLocale */
export async function loadLocale(newLocale) {
  let done = false;
  try {
    sleep(loadingDelay).then(() => {
      if (!done) isLoading.set(true);
    });
    await preloadLocale(newLocale);
  } catch (e) {
    if (verbose) {
      console.error("[t18s] Failed to load locale " + newLocale);
    }
  } finally {
    isLoading.set(false);
    done = true;
  }
}

/** @param {string} key */
function parseKey(key) {
  const [first, second] = key.split(":");
  if (!first) throw new Error("[t18s] Invalid key: " + key);
  if (!second) return { domain: defaultDomain, key: first };
  else return { domain: first, key: second };
}

/**
 * @param {string} keyString
 * @param {any} values
 * @returns
 */
const getMessage = (keyString, values = undefined) => {
  const currentLocale = get(localeStore);
  if (currentLocale === null)
    throw new Error(
      "[t18s] No locale set. Did you forget to set one in `+layout.js`?"
    );

  const { domain, key } = parseKey(keyString);

  const localeChain = [currentLocale];
  if (fallbackLocale) localeChain.push(fallbackLocale);

  let formattedMessage;
  for (const locale of localeChain) {
    const dictionary = getDictionary(locale, domain);
    if (dictionary) {
      formattedMessage = getFormatted(dictionary, key, values);
      if (formattedMessage) break;
    } else {
      loadDictionary(locale, domain);
    }
  }

  if (formattedMessage) return formattedMessage;

  if (verbose) {
    console.warn(
      "[t18s] Translation for key " +
        keyString +
        " not found in locale " +
        currentLocale
    );
  }
  return keyString;
};

export const t = writable(getMessage);

//Update the store when the locale changes
localeStore.subscribe((newLocale) => {
  if (newLocale === null) return;
  if (newLocale in Catalogue) {
    t.set(getMessage);
  } else {
    loadLocale(newLocale).then(() => t.set(getMessage));
  }
});

if (import.meta.hot) {
  async function invalidateLoaders() {
    const newLoaders = (
      await import(
        /* @vite-ignore */ `/@id/__x00__t18s-internal:loaders?${crypto.randomUUID()}`
      )
    ).default;
    loaders = newLoaders.default;
  }

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
      invalidateLoaders(),
    ]);

    t.set(getMessage); //update the store
  });

  import.meta.hot.on("t18s:reloadDictionary", async (data) => {
    await forceReloadDictionary(data.locale, data.domain);
    t.set(getMessage); //update the store
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

    await invalidateLoaders();
    t.set(getMessage); //update the store
  });
}

// UTILS

/**
 * If the dictionary contains the messageKey, it will format the message using the given values. Otherwise, it will return undefined.
 * @param {Record<string, CompiledMessage>} dictionary
 * @param {string} messageKey
 * @param {any} values
 */
function getFormatted(dictionary, messageKey, values) {
  const message = dictionary[messageKey];
  if (!message) return;
  return typeof message === "string" ? message : message(values);
}
