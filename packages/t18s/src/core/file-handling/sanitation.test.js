import { describe, it, expect } from "vitest";
import { isValidMessageKey } from "./sanitation.js";

describe("isValidMessageKey", () => {
  it("should pass an all-lowercase key", () => {
    expect(isValidMessageKey("key")).toBe(true);
  });

  it("should pass an all-uppercase key", () => {
    expect(isValidMessageKey("KEY")).toBe(true);
  });

  it("should pass a mixed-case key", () => {
    expect(isValidMessageKey("gettingStarted")).toBe(true);
  });

  it("should pass a snake_case key", () => {
    expect(isValidMessageKey("key_name")).toBe(true);
  });

  it("should not pass a kebab-case key", () => {
    expect(isValidMessageKey("key-name")).toBe(false);
  });

  it("should not pass a key with spaces", () => {
    expect(isValidMessageKey("key name")).toBe(false);
  });

  it("should pass a key with a $", () => {
    expect(isValidMessageKey("$key")).toBe(true);
  });

  it("should not pass a key thats a reserved word", () => {
    expect(isValidMessageKey("if")).toBe(false);
  });
});
