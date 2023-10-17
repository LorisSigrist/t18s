/**
 * Configuration options for the t18s plugin.
 */
export type t18sUserConfig = {
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
   * The default domain which will be used when no domain is specified.
   * @default "messages"
   */
  defaultDomain?: string;
};

export type t18sFullConfig = Required<t18sUserConfig>;
