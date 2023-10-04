import { precompile } from "../../precompile.js";
import { describe, it, expect } from "vitest";
import { formatJS, parseMessage } from "./utils.js";

describe("compile selectordinal", () => {
  it("compiles a selectordinal", () => {
    let message =
      "{count, selectordinal, one {#st} two {#nd} few {#rd} other {#th}}";
    let compiled = precompile(parseMessage(message), "en");

    for (let i = 1; i < 10; i++) {
      let result = eval(`(${compiled})({ count: ${i} })`);
      let correct = formatJS(message, { count: i });

      expect(result).toMatch(correct);
    }
  });
});
