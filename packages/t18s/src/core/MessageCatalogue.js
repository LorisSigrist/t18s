import { TypedEventTarget } from "typescript-event-target";
import { DoubleKeyedMap } from "./utils/DoubleKeyedMap.js";

/**
 * The valid events that may be emitted by a locale registry.
 *
 * @typedef {{
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
   * @type {DoubleKeyedMap<import("./types.js").Dictionary>}
   */
  #messages = new DoubleKeyedMap();

  /**
   * Register a new locale.
   * @param {string} locale
   * @param {string} domain
   * @param {string} filePath
   * @param {import("./types.js").Dictionary} dictionary
   */
  registerDictionary(locale, domain, filePath, dictionary) {
    this.#files.set(locale, domain, filePath);
    this.#messages.set(domain, locale, dictionary);
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
    this.#dispatch("messages_changed", {});
  }

  /**
   * @param {string} locale
   * @param {string} domain
   * @param {import("./types.js").Dictionary} dictionary
   */
  setDictionary(locale, domain, dictionary) {
    this.#messages.set(domain, locale, dictionary);

    this.#dispatch("messages_changed", {});
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
   * @returns {import("./types.js").Dictionary | undefined}
   */
  getDictionary(locale, domain) {
    return this.#messages.get(domain, locale);
  }

  /**
   * @param {string} locale
   * @param {string} domain
   * @returns {string | null}
   */
  getFile(locale, domain) {
    const file = this.#files.get(locale, domain);
    if (!file) return null;
    return file;
  }

  /**
   * Get all domains that are registered for the given locale.
   *
   * @returns {Set<string>}
   */
  getDomains = () => new Set(this.#messages.outerKeys());
  /** 
   * @param {string} locale 
   * @param {string} domain 
   * @returns 
   */
  hasDictionary = (locale, domain) => this.#messages.has(domain, locale);

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