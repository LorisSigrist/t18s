import { describe, it, expect } from "vitest";
import { FileHandler } from "../../../src/file-handling/fileHandler.js";

describe("FileHandler", () => {
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
