/**
 * @template Leaf
 */
export class Tree {
  /**
   * @type {Map<string, Tree<Leaf> | Leaf>}
   */
  #children = new Map();

  /**
   * @param {string[]} path
   * @return {Leaf | Tree<Leaf> | undefined}
   */
  getPath(path) {
    const [key, ...rest] = path;
    if (!key) return this;

    const child = this.#children.get(key);
    if (rest.length === 0) return child;
    return child instanceof Tree ? child.getPath(rest) : child;
  }

  /**
   * @param {string[]} path
   * @param {Leaf | Tree<Leaf>} value
   */
  setPath(path, value) {
    const [key, ...rest] = path;
    if (!key) throw new Error("Empty path");

    if (rest.length === 0) {
      this.#children.set(key, value);
      return;
    } else {
      const child = this.#children.get(key);
      if (child instanceof Tree) {
        child.setPath(rest, value);
      } else {
        const tree = new Tree();
        tree.setPath(rest, value);
        this.#children.set(key, tree);
      }
    }
  }

  /**
   * Loops over all direct children of this tree.
   */
  *children() {
    yield* this.#children;
  }

  /**
   * @template U
   * @param {(leaf: Leaf) => U} fn
   *
   * @returns {Tree<U>}
   */
  map(fn) {
    /** @type {Tree<U>} */
    const newTree = new Tree();

    for (const [childKey, child] of this.#children) {
      if (child instanceof Tree) {
        newTree.#children.set(childKey, child.map(fn));
      } else {
        newTree.#children.set(childKey, fn(child));
      }
    }

    return newTree;
  }

  /**
   * @template {(leaf: Leaf, path: string[]) => boolean} Callback
   * @param {Callback} fn
   *
   * @returns {Callback extends ((leaf: Leaf, path: string[]) => leaf is infer U) ? Tree<U> : Tree<Leaf>}
   */
  filter(fn) {
    return this.#filter(fn, []);
  }

  /**
   * @template {(leaf: Leaf, path: string[]) => boolean} Callback
   * @param {Callback} fn
   * @param {string[]} pathSoFar
   *
   * @returns {Callback extends ((leaf: Leaf, path: string[]) => leaf is infer U) ? Tree<U> : Tree<Leaf>}
   */
  #filter(fn, pathSoFar) {
    /**
     * @type {Tree<Leaf>}
     */
    const newTree = new Tree();

    for (const [childKey, child] of this.#children) {
      const childPath = [...pathSoFar, childKey];

      if (child instanceof Tree) {
        const filteredChild = child.#filter(fn, childPath);
        if (filteredChild.#children.size > 0) {
          newTree.#children.set(childKey, filteredChild);
        }
      } else {
        if (fn(child, childPath)) {
          newTree.#children.set(childKey, child);
        }
      }
    }

    // @ts-ignore
    return newTree;
  }

  /**
   * @returns {IterableIterator<string[]>}
   */
  *paths() {
    for (const [key, value] of this.#children) {
      if (value instanceof Tree) {
        for (const path of value.paths()) {
          yield [key, ...path];
        }
      } else {
        yield [key];
      }
    }
  }

  /**
   * Returns a new tree with all values mapped by the given function.
   * @param {any} obj
   * @returns {Tree<any>}
   */
  static fromObject(obj) {
    const tree = new Tree();
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object") {
        tree.#children.set(key, Tree.fromObject(value));
      } else {
        tree.#children.set(key, value);
      }
    }
    return tree;
  }

  /**
   * Merges two trees
   *
   * @template Values
   * @param {Iterable<Tree<Values>>} trees
   *
   * @returns {Tree<Set<Values>>}
   */
  static mergeTrees(trees) {
    /** @type {Tree<Set<Values>>} */
    const mergedTree = new Tree();

    /** @param {Tree<Values>} tree */
    const walkTree = (tree) => {
      for (const path of tree.paths()) {
        const value = tree.getPath(path);
        if (!value)
          throw new Error(
            "Unexpected undefined value. Get path returned undefined when path exists",
          );
        if (value instanceof Tree) continue;

        let merged = mergedTree.getPath(path);
        if (!merged || merged instanceof Tree) merged = new Set();
        merged.add(value);

        mergedTree.setPath(path, merged);
      }
    };

    for (const tree of trees) {
      walkTree(tree);
    }

    return mergedTree;
  }

  /**
   * @template U
   * @param {Tree<U>} before
   * @param {Tree<U>} after
   * @param {(a: U, b: U) => boolean} equalityFn
   * @returns {Tree<U>}
   */
  static diffTrees(before, after, equalityFn) {
    throw new Error("Not implemented");
    /** @type {Tree<U>} */
    const diffTree = new Tree();

    return diffTree;
  }

  /**
   * @template {unknown} Thing
   * @param {Thing} thing
   * @return {thing is Thing extends Tree<infer Leaf> ? Tree<Leaf> : Tree<any>}
   */
  static isTree(thing) {
    return thing instanceof Tree;
  }
}