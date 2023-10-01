import { it, describe } from "vitest";
import { generateType } from "../../../src/compiler/generateTypes";
import { expectTypeDefinitionsToEqual } from "./utils";

describe("selectordinal", () => {
  it("generates types for select oridinal", () => {
    const type = generateType(
      "{count, selectordinal, one {#st} two {#nd} few {#rd} other {#th}}",
    );
    expectTypeDefinitionsToEqual(type, "{ count: number }");
  });
});
