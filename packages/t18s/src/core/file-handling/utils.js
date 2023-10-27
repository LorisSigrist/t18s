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
      flattened.set(path.join("_"), "");
      return;
    }

    if (typeof thing === "string" || typeof thing === "number") {
      flattened.set(path.join("_"), String(thing));
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

/**
 * Modifies a tree so that the given path has the given value.
 * Will create intermediate levels as needed.
 *
 * @param {any} tree
 * @param {string[]} path
 * @param {string} value
 * @returns
 */
export function setPathOnTree(tree, path, value) {
  //Split the path into the current level and the rest of the path
  const [current, ...rest] = path;
  if (!current) throw new Error("There must be at least one level in the path");

  if (rest.length === 0) {
    tree[current] = value;
    return;
  }

  if (!tree[current]) tree[current] = {};
  setPathOnTree(tree[current], rest, value);
}
