import { precompile } from "../../../src/compiler/precompile.js";
import { describe, it, expect } from "vitest";
import { formatJS, parseMessage } from "./utils.js";

describe("compile", () => {
  it("compiles a message with no arguments", () => {
    const message = "Hello world";
    const compiled = precompile(parseMessage(message), "en");
    const result = eval(`(${compiled})()`);

    const correct = formatJS(message);
    expect(result).toMatch(correct);
  });

  it("compiles a message with a string argument into a function", () => {
    const message = "Hello {name}";
    const compiled = precompile(parseMessage(message), "en");
    const values = { name: "world" };
    const result = eval(`(${compiled})({ name: "world" })`);

    const correct = formatJS(message, values);
    expect(result).toMatch(correct);
  });

  it("compiles a message with a tag argument into a function", () => {
    const message = "Hello <tag>{name}!</tag>";
    const compiled = precompile(parseMessage(message), "en");
    const values = {
      tag: (value) => `<bold>${value}</bold>`,
      name: "world",
    };
    const result = eval(`(${compiled})({ tag: "bold", name: "world" })`);

    const correct = formatJS(message, values);
    expect(result).toMatch(correct);
  });

  it("compiles a message containing a backtick", () => {
    const message = "Hello `world` {name}";
    const compiled = precompile(parseMessage(message), "en");
    const result = eval(`(${compiled})({name: "nick"})`);

    const correct = formatJS(message, { name: "nick" });
    expect(result).toMatch(correct);
  });
});
