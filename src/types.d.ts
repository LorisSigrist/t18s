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

  /**
   * The locales that should be made available.
   */
  locales: [string, ...string[]],
};

export type t18sDefaultConfig = FlipOptional<t18sUserConfig>;
export type t18sFullConfig = Required<t18sUserConfig>;


type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never
}[keyof T];

type FlipOptional<T> = (Required<Pick<T, OptionalKeys<T>>> &
  Partial<Omit<T, OptionalKeys<T>>>) extends infer O
  ? { [K in keyof O]: O[K] }
  : never;