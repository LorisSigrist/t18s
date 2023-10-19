declare module 't18s' {
	/**
	 * TypeSafe translations for Svelte & SvelteKit.
	 *
	 * */
	export function t18s<Locale extends string, Locales extends readonly [Locale, ...Locale[]]>(userConfig: t18sUserConfig<[...Locales]>): import("vite").Plugin[];
	/**
	 * My Super cool function
	 * */
	export function makeTuple<One, Two extends readonly [One, ...One[]]>(first: One, second: Two): [One, ...Two];
  /**
   * Configuration options for the t18s plugin.
   */
  type t18sUserConfig<Locales extends readonly string[]> = {
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
	locales: Locales,
	fallbackLocale?: Locales[number] | null
  };
}

//# sourceMappingURL=index.d.ts.map