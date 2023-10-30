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
