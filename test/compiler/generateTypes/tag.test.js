import { it, describe } from "vitest";
import { generateType } from "../../../src/compiler/generateTypes";
import { expectTypeDefinitionsToEqual } from "./utils";

describe("tag types", () => {
  it("generates a type for a tag with a string literal in it", () => {
    const type = generateType("<tag>Some text</tag>");
    expectTypeDefinitionsToEqual(type, "{ tag: string }");
  });

  it("generates a type for a tag with an argument in it", () => {
    const type = generateType("<tag>{someArg}</tag>");
    expectTypeDefinitionsToEqual(
      type,
      "(({ someArg: string })) & ({ tag: string })",
    );
  });
});
