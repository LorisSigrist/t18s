import { it, describe } from "vitest";
import { generateType } from "../../generateTypes.js";
import { expectTypeDefinitionsToEqual, parseMessage } from "./utils.js";

describe("tag types", () => {
  it("generates a type for a tag with a string literal in it", () => {
    const type = generateType(parseMessage("<tag>Some text</tag>"));
    expectTypeDefinitionsToEqual(type, "{ tag: string }");
  });

  it("generates a type for a tag with an argument in it", () => {
    const type = generateType(parseMessage("<tag>{someArg}</tag>"));
    expectTypeDefinitionsToEqual(
      type,
      "(({ someArg: string })) & ({ tag: string })",
    );
  });
});
