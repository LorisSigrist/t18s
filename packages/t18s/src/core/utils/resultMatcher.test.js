import { describe, expect, it, vitest } from "vitest";
import { ResultMatcher } from "./resultMatcher";

describe("ResultMatcher", () => {
  it("runs the success handler if the function succeeds and returns it's return type", () => {
    const mockFunc = () => "success";
    const mockSuccessHandler = vitest.fn(() => "return value");

    const result = new ResultMatcher(mockFunc)
      .ok(mockSuccessHandler)
      .catch(Error, () => "error")
      .catchAll(() => "catch all")
      .run();

    expect(mockSuccessHandler).toHaveBeenCalledWith("success");
    expect(result).toBe("return value");
  });

  it("runs the catch handler if the function throws the specified error", () => {
    const mockFunc = () => {
      throw new SyntaxError("error");
    };

    const mockRescueHandler = vitest.fn(() => "return value");

    const result = new ResultMatcher(mockFunc)
      .ok(() => "success")
      .catch(RangeError, () => "range error")
      .catch(SyntaxError, mockRescueHandler) // <-- this one
      .catch(TypeError, () => "type error")
      .catchAll(() => "catch all")
      .run();

    expect(mockRescueHandler).toHaveBeenCalledWith(new SyntaxError("error"));
    expect(result).toBe("return value");
  });

  it("runs the catchAll handler if the function throws an error that is not specified", () => {
    const mockFunc = () => {
      throw new SyntaxError("error");
    };

    const mockRescueAllHandler = vitest.fn(() => "return value");

    const result = new ResultMatcher(mockFunc)
      .ok(() => "success")
      .catch(RangeError, () => "range error")
      .catch(TypeError, () => "type error")
      .catchAll(mockRescueAllHandler) // <-- this one
      .run();

    expect(mockRescueAllHandler).toHaveBeenCalledWith(new SyntaxError("error"));
    expect(result).toBe("return value");
  });

  it("rethrows unhandled errors", () => {
    const mockFunc = () => {
      throw new SyntaxError("error");
    };

    const runUnhandled = () =>
      new ResultMatcher(mockFunc)
        .ok(() => "success")
        .catch(RangeError, () => "range error")
        .catch(TypeError, () => "type error")
        .run();

    expect(runUnhandled).toThrow(new SyntaxError("error"));
  });

  it("Works with no success handler", () => {
    const mockFunc = () => "success";

    const result = new ResultMatcher(mockFunc)
      .catchAll(() => "catch all")
      .run();

    expect(result).toBe("success");
  });
});
