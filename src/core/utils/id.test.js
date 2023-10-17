import { describe, it, expect } from "vitest";
import { cleanUrl } from "./id";

describe("cleanUrl", () => {
    it("removes query parameters", () => {
        expect(cleanUrl("http://example.com/?foo=bar")).toBe("http://example.com/");
    });

    it("removes hash values", () => {
        expect(cleanUrl("http://example.com/#foo")).toBe("http://example.com/");
    });

    it("removes both query parameters and hash values", () => {
        expect(cleanUrl("http://example.com/?foo=bar#baz")).toBe("http://example.com/");
    });
});