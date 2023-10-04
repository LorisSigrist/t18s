import { expect, describe, it } from "vitest";
import { precompile } from "../../precompile.js";
import { formatJS, parseMessage } from "./utils.js";

describe("compile number format", () => {
  it("compiles a number with no special formatting", () => {
    let message = "{count, number}";
    let compiled = precompile(parseMessage(message), "en");

    let result = eval(`(${compiled})({ count: Math.PI })`);
    let correct = formatJS(message, { count: Math.PI });
    expect(result).toMatch(correct);
  });

  it("compiles a number with percentage formatting", () => {
    let message = "{count, number, percent}";
    let compiled = precompile(parseMessage(message), "en");

    let result = eval(`(${compiled})({ count: Math.PI })`);
    let correct = formatJS(message, { count: Math.PI });

    expect(result).toMatch(correct);
  });

  it("compiles a number with decimal formatting", () => {
    let message = "{name} {count, number, decimal}";
    let compiled = precompile(parseMessage(message), "en");

    let result = eval(`(${compiled})({ name: "Loris", count: 100_000 })`);
    let correct = formatJS(message, { name: "Loris", count: 100_000 });

    expect(result).toMatch(correct);
  });

  it("compiles a number with unit formatting", () => {
    let message = "{name} {count, number, ::unit/meter}";
    let correct = formatJS(message, { name: "Loris", count: Math.PI });

    let compiled = precompile(parseMessage(message), "en");
    let result = eval(`(${compiled})({ name: "Loris", count: Math.PI })`);

    expect(result).toMatch(correct);
  });

  it("compiles a number skeleton", () => {
    const message =
      "The price of this bagel is {num, number, ::sign-always compact-short currency/GBP}";
    let compiled = precompile(parseMessage(message), "en");

    let result = eval(`(${compiled})({ name: "Loris", num: 100_000 })`);
    let correct = formatJS(message, { name: "Loris", num: 100_000 });

    expect(result).toMatch(correct);
  });
});
