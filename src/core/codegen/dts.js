import { addQuotes, stringTypeUnion } from "./utils/stringUtils.js";
import { DTSBuilder } from "./utils/dtsBuilder.js";
import { VIRTUAL_MODULE_PREFIX } from "../constants.js";

/**
 * @param {import("../types.js").LocaleDictionaries} localeDictionaries
 */
export function generateDTS(localeDictionaries) {
  const locales = [...localeDictionaries.keys()];
  const messagesTypeMap = generateTypeMapForDictionaries(localeDictionaries);

  const dts = new DTSBuilder();
  dts.setDisclaimer(
    "FILE AUTOGENERATED BY t18s\nYou can safely add this to your .gitignore"
  );

  dts.addModule(VIRTUAL_MODULE_PREFIX, (module) => {
    module.setDescription("TypeSafe translations for your Svelte app.");
    module.addImport("import type { Writable, Readable } from 'svelte/store';");

    module.addStatement(
      `type Locales = [${locales.map(addQuotes).join(",")}];`,
      (s) => s.setDescription("The available locales")
    );

    module.addStatement(`export type Locale = Locales[number];`, (s) =>
      s.setDescription("The known locales")
    );

    module.addStatement(`export const locales : Readable<Locales>;`, (s) =>
      s.setDescription(
        "A store containing the available locales.\n\nThis store will only ever change during development, it is constant in production."
      )
    );

    module.addStatement(`export const locale: Writable<Locale>;`, (s) =>
      s.setDescription("The current locale")
    );

    module.addStatement(
      "export function setLocale(newLocale: Locale): void;",
      (s) =>
        s.setDescription(
          "Set the current locale. Equivalent to `locale.set(newLocale)`\n@param newLocale The new locale"
        )
    );

    module.addStatement("export const isLoading: Readable<boolean>;", (s) =>
      s.setDescription("If the current locale is still being loaded.")
    );

    module.addStatement(
      "export function init(options: { initialLocale: Locale, fallbackLocale?: Locale, loadingDelay?: number }) : Promise<void>",
      (s) =>
        s.setDescription(
          "Initialize t18s.\nThis must be called before any other t18s function."
        )
    );

    module.addStatement(
      `export const preloadLocale: (newLocale: Locale) => Promise<void>;`,
      (s) =>
        s.setDescription(
          [
            "Preloads the translations for the given locale.",
            "This can be used to anticipate a locale change.",
            "",
            "Maybe preload the locale of the user's browser, since they're likely to switch to that.",
          ].join("\n")
        )
    );

    module.addStatement(
      "export const isLocale: (maybeLocale: unknown) => maybeLocale is Locale;",
      (s) =>
        s.setDescription(
          "Convenience function to check if something is a valid locale."
        )
    );

    let messagesType = "export type Messages = {\n";
    //Loop over all keys, and generate a type for each key.
    //The type of a key is the intersection of the types of the key in each locale.
    //Make sure to handle empty types (i.e. {}) correctly.
    for (const [key, type] of messagesTypeMap.entries()) {
      messagesType += `    "${key}": ${type},\n`;
    }

    messagesType += "};";

    module.addStatement(messagesType, (s) =>
      s.setDescription("Available Translations and their Arguments")
    );

    // t Store
    module.addStatement(
      "export const t : Writable<<Key extends keyof Messages>(key: Key, ...values: (Messages[Key] extends undefined ? [(undefined | {})?] : [Messages[Key]])) => string>;",
      (s) =>
        s.setDescription(
          [
            "The translation store.",
            "@param key A translation key.",
            "@param values Any values that are interpolated into the translation.",
          ].join("\n")
        )
    );

    // T Component
    module.addImport("import type { SvelteComponentTyped } from 'svelte';");
    module.addStatement(
      "export class T<Key extends keyof Messages> extends SvelteComponentTyped<Messages[Key] extends undefined ? { key: Key } : { key: Key, values: Messages[Key] }, {}, {}> { };",
      (s) => {
        s.setDescription("The t18s translation component.");
      }
    );
  });

  return dts.build();
}

/**
 * @param {import("../types.js").LocaleDictionaries} localeDictionaries
 * @returns {Map<string, string>}
 */
function generateTypeMapForDictionaries(localeDictionaries) {
  const locales = [...localeDictionaries.keys()];
  const messageKeys = new Set();

  for (const dictionary of localeDictionaries.values()) {
    for (const key of dictionary.keys()) {
      messageKeys.add(key);
    }
  }

  const typeMap = new Map();

  for (const key of messageKeys) {
    let type = "";

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
      type += "undefined";
    } else {
      type += messages
        .map((message) => `(${message.typeDefinition})`)
        .join(" & ");
    }

    typeMap.set(key, type);
  }
  return typeMap;
}
