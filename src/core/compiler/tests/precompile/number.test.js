import { expect, describe, it } from "vitest";
import { precompile } from "../../precompile.js";
import { formatJS, parseMessage, evaluateFnString } from "./utils.js";

describe("compile number format", () => {
  it("compiles a number with no special formatting", () => {
    let message = "{count, number}";
    let compiled = precompile(parseMessage(message), "en");

    const values = { count: Math.PI };
    const result = evaluateFnString(compiled, values);
    const correct = formatJS(message, values);
    expect(result).toMatch(correct);
  });

  it("compiles a number with percentage formatting", () => {
    let message = "{count, number, percent}";
    let compiled = precompile(parseMessage(message), "en");

    const values = { count: Math.PI };
    const result = evaluateFnString(compiled, values);
    const correct = formatJS(message, values);

    expect(result).toMatch(correct);
  });

  it("compiles a number with decimal formatting", () => {
    let message = "{name} {count, number, decimal}";
    let compiled = precompile(parseMessage(message), "en");

    const values = { name: "Loris", count: 100_000 };
    const result = evaluateFnString(compiled, values);
    const correct = formatJS(message, values);

    expect(result).toMatch(correct);
  });

  it("compiles a number with unit formatting", () => {
    let message = "{name} {count, number, ::unit/meter}";

    let compiled = precompile(parseMessage(message), "en");
    const values = { name: "Loris", count: Math.PI };
    const result = evaluateFnString(compiled, values);
    const correct = formatJS(message, values);

    expect(result).toMatch(correct);
  });

  it("compiles a number skeleton", () => {
    const message =
      "The price of this bagel is {num, number, ::sign-always compact-short currency/GBP}";
    let compiled = precompile(parseMessage(message), "en");

    const values = { num: 100_000 };
    const result = evaluateFnString(compiled, values);
    const correct = formatJS(message, values);


    expect(result).toMatch(correct);
  });
});
