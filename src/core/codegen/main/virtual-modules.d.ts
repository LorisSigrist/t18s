
type CompiledMessage = string | ((values: any) => string)

declare module "t18s-internal:config" {
    const config: import("../../types.js").ResolvedPluginConfig;
    export default config;
}


declare module "t18s-internal:loaders" {
    const loaders: Record<string, Record<string, () => Promise<Record<string, CompiledMessage>>>>
    export default loaders;
}