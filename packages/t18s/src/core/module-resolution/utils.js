import { cleanUrl } from "../utils/id.js";

/**
 * @param {import("./types.js").IDResolver[]} resolvers
 * @returns {import("./types.js").IDResolver}
 */
export function resolveIdSequence(resolvers) {
  return async (unresolved_id) => {
    const id = cleanUrl(unresolved_id);

    for (const resolver of resolvers) {
      const resolved = resolver(id);
      if (resolved) return resolved;
    }

    return null;
  };
}

/**
 * @param {import("./types.js").ModuleLoader[]} loaders
 * @returns {import("./types.js").ModuleLoader}
 */
export function loadSequence(loaders) {
  return async (resolved_id, config, Catalogue) => {
    const id = cleanUrl(resolved_id);

    //Attempt to load the module from all loaders
    const loadingPromises = loaders.map((loader) =>
      loader(id, config, Catalogue)
    );
    const results = await Promise.allSettled(loadingPromises);

    //Pick the fulfilled result. There should only be one, otherwise we have a bug.
    for (const result of results) {
      if (result.status !== "fulfilled") continue;
      if (result.value) return result.value;
    }

    //If none of the loaders could load the module, return null.
    return null;
  };
}
