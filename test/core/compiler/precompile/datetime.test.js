import { precompile } from "../../../../src/core/compiler/precompile.js";
import { describe, it, expect } from "vitest";
import { formatJS, parseMessage } from "./utils.js";

describe("compile date & time", () => {
  it("compiles a message with a short time argument into a function", () => {
    const message = "Hello {time, time, short}";
    const compiled = precompile(parseMessage(message), "en");

    const values = { time: new Date(2021, 1, 1, 12, 0, 0) };
    const result = eval(
      `(${compiled})({ time: new Date(2021, 1, 1, 12, 0, 0) })`,
    );

    const correct = formatJS(message, values);
    expect(result).toMatch(correct);
  });

  it("compiles a message with a medium time argument into a function", () => {
    const message = "Hello {time, time, medium}";
    const compiled = precompile(parseMessage(message), "en");

    const values = { time: new Date(2021, 1, 1, 12, 0, 0) };
    const result = eval(
      `(${compiled})({ time: new Date(2021, 1, 1, 12, 0, 0) })`,
    );

    const correct = formatJS(message, values);
    expect(result).toMatch(correct);
  });

  it("compiles a message with a long time argument into a function", () => {
    const message = "Hello {time, time, long}";
    const compiled = precompile(parseMessage(message), "en");

    const values = { time: new Date(2021, 1, 1, 12, 0, 0) };
    const result = eval(
      `(${compiled})({ time: new Date(2021, 1, 1, 12, 0, 0) })`,
    );

    const correct = formatJS(message, values);
    expect(result).toMatch(correct);
  });

  it("compiles a message with a short date argument into a function", () => {
    const message = "Hello {date, date, short}";
    const compiled = precompile(parseMessage(message), "en");

    const values = { date: new Date(2021, 1, 1, 12, 0, 0) };
    const result = eval(
      `(${compiled})({ date: new Date(2021, 1, 1, 12, 0, 0) })`,
    );

    const correct = formatJS(message, values);
    expect(result).toMatch(correct);
  });

  it("compiles a message with a medium date argument into a function", () => {
    const message = "Hello {date, date, medium}";
    const compiled = precompile(parseMessage(message), "en");

    const values = { date: new Date(2021, 1, 1, 12, 0, 0) };
    const result = eval(
      `(${compiled})({ date: new Date(2021, 1, 1, 12, 0, 0) })`,
    );

    const correct = formatJS(message, values);
    expect(result).toMatch(correct);
  });

  it("compiles a message with a long date argument into a function", () => {
    const message = "Hello {date, date, long}";
    const compiled = precompile(parseMessage(message), "en");

    const values = { date: new Date(2021, 1, 1, 12, 0, 0) };
    const result = eval(
      `(${compiled})({ date: new Date(2021, 1, 1, 12, 0, 0) })`,
    );

    const correct = formatJS(message, values);
    expect(result).toMatch(correct);
  });
});
