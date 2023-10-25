import { precompile } from "../../precompile.js";
import { describe, it, expect } from "vitest";
import { formatJS, parseMessage, evaluateFnString } from "./utils.js";

describe("compile tag", () => {
  it("compiles a message with a tag argument without nesting", () => {
    const message = "Hello <tag>world!</tag>";
    const compiled = precompile(parseMessage(message), "en");
    const values = {
      tag: (value) => `<bold>${value}</bold>`,
    };

    const result = eval(
      `(${compiled})({tag: (value) => \`<bold>\${value}</bold>\` })`
    );
    console.log(compiled, result);
    const correct = formatJS(message, values);
    expect(result).toMatch(correct);
  });
  it("compiles a message with a tag argument with nesting", () => {
    const message = "Hello <tag>{name}!</tag>";
    const compiled = precompile(parseMessage(message), "en");
    const values = {
      tag: (value) => `<bold>${value}</bold>`,
      name: "world",
    };

    const result = eval(
      `(${compiled})({tag: (value) => \`<bold>\${value}</bold>\`, name: "world" })`
    );
    console.log(compiled, result);
    const correct = formatJS(message, values);
    expect(result).toMatch(correct);
  });
});
