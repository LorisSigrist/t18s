/**
 * Flattens a tree of objects into a one-level map with dot-separated keys.
 * All values are stringified.
 *
 * @param {unknown} tree
 * @returns {Map<string, string>}
 */
export function flattenTree(tree) {
  if (typeof tree !== "object") return new Map();

  /** @type {Map<string, string>} */
  const flattened = new Map();
  flatten(tree);
  return flattened;

  /**
   * @param {unknown} thing
   * @param {string[]} path
   */
  function flatten(thing, path = []) {
    if (thing === null) {
      flattened.set(path.join("."), "");
      return;
    }

    if (typeof thing === "string" || typeof thing === "number") {
      flattened.set(path.join("."), String(thing));
      return;
    }

    if (typeof thing === "object") {
      for (const [key, value] of Object.entries(thing)) {
        flatten(value, [...path, key]);
      }
      return;
    }

    throw new Error("Invalid tree");
  }
}
