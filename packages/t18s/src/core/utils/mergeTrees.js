/**
 * @template {string} A
 * @template {string} B
 *
 * @param {import("../file-handling/types.js").Tree<A>} tree1
 * @param {import("../file-handling/types.js").Tree<B>} tree2
 *
 * @return {import("../file-handling/types.js").Tree<Set<A|B>>}
 */
export function mergeTrees(tree1, tree2) {
    /** @type {import("../file-handling/types.js").Tree<Set<A|B>>} */
    const mergedTree = {};

    /**
     * @param {string[]} path 
     * @param {import("../file-handling/types.js").Tree<A | B>} tree 
     */
    function walk(path, tree) {
        for (const key in tree) {
            const value = tree[key];
            if (value === undefined) throw new Error("Value is undefined");
            const newPath = [...path, key];

            if (typeof value === "string") {
                const set = mergedTree[key] = new Set();
                set.add(value);
            } else {
                walk(newPath, value);
            }
        }
    }

    walk([], tree1);
    walk([], tree2);

    return mergedTree;
}
