import { describe, it, expect } from "vitest";
import { FileHandler } from "../../../src/file-handling/fileHandler.js";
import { LoadingException } from "../../../src/file-handling/exception.js";

describe("FileHandler", () => {

    describe("handle", () => {
        it("throws LoadingException if no handler is found", async () => {
            const handler = new FileHandler([]);
            expect(async () => await handler.handle("foo.bar", "en")).toThrow(LoadingException);
        });

        it("throws LoadingException if the file cannot be read", async () => {
            const handler = new FileHandler([
                {
                    fileExtensions: ["json"],
                    load: async () => new Map(),
                },
            ]);
            expect(async () => await handler.handle("nonexistent.json", "en")).toThrow(LoadingException);
        });
    });

  describe("getSupportedFileExtensions", () => {
    it("correctly reports which file extensions it supports, if none are", () => {
      const handler = new FileHandler([]);
      expect(handler.getSupportedFileExtensions()).toEqual(new Set());
    });

    it("correctly reports which file extensions it supports, if one handler is registered", () => {
      const handler = new FileHandler([
        {
          fileExtensions: ["json"],
          load: async () => new Map(),
        },
      ]);
      expect(handler.getSupportedFileExtensions()).toEqual(new Set(["json"]));
    });

    it("correctly reports which file extensions it supports, if multiple handlers are registered", () => {
      const handler = new FileHandler([
        {
          fileExtensions: ["json"],
          load: async () => new Map(),
        },
        {
          fileExtensions: ["yaml", "yml"],
          load: async () => new Map(),
        },
      ]);
      expect(handler.getSupportedFileExtensions()).toEqual(
        new Set(["json", "yaml", "yml"])
      );
    });
  });
});
