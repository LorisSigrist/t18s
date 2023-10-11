import { describe, expect, it, vitest } from "vitest";
import { ResultMatcher } from "./resultMatcher";

describe("ResultMatcher", () => {
  it("runs the success handler if the function succeeds and returns it's return type", () => {
    const mockFunc = () => "success";
    const mockSuccessHandler = vitest.fn(() => "return value");

    const result = new ResultMatcher(mockFunc)
      .success(mockSuccessHandler)
      .rescue(Error, () => "error")
      .rescueAll(() => "rescue all")
      .call();

    expect(mockSuccessHandler).toHaveBeenCalledWith("success");
    expect(result).toBe("return value");
  });

  it("runs the rescue handler if the function throws the specified error", () => {
    const mockFunc = () => {
      throw new SyntaxError("error");
    };

    const mockRescueHandler = vitest.fn(() => "return value");

    const result = new ResultMatcher(mockFunc)
      .success(() => "success")
      .rescue(RangeError, () => "range error")
      .rescue(SyntaxError, mockRescueHandler) // <-- this one
      .rescue(TypeError, () => "type error")
      .rescueAll(() => "rescue all")
      .call();

    expect(mockRescueHandler).toHaveBeenCalledWith(new SyntaxError("error"));
    expect(result).toBe("return value");
  });

  it("runs the rescueAll handler if the function throws an error that is not specified", () => {
    const mockFunc = () => {
      throw new SyntaxError("error");
    };

    const mockRescueAllHandler = vitest.fn(() => "return value");

    const result = new ResultMatcher(mockFunc)
      .success(() => "success")
      .rescue(RangeError, () => "range error")
      .rescue(TypeError, () => "type error")
      .rescueAll(mockRescueAllHandler) // <-- this one
      .call();

    expect(mockRescueAllHandler).toHaveBeenCalledWith(new SyntaxError("error"));
    expect(result).toBe("return value");
  });

  it("rethrows unhandled errors", () => {
    const mockFunc = () => {
      throw new SyntaxError("error");
    };

    const runUnhandled = () =>
      new ResultMatcher(mockFunc)
        .success(() => "success")
        .rescue(RangeError, () => "range error")
        .rescue(TypeError, () => "type error")
        .call();

    expect(runUnhandled).toThrow(new SyntaxError("error"));
  });
});
