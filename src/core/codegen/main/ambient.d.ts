/// <reference types="vite/client" />

type CompiledMessage = string | ((values: any) => string);

declare module "t18s-internal:config" {
  export const verbose: boolean;
  export const locales: readonly string[];
  export const fallbackLocale: string | undefined;
  export const defaultDomain: string;
}

declare module "t18s-internal:loaders" {
  const loaders: Record<
    string,
    Record<string, () => Promise<Record<string, CompiledMessage>>>
  >;
  export default loaders;
}
