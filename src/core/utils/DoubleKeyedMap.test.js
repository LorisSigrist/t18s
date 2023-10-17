import { describe, it, expect } from "vitest";
import { DoubleKeyedMap } from "./DoubleKeyedMap";

describe("DoubleKeyedMap", () => {
    it("should set and get values", () => {
        const map = new DoubleKeyedMap();
        map.set("foo", "bar", "baz");
        map.set("foo", "bar2", "baz2");
        map.set("foo2", "bar", "baz3");
        map.set("foo2", "bar2", "baz4");


        expect(map.get("foo", "bar")).toBe("baz");
        expect(map.get("foo", "bar2")).toBe("baz2");
        expect(map.get("foo2", "bar")).toBe("baz3");
        expect(map.get("foo2", "bar2")).toBe("baz4");
    });

    it("should return undefined for non-existing keys", () => {
        const map = new DoubleKeyedMap();
        expect(map.get("foo", "bar")).toBe(undefined);
    });

    it("should return false when checking for non-existing keys", () => {
        const map = new DoubleKeyedMap();
        expect(map.has("foo", "bar")).toBe(false);
    });


    it("should return true when checking for existing keys", () => {
        const map = new DoubleKeyedMap();
        map.set("foo", "bar", "baz");
        expect(map.has("foo", "bar")).toBe(true);
    });


    it("should delete keys", () => {
        const map = new DoubleKeyedMap();
        map.set("foo", "bar", "baz");
        map.delete("foo", "bar");
        expect(map.has("foo", "bar")).toBe(false);
    });
});