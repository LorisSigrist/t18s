import { generateDictionaryModule } from "../../codegen/dictionary.js";
import { indent } from "../../codegen/utils/stringUtils.js";

/**
 * An t18s adapter that uses Svelte stores to store the translations.
 */
export class SvelteStoreAdapter {
  /** @type {import("vite").ViteDevServer | null} */
  #server = null;

  /** @type {import("../../types.js").ResolvedPluginConfig} */
  #config;

  /** @param {import("../../types.js").ResolvedPluginConfig}  config*/
  constructor(config) {
    this.#config = config;
  }

  /**
   * @param {import("vite").ViteDevServer | null} server
   */
  useServer(server) {
    this.#server = server;
  }

  /**
   * @param {import("../../types.js").LocaleDictionaries} localeDictionaries
   * @returns {string}
   */
  getMainCode(localeDictionaries) {
    const locales = [...localeDictionaries.keys()];
    return generateMainModuleCode(locales, this.#config.verbose);
  }

  /**
   * @param {import("../../types.js").Dictionary} dictionary
   * @param {string | null} parentLocale
   */
  getDictionaryCode(dictionary, parentLocale = null) {
    return generateDictionaryModule(dictionary);
  }

  /**s
   * @param {string} locale
   * @returns {void}
   */
  HMRAddLocale(locale) {
    this.#triggerHMREvent("createLocale", locale);
  }

  /**
   * @param {string} locale
   * @returns {void}
   */
  HMRInvalidateLocale(locale) {
    this.#triggerHMREvent("invalidateLocale", locale);
  }

  /**
   * @param {string} locale
   * @returns {void}
   */
  HMRRemoveLocale(locale) {
    this.#triggerHMREvent("removeLocale", locale);
  }

  /**
   * Triggers a HMR event, causing the browser to react to translation changes.
   *
   * @param {"createLocale" | "invalidateLocale" | "removeLocale"} event
   * @param {string} locale
   * @returns {void}
   */
  #triggerHMREvent(event, locale) {
    if (this.#server) {
      this.#server.ws.send({
        type: "custom",
        event: "t18s:" + event,
        data: {
          locale,
        },
      });
    }
  }
}

/**
 * Generates the code for the "$t18s" module
 * @param {string[]} locales
 * @param {boolean} verbose
 * @returns {string}
 */
function generateMainModuleCode(locales, verbose) {
  return `
import { writable, get } from 'svelte/store';

const messages = {}

export const locales = writable(${JSON.stringify(locales)});
export const locale = writable(null);
export const setLocale = locale.set;
export const isLoading = writable(false);

const loaders = {
${locales.map(
  (locale) =>
    `    "${locale}": async () => (await import("$t18s/messages/${locale}")).default`
)}
}

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
export async function preloadLocale(newLocale) {
  const newMessages = await loaders[newLocale]();
  messages[newLocale] = newMessages;
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

const getMessage = (key, values = undefined) => {
  const currentLocale = get(locale);

  if(currentLocale === null) {
    throw new Error("[t18s] No locale set. Did you forget to call \`init\`?");
  }

  if(messages[currentLocale] && messages[currentLocale][key]) {
    return messages[currentLocale][key](values);
  } else if (fallbackLocale && messages[fallbackLocale] && messages[fallbackLocale][key]) {
    ${
      verbose
        ? 'console.debug("[t18s] Translation for key " + key + " not found in locale " + currentLocale +". Using fallback locale " + fallbackLocale);'
        : ""
    }
    return messages[fallbackLocale][key](values);
  }  else {
  ${
    verbose
      ? 'console.warn("[t18s] Translation for key " + key + " not found in locale " + currentLocale);'
      : ""
  }
    return key;
  }
}

export const t = writable(getMessage);

//Update the store when the locale changes
locale.subscribe((newLocale) => {
  if(newLocale === null) return;
  if(newLocale in messages) {
    t.set(getMessage)
  } else {
    loadLocale(newLocale).then(() => t.set(getMessage));
  }
});

if(import.meta.hot) { 

  import.meta.hot.on("t18s:createLocale", async (data) => {
    locales.update((locales) => [...locales, data.locale]);

    //Force-reload the module - Add a random query parameter to bust the cache
    const newMessages = (await import(/* @vite-ignore */ "/@id/__x00__$t18s/messages/" + data.locale + "?" + Math.random())).default;

    ${verbose ? 'console.info("[t18s] Adding locale " + data.locale);' : ""}

    messages[data.locale] = newMessages;
    t.set(getMessage); //update the store
  });

  import.meta.hot.on("t18s:invalidateLocale", async (data) => {
    //Force-reload the module - Add a random query parameter to bust the cache
    const newMessages = (await import(/* @vite-ignore */ "/@id/__x00__$t18s/messages/" + data.locale + "?" + Math.random())).default;
   

    ${verbose ? 'console.info("[t18s] Reloading locale " + data.locale);' : ""}

    messages[data.locale] = newMessages;
    t.set(getMessage); //update the store
  });
  
  import.meta.hot.on("t18s:removeLocale", async (data) => {
    ${verbose ? 'console.info("[t18s] Removing locale " + data.locale);' : ""}

    delete messages[data.locale];

    locales.update((locales) => locales.filter((l) => l !==  data.locale));

    if(data.locale === get(locale)) {
      locale.set(get(locales)[0]);
    }

    t.set(getMessage); //update the store
  });
}
`;
}
