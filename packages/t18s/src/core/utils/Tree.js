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
   * @return {Leaf | undefined}
   */
  getPath(path) {
    const [key, ...rest] = path;
    if (!key) return undefined;
    const child = this.#children.get(key);
    return child instanceof Tree ? child.getPath(rest) : child;
  }

  /**
   * @param {string[]} path
   * @param {Leaf} value
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
        if (!value) throw new Error("Unexpected undefined value. Get path returned undefined when path exists");
  
        let merged = mergedTree.getPath(path);
        if (!merged) merged = new Set();
        merged.add(value);
  
        mergedTree.setPath(path, merged);
      }
    }

    for (const tree of trees) {
      walkTree(tree);
    }

    return mergedTree;
  }
}
