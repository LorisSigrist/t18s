import { describe, it, expect } from "vitest";
import { parseDictionaryModuleId } from "./dictionary.js";


describe("parseDictionaryModuleId", () => {
    it("should parse a dictionary module id with a domain & path", () => {
        const id = "\0t18s-internal:dictionary:domain:foo/bar";
        const { domain, path } = parseDictionaryModuleId(id);
        expect(domain).toBe("domain");
        expect(path).toEqual(["foo", "bar"]);
    });

    it("should parse a dictionary module id with an unnamed domain & path", () => {
        const id = "\0t18s-internal:dictionary::foo/bar";
        const { domain, path } = parseDictionaryModuleId(id);
        expect(domain).toBe("");
        expect(path).toEqual(["foo", "bar"]);
    });

    it("should parse a dictionary module id with an unnamed domain & root path", () => {
        const id = "\0t18s-internal:dictionary::";
        const { domain, path } = parseDictionaryModuleId(id);
        expect(domain).toBe("");
        expect(path).toEqual([]);
    });

    it("should parse a dictionary module id with a domain & root path", () => {
        const id = "\0t18s-internal:dictionary:domain:";
        const { domain, path } = parseDictionaryModuleId(id);
        expect(domain).toBe("domain");
        expect(path).toEqual([]);
    });
});