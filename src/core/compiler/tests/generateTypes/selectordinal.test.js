import { it, describe } from "vitest";
import { generateType } from "../../generateTypes.js";
import { expectTypeDefinitionsToEqual, parseMessage } from "./utils.js";

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
