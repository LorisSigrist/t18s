import { precompile } from "../../precompile.js";
import { describe, it, expect } from "vitest";
import { formatJS, parseMessage, evaluateFnString } from "./utils.js";

describe("compile selectordinal", () => {
  it("compiles a selectordinal", () => {
    let message =
      "{count, selectordinal, one {#st} two {#nd} few {#rd} other {#th}}";
    let compiled = precompile(parseMessage(message), "en");

    for (let i = 1; i < 10; i++) {
      const values = { count: i };
      const result = evaluateFnString(compiled, values);
      const correct = formatJS(message, values);

      expect(result).toMatch(correct);
    }
  });
});
