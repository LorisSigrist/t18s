import { TypedEventTarget } from "typescript-event-target";
import { DoubleKeyedMap } from "./utils/DoubleKeyedMap.js";

/** @typedef {import("./types.js").Dictionary} Dictionary */

/**
 * The valid events that may be emitted by a locale registry.
 *
 * @typedef {{
 *  "dictionary_added": CustomEvent<{ locale: string, domain: string, dictionary: Dictionary }>,
 *  "dictionary_removed": CustomEvent<{ locale: string, domain:string }>,
 *  "dictionary_changed": CustomEvent<{ locale: string, domain: string, dictionary: Dictionary }>,
 *  "messages_changed": CustomEvent<{}>,
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
   * Maps locales & domains to the files where they are defined.
   * - Key1: locale
   * - Key2: domain
   * @type {DoubleKeyedMap<string>}
   */
  #files = new DoubleKeyedMap();

  /**
   * Map domains to locales to their messages.
   * @type {DoubleKeyedMap<Dictionary>}
   */
  #messages = new DoubleKeyedMap();


  /**
   * Register a new locale.
   * @param {string} locale
   * @param {string} domain
   * @param {string} filePath
   * @param {Dictionary} dictionary
   */
  registerDictionary(locale, domain, filePath, dictionary) {
    this.#files.set(locale, domain, filePath);
    this.#messages.set(domain, locale, dictionary);

    this.#dispatch("dictionary_added", { locale, domain, dictionary });
    this.#dispatch("messages_changed", {});
  }

  /**
   * Unregister a locale.
   * @param {string} locale
   * @param {string} domain
   */
  unregisterDictionary(locale, domain) {
    this.#files.delete(locale, domain);
    this.#messages.delete(domain, locale);

    this.#dispatch("dictionary_removed", { locale, domain });
    this.#dispatch("messages_changed", {});
  }

  /**
   * @param {string} locale
   * @param {string} domain
   * @param {Dictionary} dictionary
   *
   * @throws {LocaleNotFoundException} If the locale is not registered.
   */
  setDictionary(locale, domain, dictionary) {
    if (!this.#files.has(locale, domain))
      throw new LocaleNotFoundException(locale);

    this.#messages.set(domain, locale, dictionary);

    this.#dispatch("messages_changed", {});
    this.#dispatch("dictionary_changed", { locale, domain, dictionary });
  }

  /**
   * @param {string} domain
   */
  getMessages(domain) {
    return this.#messages.getInner(domain);
  }

  /**
   * @param {string} locale
   * @param {string} domain
   * @returns {Dictionary | undefined}
   */
  getDictionary(locale, domain) {
    return this.#messages.get(domain, locale);
  }

  /**
   * @param {string} locale
   * @param {string} domain
   * @returns {string}
   *
   * @throws {LocaleNotFoundException} If the locale is not registered.
   */
  getFile(locale, domain) {
    const file = this.#files.get(locale, domain);
    if (!file) throw new LocaleNotFoundException(locale);
    return file;
  }

  /**
   * Get all domains that are registered for the given locale.
   *
   * @returns {Set<string>}
   */
  getDomains = () => new Set(this.#messages.outerKeys());
  hasDictionary = this.#messages.has;

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
