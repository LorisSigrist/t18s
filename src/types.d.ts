/**
 * Maps locales to their corresponding Dictionaries.
 */
export type LocaleDictionaries = Map<string, Dictionary>;

/**
 * Maps translation Keys to their corresponding Message.
 */
export type Dictionary = Map<string, Message>;

export interface Message {
  /** The raw ICU MessageFormat string. */
  source: string;

  /** A string with a precompiled function that generates a function that returns the formatted message string. */
  precompiled: string;

  /** A string containing the type definition for the message function arguments. */
  typeDefinition: string;

  /** An optional description of the message that provides context for translators. */
  description: string | null;
}


export interface ResolvedPluginConfig {
  dtsPath: string;
  translationsDir: string;
  fallbackLocale: string;
}