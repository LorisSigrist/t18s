import { addQuotes, stringTypeUnion } from "../stringUtils.js";

/**
 * An t18s adapter that uses Svelte stores to store the translations.
 */
export class SvelteStoreAdapter {
  /** @type {import("vite").ViteDevServer | null} */
  #server = null;

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
  getTypeDefinition(localeDictionaries) {
    return generateDTS(localeDictionaries);
  }

  /**
   * @param {import("../../types.js").LocaleDictionaries} localeDictionaries
   * @returns {string}
   */
  getMainCode(localeDictionaries) {
    const locales = [...localeDictionaries.keys()];
    return generateMainModuleCode(locales);
  }

  /**
   * @param {import("../../types.js").Dictionary} dictionary
   */
  getDictionaryCode(dictionary) {
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
 * Write a d.ts file that incorporates all the translations for all locales.
 *
 * @param {import("../../types.js").LocaleDictionaries} localeDictionaries
 */
function generateDTS(localeDictionaries) {
  const locales = [...localeDictionaries.keys()];
  const messageKeys = new Set();

  for (const dictionary of localeDictionaries.values()) {
    for (const key of dictionary.keys()) {
      messageKeys.add(key);
    }
  }

  let code = `// FILE AUTOGENERATED BY t18s
// You can safely add this to your .gitignore
declare module '@t18s' {
    import type { Writable } from 'svelte/store';

    export type Locale = ${stringTypeUnion(locales)};

    /**
     * A store containing the available locales.
     */
    export const locales : Writable<readonly [${locales
      .map(addQuotes)
    .join(",")}]>;
      
    /**
     * The current locale
     */
    export const locale: Writable<Locale>;

    /**
     * Set the current locale. Equivalent to \`locale.set(newLocale)\`
     * @param newLocale The new locale
     */
    export function setLocale(newLocale: Locale): void;

    /**
     * If the current locale is still being loaded.
     */
    export const isLoading: Writable<boolean>;

    export type Messages = {
`;

  //Loop over all keys, and generate a type for each key.
  //The type of a key is the intersection of the types of the key in each locale.
  //Make sure to handle empty types (i.e. {}) correctly.
  for (const key of messageKeys) {
    code += `        "${key}": `;

    /**
     * The type for this key in each locale.
     * @type {import("../../types.js").Message[]}
     */
    let messages = [];

    for (const locale of locales) {
      const dictionary = localeDictionaries.get(locale);
      if (!dictionary) continue;
      const message = dictionary.get(key);
      if (message && message.typeDefinition) {
        messages.push(message);
      }
    }

    if (messages.length === 0) {
      code += "undefined";
    } else {
      code += messages
        .map((message) => `(${message.typeDefinition})`)
        .join(" & ");
    }

    code += ",\n";
  }
  code += "    };\n\n";

  code +=
    "    export const t : Writable<<Key extends keyof Messages>(key: Key, ...values: (Messages[Key] extends undefined ? [(undefined | {})?] : [Messages[Key]])) => string>\n";
  code += "};\n";
  return code;
}

/**
 * Generates the code for the "@t18s" module
 * @param {string[]} locales
 * @returns {string}
 */
function generateMainModuleCode(locales) {
  return `
import { writable, get } from 'svelte/store';
${locales
  .map(
    (locale) =>
      `import { default as dictionary_${locale} } from "@t18s/messages/${locale}";`
  )
  .join("\n")}

const messages = {
${locales.map((locale) => `    ${locale} : dictionary_${locale},`).join("\n")}
}

export const locales = writable(${JSON.stringify(locales)});
export const locale = writable("${locales[0]}");
export const setLocale = locale.set;
export const isLoading = writable(false);

export async function loadLocale(newLocale) {
  const newMessages = (await import(/* @vite-ignore */ "/@id/__x00__@t18s/messages/" + newLocale + "?" + Math.random())).default;
  messages[newLocale] = newMessages;
}

const getMessage = (key, values = undefined) => {
  const currentLocale = get(locale);
  if(messages[currentLocale] && messages[currentLocale][key]) {
    return messages[currentLocale][key](values);
  } else {
    console.warn("[t18s] Translation for key " + key + " not found in locale " + currentLocale);
    return key;
  }
}

export const t = writable(getMessage);

//Update the store when the locale changes
locale.subscribe((value) => { t.set(getMessage) });

if(import.meta.hot) { 

  import.meta.hot.on("t18s:createLocale", async (data)=>{
    locales.update((locales) => [...locales, data.locale]);

    //Force-reload the module - Add a random query parameter to bust the cache
    const newMessages = (await import(/* @vite-ignore */ "/@id/__x00__@t18s/messages/" + data.locale + "?" + Math.random())).default;

    console.info("[t18s] Adding locale " + data.locale);

    messages[data.locale] = newMessages;
    t.set(getMessage); //update the store
  });

  import.meta.hot.on("t18s:invalidateLocale", async (data)=>{
    //Force-reload the module - Add a random query parameter to bust the cache
    const newMessages = (await import(/* @vite-ignore */ "/@id/__x00__@t18s/messages/" + data.locale + "?" + Math.random())).default;
    console.info("[t18s] Reloading locale " + data.locale);

    messages[data.locale] = newMessages;
    t.set(getMessage); //update the store
  });
  
  import.meta.hot.on("t18s:removeLocale", async (data)=>{
    console.info("[t18s] Removing locale " + data.locale);

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

/**
 * Generates the code for the `@t18s/messages/<locale>` modules.
 *
 * @param {import("../../types.js").Dictionary} dictionary
 * @returns {string}
 */
function generateDictionaryModule(dictionary) {
  let code = "";
  code += "const dictionary = {\n";
  for (const [key, func] of dictionary) {
    code += `    "${key}": ${func.precompiled},\n`;
  }
  code += "};\n\n";

  code += "export default dictionary;";

  return code;
}
