import { MessageCatalogue } from "../MessageCatalogue.js";

/**
 * Generates the code for the "$t18s" module
 * @param {import("../types.js").ResolvedPluginConfig} config
 * @param {MessageCatalogue} Catalogue
 * @returns {string}
 */
export function generateMainModuleCode(config, Catalogue) {
  const code =  `
  import { writable, get } from 'svelte/store';
  import config from 't18s-internal:config';
  
  export const locales = config.locales;

  //Keeps track of the current catalogue of dictionaries. Double-Keyed by locale and domain
  const Catalogue = {}
  
  export const locale = writable(null);
  export const setLocale = locale.set;
  export const isLoading = writable(false);
  
  //Functions to load dictionaries. Double-Keyed by locale and domain
  //We need to explicitly list each import here to make sure none of 
  //the dictionaries are accidentally removed by tree-shaking
  const loaders = {
    ${config.locales.map((loc) => {
      const domains = Catalogue.getDomains(loc);
      let code = `"${loc}" : {\n`;

      domains.forEach((domain) => {
        code += `      "${domain}": async () => (await import("t18s-dictionary:${loc}:${domain}")).default,\n`;
      });

      return code + "\n}";
    })}
  };

  //List of domains that should be loaded eagerly when a new locale is loaded
  const eagerlyLoadedDomains = new Set(["${config.defaultDomain}"]);

  export let fallbackLocale = undefined;
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
  export async function preloadLocale(newLocale) {
    const domains = [...eagerlyLoadedDomains];

    for(const domain of domains) {
      if(!loaders[newLocale] || !loaders[newLocale][domain]) continue;
      const newDictionary = await loaders[newLocale][domain]();
      if(!(newLocale in Catalogue)) Catalogue[newLocale] = {};
      Catalogue[newLocale][domain] = newDictionary;
    }
  }

  export async function loadDomain(domain) {
    eagerlyLoadedDomains.add(domain);

    //Load the domain for the current locale if it's available
    if(loaders[get(locale)][domain]) {
      const dictionary = await loaders[get(locale)][domain]();
      if(!(get(locale) in Catalogue)) Catalogue[get(locale)] = {};
      Catalogue[get(locale)][domain] = dictionary;
    }
  }

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  export function isLocale(maybeLocale) {
    return locales.includes(maybeLocale);
  }
  
  export async function loadLocale(newLocale) {
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
    if(!second) return {domain: config.defaultDomain, key: first};
    else return {domain: first, key: second};
  }
  
  const getMessage = (keyString, values = undefined) => {
    const { domain, key } = parseKey(keyString);
    const currentLocale = get(locale);
  
    if(currentLocale === null) {
      throw new Error("[t18s] No locale set. Did you forget to call \`init\`?");
    }


    let formattedMessage;

    if(Catalogue[currentLocale] && Catalogue[currentLocale][domain]) {
      const dictionary = Catalogue[currentLocale][domain];
      const message = dictionary[key];
      if(message) {
        formattedMessage = typeof message === "string" ? message : message(values);
      }
    } else if(loaders[currentLocale] && loaders[currentLocale][domain]) {
      loaders[currentLocale][domain]().then(dictionary => {
        Catalogue[currentLocale] = Catalogue[currentLocale] ?? {};
        Catalogue[currentLocale][domain] = dictionary;
        t.set(getMessage);
      });
    }

    if(formattedMessage) return formattedMessage;

    if (fallbackLocale && Catalogue[fallbackLocale] && Catalogue[fallbackLocale][domain]) {
      const dictionary = Catalogue[fallbackLocale][domain];
      const fallbackMessage = dictionary[key];
      if(fallbackMessage) {
        formattedMessage = typeof fallbackMessage === "string" ? fallbackMessage : fallbackMessage(values);
      }
    } else if(loaders[fallbackLocale] && loaders[fallbackLocale][domain]) {
      loaders[fallbackLocale][domain]().then(dictionary => {
        Catalogue[fallbackLocale] = Catalogue[fallbackLocale] ?? {};
        Catalogue[fallbackLocale][domain] = dictionary;
        t.set(getMessage);
      });
    }

    if(formattedMessage) return formattedMessage;
    console.warn("[t18s] Translation for key " + keyString + " not found in locale " + currentLocale);
    return keyString;
    
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
  }
  `;

  return code;
}
