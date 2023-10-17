import { MessageCatalogue } from "../MessageCatalogue.js";
import { DEFAULT_DOMAIN } from "../constants.js";

/**
 * Generates the code for the "$t18s" module
 * @param {MessageCatalogue} Catalogue
 * @param {boolean} verbose
 * @returns {string}
 */
export function generateMainModuleCode(Catalogue, verbose) {
  const locales = [...Catalogue.getLocales()];

  return `
  import { writable, get } from 'svelte/store';
  export { default as T } from "$t18s-runtime:T.svelte";

  //Keeps track of the current catalogue of dictionaries. Double-Keyed by locale and domain
  const Catalogue = {}
  
  export const locales = writable(${JSON.stringify(locales)});
  export const locale = writable(null);
  export const setLocale = locale.set;
  export const isLoading = writable(false);
  
  //Functions to load dictionaries. Double-Keyed by locale and domain
  //We need to explicitly list each import here to make sure none of 
  //the dictionaries are accidentally removed by tree-shaking
  const loaders = {
    ${locales.map((loc) => {
      const domains = Catalogue.getDomains(loc);
      let code = `"${loc}" : {\n`;

      domains.forEach((domain) => {
        code += `      "${domain}": async () => (await import("t18s-dictionary:${loc}:${domain}")).default,\n`;
      });

      return code + "\n}";
    })}
  };
  
  let fallbackLocale = undefined;
  let loadingDelay = 200;
  
  export async function init(options) {
    
    if(!options.initialLocale) throw new Error("[t18s] No initial locale provided when calling \`init\`");
    locale.set(options.initialLocale);
  
    if(options.fallbackLocale) {
      fallbackLocale = options.fallbackLocale;
    }
  
    if(options.loadingDelay !== undefined) {
      loadingDelay = options.loadingDelay;
    }
  
    try {
      const promises = [];
      promises.push(preloadLocale(options.initialLocale));
      if(options.fallbackLocale) promises.push(preloadLocale(options.fallbackLocale));
      await Promise.all(promises);
    } catch(e) {
      throw new Error("[t18s] Failed to load initial locale " + options.initialLocale + ": " + e.message, {cause: e});
    }
  }
  
  //Load the given locale quietly in the background
  //May throw
  export async function preloadLocale(newLocale, domain = "${DEFAULT_DOMAIN}") {
    const newDictionary = await loaders[newLocale][domain]();
    if(!(newLocale in Catalogue)) Catalogue[newLocale] = {};
    Catalogue[newLocale][domain] = newDictionary;
  }

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  export function isLocale(maybeLocale) {
    return get(locales).includes(maybeLocale);
  }
  
  async function loadLocale(newLocale) {
    let done = false;
    try {
      //To avoid showing the loading state too much, we allow a small delay before showing the loading state.
      sleep(loadingDelay).then(() => {if(!done) isLoading.set(true)});
      await preloadLocale(newLocale);
    } catch(e) {
      console.error("[t18s] Failed to load locale " + newLocale + ": " + e.message);
    } finally {
      isLoading.set(false);
      done = true;
    }
  }

  function parseKey(key) {
    const [first, second] = key.split(":");
    if(!first) throw new Error("[t18s] Invalid key: " + key);
    if(!second) return {domain: "${DEFAULT_DOMAIN}", key: first};
    else return {domain: first, key: second};
  }
  
  const getMessage = (keyString, values = undefined) => {
    const currentLocale = get(locale);
  
    if(currentLocale === null) {
      throw new Error("[t18s] No locale set. Did you forget to call \`init\`?");
    }

    const { domain, key } = parseKey(keyString);
    if(Catalogue[currentLocale] && Catalogue[currentLocale][domain] && Catalogue[currentLocale][domain][key]) {
      const message = Catalogue[currentLocale][domain][key];
      return typeof message === "string" ? message : message(values);
    } else if (fallbackLocale && Catalogue[fallbackLocale] && Catalogue[fallbackLocale][domain] && Catalogue[fallbackLocale][domain][key]) {
      const fallbackMessage = Catalogue[fallbackLocale][domain][key];
      return typeof fallbackMessage === "string" ? fallbackMessage : fallbackMessage(values);
    } else {
      console.warn("[t18s] Translation for key " + key + " not found in locale " + currentLocale);
      return key;
    }
  }
  
  export const t = writable(getMessage);
  
  //Update the store when the locale changes
  locale.subscribe((newLocale) => {
    if(newLocale === null) return;
    if(newLocale in Catalogue) {
      t.set(getMessage)
    } else {
      loadLocale(newLocale).then(() => t.set(getMessage));
    }
  });
  
  if(import.meta.hot) {
    import.meta.hot.on("t18s:addDictionary", async (data) => { 
      //Force-reload the dictionary - Add a random query parameter to bust the cache
      const dictionary = (await import(/* @vite-ignore */ "/@id/__x00__t18s-dictionary:" + data.locale + ":" + data.domain + "?" + Math.random())).default;

      Catalogue[data.locale] = Catalogue[data.locale] ?? {};
      Catalogue[data.locale][data.domain] = dictionary;

      t.set(getMessage); //update the store
    });
  
    import.meta.hot.on("t18s:reloadDictionary", async (data) => {
      //Force-reload the dictionary - Add a random query parameter to bust the cache
      const dictionary = (await import(/* @vite-ignore */ "/@id/__x00__t18s-dictionary:" + data.locale + ":" + data.domain + "?" + Math.random())).default;
      
      Catalogue[data.locale] = Catalogue[data.locale] ?? {};
      Catalogue[data.locale][data.domain] = dictionary;

      t.set(getMessage); //update the store
    });
    
    import.meta.hot.on("t18s:removeDictionary", async (data) => {
      if(Catalogue[data.locale] && Catalogue[data.locale][data.domain]) {
        delete Catalogue[data.locale][data.domain];
      }

      if(Object.keys(Catalogue[data.locale]).length === 0) {
        delete Catalogue[data.locale];
      }
 
      t.set(getMessage); //update the store
    });

    import.meta.hot.on("t18s:addLocale", async (data) => {
      locales.update((locales) => [...locales, data.locale]);
    });

    import.meta.hot.on("t18s:removeLocale", async (data) => {
      locales.update((locales) => locales.filter((l) => l !==  data.locale));
      
      //Switch locale if the current locale was removed
      if(data.locale === get(locale)) {
        locale.set(get(locales)[0]);
        t.set(getMessage); //rerender the component
      }
    });
  }
  `;
}
