// THE CLIENT SIDE CODE FOR $t18s
// CANNOT IMPORT ANY RELATIVE FILES - WE READ THIS USING fs.readFile

import { writable, get } from "svelte/store";
import config from "t18s-internal:config";
import initial_loaders from "t18s-internal:loaders";

/** @type {import("svelte/store").Writable<string | null>} */
export const locale = writable(null);
export const locales = config.locales;
export const setLocale = locale.set;
export const isLoading = writable(false);

//Functions to load dictionaries. Double-Keyed by locale and domain
let loaders = initial_loaders;

/**
 * @param {string} locale
 * @param {string} domain
 * @returns {(() => Promise<Record<string, CompiledMessage>>) | undefined}
 */
function getLoader(locale, domain) {
  const loadersForLocale = loaders[locale];
  if (!loadersForLocale) return undefined;
  return loadersForLocale[domain];
}

//Keeps track of the current catalogue of dictionaries. Double-Keyed by locale and domain
/** @type {Record<string, Record<string, Record<string, CompiledMessage>>>} */
const Catalogue = {};

/**
 * @param {string} locale
 * @param {string} domain
 * @returns {Record<string, CompiledMessage> | undefined}
 */
function getDictionary(locale, domain) {
  const domainsForLocale = Catalogue[locale];
  if (!domainsForLocale) return undefined;
  return domainsForLocale[domain];
}

//List of domains that should be loaded eagerly when a new locale is loaded
const eagerlyLoadedDomains = new Set([config.defaultDomain]);

/** @type {string | undefined} */
export let fallbackLocale = undefined;
let loadingDelay = 200;

/**
 * Must be called before any other t18s function.
 * @param {{initialLocale: string, fallbackLocale?:string, loadingDelay?:number }} options
 */
export async function init(options) {
  if (!options.initialLocale)
    throw new Error("[t18s] No initial locale provided when calling `init`");

  locale.set(options.initialLocale);
  fallbackLocale = options.fallbackLocale;
  loadingDelay = options.loadingDelay ?? loadingDelay;

  try {
    const promises = [];
    promises.push(preloadLocale(options.initialLocale));
    if (options.fallbackLocale)
      promises.push(preloadLocale(options.fallbackLocale));
    await Promise.allSettled(promises);
  } catch (e) {
    throw new Error(
      "[t18s] Failed to load initial locale " + options.initialLocale,
      { cause: e }
    );
  }
}

/**
 * Load the given locale quietly in the background
 * @param {string} newLocale
 *
 * @throws {Error} If the locale could not be loaded
 */
export async function preloadLocale(newLocale) {
  const domains = [...eagerlyLoadedDomains];

  const loadersForLocale = loaders[newLocale] ?? {};

  /**
   * @type {Promise<{domain: string, dictionary: Record<string, CompiledMessage>}>[]}
   */
  const loaderPromises = [];

  for (const domain of domains) {
    const loader = loadersForLocale[domain];
    if (!loader) continue;

    loaderPromises.push(
      new Promise((resolve, reject) => {
        loader()
          .then((dictionary) => resolve({ domain, dictionary }))
          .catch(reject);
      })
    );
  }

  const loaderResults = await Promise.allSettled(loaderPromises);
  for (const result of loaderResults) {
    if (result.status === "rejected") continue;
    const { domain, dictionary } = result.value;

    const domainsForLocale = Catalogue[newLocale] ?? {};
    domainsForLocale[domain] = dictionary;
    Catalogue[newLocale] = domainsForLocale;
  }
}

/** @param {string} domain */
export async function loadDomain(domain) {
  eagerlyLoadedDomains.add(domain);
  const currentLocale = get(locale);
  if (!currentLocale)
    throw new Error("[t18s] No locale set. Did you forget to call `init`?");

  //Execute the Loader for the domain with the current locale
  const loadersForLocale = loaders[currentLocale] ?? {};
  const loader = loadersForLocale[domain];
  if (!loader) return;
  await loader();
}

/** @param {number} ms */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** @param {any} maybeLocale */
export function isLocale(maybeLocale) {
  return locales.includes(maybeLocale);
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
    console.error("[t18s] Failed to load locale " + newLocale);
  } finally {
    isLoading.set(false);
    done = true;
  }
}

/** @param {string} key */
function parseKey(key) {
  const [first, second] = key.split(":");
  if (!first) throw new Error("[t18s] Invalid key: " + key);
  if (!second) return { domain: config.defaultDomain, key: first };
  else return { domain: first, key: second };
}

/**
 * @param {string} keyString
 * @param {any} values
 * @returns
 */
const getMessage = (keyString, values = undefined) => {
  const { domain, key } = parseKey(keyString);
  const currentLocale = get(locale);

  if (currentLocale === null) {
    throw new Error("[t18s] No locale set. Did you forget to call `init`?");
  }

  let formattedMessage;

  const dictionary = getDictionary(currentLocale, domain);
  if (dictionary) {
    const messageValue = dictionary[key];
    if (messageValue) {
      formattedMessage =
        typeof messageValue === "string" ? messageValue : messageValue(values);
    }
  } else {
    const loader = getLoader(currentLocale, domain);
    if (loader) {
      loader().then((dictionary) => {
        const domains = Catalogue[currentLocale] ?? {};
        domains[domain] = dictionary;
        Catalogue[currentLocale] = domains;
        t.set(getMessage); //trigger a re-render
      });
    }
  }

  if (formattedMessage) return formattedMessage;
  
  if (fallbackLocale) {
    const fallbackDictionary = getDictionary(fallbackLocale, domain);
    if (fallbackDictionary) {
      const messageValue = fallbackDictionary[key];
      if (messageValue) {
        formattedMessage =
          typeof messageValue === "string"
            ? messageValue
            : messageValue(values);
      }
    } else {
      const loader = getLoader(fallbackLocale, domain);
      if (loader) {
        loader().then((dictionary) => {
          if (!fallbackLocale) return;
          const domains = Catalogue[fallbackLocale] ?? {};
          domains[domain] = dictionary;
          Catalogue[fallbackLocale] = domains;
          t.set(getMessage); //trigger a re-render
        });
      }
    }
  }

  if (formattedMessage) return formattedMessage;

  console.warn(
    "[t18s] Translation for key " +
      keyString +
      " not found in locale " +
      currentLocale
  );
  return keyString;
};

export const t = writable(getMessage);

//Update the store when the locale changes
locale.subscribe((newLocale) => {
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

    let domainsForLocale = Catalogue[locale];
    if (!domainsForLocale) {
      domainsForLocale = Catalogue[locale] = {};
    }

    domainsForLocale[domain] = dictionary;
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
