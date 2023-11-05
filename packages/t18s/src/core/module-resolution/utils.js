import { cleanUrl } from "../utils/id.js";

/**
 * @param {import("./types.js").IDResolver[]} resolvers
 * @returns {import("vite").Plugin['resolveId']}
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
