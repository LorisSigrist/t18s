import { it, describe } from "vitest";
import { generateType } from "../../../src/compiler/generateTypes";
import { expectTypeDefinitionsToEqual, parseMessage } from "./utils";

describe("plural types", () => {
  it("generates a type for a plural message with an other clause", () => {
    const type = generateType(
      parseMessage(
        "{numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}",
      ),
    );
    expectTypeDefinitionsToEqual(type, "{ numPhotos:number }");
  });

  it("generates a type for a plural message with no other clause", () => {
    const type = generateType(
      parseMessage("{numPhotos, plural, =0 {no photos} =1 {one photo}}"),
    );
    expectTypeDefinitionsToEqual(type, "{ numPhotos:number }");
  });

  it("generates a type for a plural message with an argument in all branches", () => {
    const type = generateType(
      parseMessage("{numObjects, plural, =0 {no {object}} =1 {one {object}}}"),
    );
    expectTypeDefinitionsToEqual(
      type,
      "((({ object: string  }) | ({ object: string  }))) & ({ numObjects:number })",
    );
  });
});
