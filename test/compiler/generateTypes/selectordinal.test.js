import { it, describe } from "vitest";
import { generateType } from "../../../src/compiler/generateTypes";
import { expectTypeDefinitionsToEqual, parseMessage } from "./utils";

describe("selectordinal", () => {
  it("generates types for select oridinal", () => {
    const type = generateType(
      parseMessage(
        "{count, selectordinal, one {#st} two {#nd} few {#rd} other {#th}}",
      ),
    );
    expectTypeDefinitionsToEqual(type, "{ count: number }");
  });
});
