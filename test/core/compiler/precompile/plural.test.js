import { precompile } from "../../../../src/core/compiler/precompile.js";
import { describe, it, expect } from "vitest";
import { formatJS, parseMessage } from "./utils.js";

describe("compile plural", () => {
  it("compiles a plural with only exact matches into a function", () => {
    let message = "{count, plural, =1 {one} =2 {two}}";
    let compiled = precompile(parseMessage(message), "en");
    let result = eval(`(${compiled})({ count: 1 })`);
    let correct = formatJS(message, { count: 1 });
    expect(result).toMatch(correct);
  });

  it("compiles a plural with only exact matches and a pound sign into a function", () => {
    let message = "{count, plural, =1 {one} =2 {# things}}";
    let compiled = precompile(parseMessage(message), "en");
    let result = eval(`(${compiled})({ count: 2 })`);
    let correct = formatJS(message, { count: 2 });
    expect(result).toMatch(correct);
  });

  it("compiles a plural with categories into a function", () => {
    let message =
      "{count, plural, one {one} few {few} many {many} other {other}}";
    let compiled = precompile(parseMessage(message), "en");

    for (let i = 1; i < 10; i++) {
      let result = eval(`(${compiled})({ count: ${i} })`);
      let correct = formatJS(message, { count: i });
      expect(result).toMatch(correct);
    }
  });
});
