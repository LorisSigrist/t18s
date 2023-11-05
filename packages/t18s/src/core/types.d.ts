import { Message } from "./Message.js";
import { Tree } from "./utils/Tree.js";

export interface ResolvedPluginConfig {
  dtsPath: string;
  translationsDir: string;
  verbose: boolean;
  locales: string[];
  fallbackLocale: string | null;
}

export type Dictionary = Tree<Message>;
