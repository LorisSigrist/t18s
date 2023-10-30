export interface ResolvedPluginConfig {
  dtsPath: string;
  translationsDir: string;
  verbose: boolean;
  locales: string[];
  fallbackLocale: string | null;
}
