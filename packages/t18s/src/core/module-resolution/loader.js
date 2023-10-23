import { generateLoaderModule } from "../codegen/loaders.js";

/**
 * @type {import("./types.js").ModuleLoader}
 */
export const loadLoaderModule = async (resolved_id, config, Catalogue) => {
  if (resolved_id !== "\0t18s-internal:loaders") return null;
  return generateLoaderModule(config, Catalogue);
};

/**
 * @type {import("./types.js").IDResolver}
 */
export const resolveLoaderModuleId = (unresolved_id) => {
  if (unresolved_id !== "t18s-internal:loaders") return null;
  return "\0t18s-internal:loaders";
};
