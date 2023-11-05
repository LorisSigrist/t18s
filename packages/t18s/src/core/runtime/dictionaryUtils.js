import { get } from "svelte/store";
import { fallbackLocale, verbose } from "t18s-internal:config";
import { locale } from "./$t18s.js";

function getLocaleChain() {
  const localeChain = [get(locale)];
  if (fallbackLocale) localeChain.push(fallbackLocale);
  return localeChain;
}

/**
 * @param {string} key The key to translate
 * @param {Record<string, string |((values: any) => string)>} messages
 * @param {any} values
 * @returns {string}
 */
export function format(key, messages, values) {
  for (const locale of getLocaleChain()) {
    const msg = messages[locale];
    if (!msg) continue;
    if (typeof msg === "function") return msg(values);
    return msg;
  }

  if (verbose) console.warn("Could not find translation for key " + key);
  return key;
}
