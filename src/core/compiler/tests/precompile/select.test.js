import { precompile } from "../../precompile.js";
import { describe, it, expect } from "vitest";
import { formatJS, parseMessage } from "./utils.js";

describe("compile select", () => {
  it("compiles a message with a select argument into a function", () => {
    const message =
      "{gender, select, male {Herr} female {Frau} other {Person}}";
    const compiled = precompile(parseMessage(message), "en");

    const result = eval(`(${compiled})({ gender: "male" })`);
    const correct = formatJS(message, { gender: "male" });
    expect(result).toMatch(correct);
  });

  it("compiles a message with a select argument without an other clause into a function", () => {
    const message = "{season, select, summer {Summer} winter {Winter}}";
    const compiled = precompile(parseMessage(message), "en");

    const result = eval(`(${compiled})({ season: "summer" })`);
    const correct = formatJS(message, { season: "summer" });
    expect(result).toMatch(correct);
  });

  it("compliles a message with a select argument and an argument in one of the branches", () => {
    const message = "{season, select, summer {Summer {year}} winter {Winter}}";
    const compiled = precompile(parseMessage(message), "en");

    const result = eval(`(${compiled})({ season: "summer", year: 2021 })`);
    const correct = formatJS(message, { season: "summer", year: 2021 });

    expect(result).toMatch(correct);
  });

  it("compiles a message with nested select arguments", () => {
    const message =
      "Waddup {a, select, option1 {Hello} option2 { {b, select, a {   hello} b {bonjour} } } }";

    const compiled = precompile(parseMessage(message), "en");

    const result = eval(`(${compiled})({ a: "option2", b: "a" })`);
    const correct = formatJS(message, { a: "option2", b: "a" });

    expect(result).toMatch(correct);
  });

  it("compiles a message with a select and a pound sign", () => {
    const message = "{season, select, summer {# Summer} winter {Winter}}";
    const compiled = precompile(parseMessage(message), "en");

    const result = eval(`(${compiled})({ season: "summer"})`);
    const correct = formatJS(message, { season: "summer" });
    expect(result).toMatch(correct);
  });
});
