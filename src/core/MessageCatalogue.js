import { TypedEventTarget } from "typescript-event-target";
import { DoubleKeyedMap } from "./utils/DoubleKeyedMap.js";

/** @typedef {import("./types.js").Dictionary} Dictionary */

/**
 * The valid events that may be emitted by a locale registry.
 *
 * @typedef {{
 *  "locale_added": CustomEvent<{ locale: string, dictionary: Dictionary }>,
 *  "locale_removed": CustomEvent<{ locale: string }>,
 *  "locale_updated": CustomEvent<{ locale: string, dictionary: Dictionary }>,
 *  "changed": CustomEvent<{}>;
 * }} LocaleRegistryEventMap
 */

/**
 * @template P
 * @typedef {{ new(): P }} Class
 */

/** @type {Class<TypedEventTarget<LocaleRegistryEventMap>>} */
const MessageCatalogueEventTarget = /** @type {any} */ (TypedEventTarget);

export class MessageCatalogue extends MessageCatalogueEventTarget {
  /**
   * Map locales to their dictionaries.
   * @type {DoubleKeyedMap<Dictionary>}
   */
  #dictionaries = new DoubleKeyedMap();

  /**
   * Maps locales & domains to the files where they are defined.
   * - Key1: locale
   * - Key2: domain
   * @type {DoubleKeyedMap<string>}
   */
  #files = new DoubleKeyedMap();

  /**
   * Register a new locale.
   * @param {string} locale
   * @param {string} filePath
   * @param {Dictionary} dictionary
   */
  registerLocale(locale, filePath, dictionary) {
    this.#files.set(locale, "messages", filePath);
    this.#dictionaries.set(locale, "messages", dictionary);

    this.#dispatch("locale_added", { locale, dictionary });
    this.#dispatch("changed", {});
  }

  /**
   * Unregister a locale.
   * @param {string} locale
   */
  unregisterLocale(locale) {
    this.#dictionaries.delete(locale, "messages");
    this.#files.delete(locale, "messages");

    this.#dispatch("locale_removed", { locale });
    this.#dispatch("changed", {});
  }

  /**
   * @param {string} locale
   * @param {Dictionary} dictionary
   *
   * @throws {LocaleNotFoundException} If the locale is not registered.
   */
  setDictionary(locale, dictionary) {
    if (!this.#files.has(locale, "messages"))
      throw new LocaleNotFoundException(locale);
    this.#dictionaries.set(locale, "messages", dictionary);
    this.#dispatch("changed", {});
    this.#dispatch("locale_updated", { locale, dictionary });
  }

  /**
   * @param {string} locale
   * @param {string} domain
   * @returns {Dictionary}
   *
   * @throws {LocaleNotFoundException} If the locale is not registered.
   */
  getDictionary(locale, domain) {
    const dictionary = this.#dictionaries.get(locale, domain);
    if (!dictionary) throw new LocaleNotFoundException(locale);
    return dictionary;
  }

  /**
   * @param {string} locale
   * @returns {string}
   *
   * @throws {LocaleNotFoundException} If the locale is not registered.
   */
  getFile(locale) {
    if (!this.#files.has(locale, "messages"))
      throw new LocaleNotFoundException(locale);
    return this.#files.get(locale, "messages") ?? "";
  }

  getDictionaries() {
    return this.#dictionaries;
  }

  /**
   * Returns all registered locales.
   * @returns {Set<string>}
   */
  getLocales() {
    const keys = this.#dictionaries.keys();
    const locales = new Set();
    for (const [locale] of keys) {
      locales.add(locale);
    }
    return locales;
  }

  /**
   * @param {string} locale
   * @param {string} domain
   * @returns {boolean}
   */
  hasDictionary(locale, domain) {
    return this.#dictionaries.has(locale, domain);
  }

  /**
   * Dispatches an event of the given type with the given details.
   * @template {keyof LocaleRegistryEventMap} E
   *
   * @param {E} event_name
   * @param {LocaleRegistryEventMap[E] extends CustomEvent<infer D> ? D : never} details
   */
  #dispatch(event_name, details) {
    /** @type {CustomEvent} */
    const event = new CustomEvent(event_name, { detail: details });
    this.dispatchTypedEvent(event_name, event);
  }
}

export class LocaleNotFoundException extends Error {
  name = "LocaleNotFoundException";

  /** @param {string} locale */
  constructor(locale) {
    super(`Locale ${locale} is not registered.`);
  }
}
