import { MessageCatalogue } from "../MessageCatalogue.js";

/**
 * @param {MessageCatalogue} Catalogue
 * @returns {string}
 */
export function generateLocaleModule(Catalogue) {
  const locales = [...Catalogue.getLocales()];

  const code = `
  import { writable } from 'svelte/store';
export const locales = writable(${JSON.stringify(locales)});
`;
    
    console.log(code);
    return code;
}
