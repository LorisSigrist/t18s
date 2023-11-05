/**
 * @template T
 * @template U
 * @param {import("../file-handling/types.js").Tree<T>} tree
 * @param {(leaf: T) => U} fn
 *
 * @returns {import("../file-handling/types.js").Tree<U>}
 */
export function mapTree(tree, fn) {
  /** @type {import("../file-handling/types.js").Tree<U>}  */
  const newTree = {};

  /**
   * @param {import("../file-handling/types.js").Tree<T>} tree
   */
  function walk(tree) {
    for (const key in tree) {
      const value = tree[key];
      if (!value) continue;
      if (typeof value === "object") {
        //branch
        newTree[key] = mapTree(value, fn);
      } else {
        //leaf
        newTree[key] = fn(value);
      }
    }
  }

  walk(tree);
  return newTree;
}
