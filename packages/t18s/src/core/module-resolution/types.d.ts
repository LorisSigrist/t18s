import { MessageCatalogue } from "../MessageCatalogue.js"
import { ResolvedPluginConfig } from "../types.js"

export type ModuleLoader = (resolved_id: string, config: ResolvedPluginConfig, catalogue: MessageCatalogue) => Promise<string | null>;
export type IDResolver = (unresolved_id: string) => Promise<string | null> | string | null;