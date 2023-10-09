import { precompile } from "../../precompile.js";
import { describe, it, expect } from "vitest";
import { formatJS, parseMessage, evaluateFnString } from "./utils.js";

describe("compile plural", () => {
  it("compiles a plural with only exact matches into a function", () => {
    let message = "{count, plural, =1 {one} =2 {two}}";
    let compiled = precompile(parseMessage(message), "en");

    const values = { count: 1 };
    let result = evaluateFnString(compiled, values);
    let correct = formatJS(message, values);
    expect(result).toMatch(correct);
  });

  it("compiles a plural with only exact matches and a pound sign into a function", () => {
    let message = "{count, plural, =1 {one} =2 {# things}}";
    let compiled = precompile(parseMessage(message), "en");
    const values = { count: 2 };
    let result = evaluateFnString(compiled, values);
    let correct = formatJS(message, values);
    expect(result).toMatch(correct);
  });

  it("compiles a plural with categories into a function", () => {
    let message =
      "{count, plural, one {one} few {few} many {many} other {other}}";
    let compiled = precompile(parseMessage(message), "en");

    for (let i = 1; i < 10; i++) {
      const values = { count: i };
      let result = evaluateFnString(compiled, values);
      let correct = formatJS(message, values);
      expect(result).toMatch(correct);
    }
  });
});
