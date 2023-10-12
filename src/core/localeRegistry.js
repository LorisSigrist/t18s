export class LocaleRegistry {
  /**
   * Map locales to their dictionaries.
   * @type {Map<string, import("./types.js").Dictionary>}
   */
  #dictionaries = new Map();

  /**
   * Maps locales to the files where they are defined.
   * @type {Map<string, string>}
   */
  #files = new Map();

  /**
   * Register a new locale.
   * @param {string} locale
   * @param {string} filePath
   */
  registerLocale(locale, filePath) {
    this.#files.set(locale, filePath);
    this.#dictionaries.set(locale, new Map());
  }

  /**
   * Unregister a locale.
   * @param {string} locale
   */
  unregisterLocale(locale) {
    this.#dictionaries.delete(locale);
    this.#files.delete(locale);
  }

  /**
   * @param {string} locale
   * @param {import("./types.js").Dictionary} dictionary
   *
   * @throws {LocaleNotFoundException} If the locale is not registered.
   */
  setDictionary(locale, dictionary) {
    if (!this.#files.has(locale)) throw new LocaleNotFoundException(locale);
    this.#dictionaries.set(locale, dictionary);
  }

  /**
   * @param {string} locale
   * @returns {import("./types.js").Dictionary}
   *
   * @throws {LocaleNotFoundException} If the locale is not registered.
   */
  getDictionary(locale) {
    if (!this.#dictionaries.has(locale))
      throw new LocaleNotFoundException(locale);

    return this.#dictionaries.get(locale) ?? new Map();
  }

  /**
   * @param {string} locale
   * @returns {string}
   *
   * @throws {LocaleNotFoundException} If the locale is not registered.
   */
  getFile(locale) {
    if (!this.#files.has(locale)) throw new LocaleNotFoundException(locale);

    return this.#files.get(locale) ?? "";
  }

  getDictionaries() {
    return this.#dictionaries;
  }

  /**
   * Returns all registered locales.
   * @returns {Set<string>}
   */
  getLocales() {
    return new Set(this.#dictionaries.keys());
  }

  /**
   * @param {string} locale
   * @returns {boolean}
   */
  hasLocale(locale) {
    return this.#dictionaries.has(locale);
  }
}

export class LocaleNotFoundException extends Error {
  name = "LocaleNotFoundException";

  /** @param {string} locale */
  constructor(locale) {
    super(`Locale ${locale} is not registered.`);
  }
}
