/**
 * Configuration options for the t18s plugin.
 */
export type t18sUserConfig<Locales extends readonly string[]> = {
  /**
   * The directory in which to search for translation files.
   * @default "src/translations"
   */
  translationsDir?: string;

  /**
   * The path to which to write the dynamic type-definitions.
   * @default "src/$t18s.d.ts"
   */
  dts?: string;

  /**
   * Increase or decrease the amount of logging.
   * @default true
   */
  verbose?: boolean;

  /**
   * The locales that should be made available.
   */
  locales: Locales;

  /**
   * The fallback locale to use when a translation is not in the current locale.
   * @default null
   */
  fallbackLocale?: Locales[number] | null;
};

export type t18sFullConfig = Required<t18sUserConfig<string[]>>;
