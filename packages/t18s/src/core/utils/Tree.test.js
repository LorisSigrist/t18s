import { describe, it, expect } from "vitest";
import { Tree } from "./Tree.js";


describe("Tree", () => {
    it("sets and gets values", () => {
        const tree = new Tree();
        tree.setPath(["foo"], "bar");
        expect(tree.getPath(["foo"])).toBe("bar");
    });

    it("sets and gets nested values", () => {
        const tree = new Tree();
        tree.setPath(["foo", "bar"], "baz");
        expect(tree.getPath(["foo", "bar"])).toBe("baz");
    });


    it("gets nested trees", () => {
        const tree = new Tree();
        tree.setPath(["foo", "bar"], "baz");
        expect(tree.getPath(["foo"]) instanceof Tree).toBe(true);
    })

    it("can be created from an object", () => {
        const obj = {
            foo: {
                bar: "baz",
                other: "value",
            },
        };

        const tree = Tree.fromObject(obj);
        expect(tree.getPath(["foo", "bar"])).toBe("baz");
        expect(tree.getPath(["foo", "other"])).toBe("value");
    });


    it("can be mapped", () => {
        const tree = Tree.fromObject({
            foo: {
                bar: "baz",
            },
        });

        const mapped = tree.map(v => v.toUpperCase());
        expect(mapped.getPath(["foo", "bar"])).toBe("BAZ");
    });


    it("can loop over it's paths", () => {
        const tree = Tree.fromObject({
            one: {
                foo: "value",
                bar: "value",
                baz: "value",
            },
            two: {
                inner: {
                    inner: "value"
                }
            }
        });

        const paths = new Set(tree.paths());
        expect(paths).toEqual(new Set([
            ["one", "foo"],
            ["one", "bar"],
            ["one", "baz"],
            ["two", "inner", "inner"],
        ]));
    })

    it("can merge trees", () => {
        const tree1 = Tree.fromObject({
            foo: {
                bar: "baz",
            },
        });

        const tree2 = Tree.fromObject({
            foo: {
                baz: "bar",
                bar: "foo",
            },
        });


        const merged = Tree.mergeTrees([tree1, tree2]);
        expect(merged.getPath(["foo", "bar"])).toEqual(new Set(["baz", "foo"]));
        expect(merged.getPath(["foo", "baz"])).toEqual(new Set(["bar"]));
    })
})