import { it, describe } from "vitest";
import { generateType } from "../../../../src/core/compiler/generateTypes";
import { expectNonWhitespaceToEqual, parseMessage } from "./utils";

describe("select types", () => {
  it("generates a type for a select message with no other branch", () => {
    let type = generateType(
      parseMessage(
        "{season, select, spring {Frühling} summer {Sommer} fall {Herbst} winter {Winter}}",
      ),
    );
    let expected =
      '{season: "spring"} | {season: "summer"} | {season: "fall"} | {season: "winter"}';

    expectNonWhitespaceToEqual(type, expected);
  });

  it("adds the correct parentheses for a select message with another argument", () => {
    const msg = parseMessage(
      "Guten tag, {gender, select, male {Herr} female {Frau}} {name}!",
    );
    const type = generateType(msg);
    const expected =
      '({gender : "male" } | {gender: "female"}) & ({name: string})';
    expectNonWhitespaceToEqual(type, expected);
  });

  it("generates types for nested select messages with no other branch", () => {
    let type = generateType(
      parseMessage(
        "{option1, select, a {A} b {B {option2, select, c {C} d {D}}}}",
      ),
    );

    let expected =
      '{option1: "a"} | ({option1: "b"} & ({option2: "c"} | {option2: "d"}))';
    expectNonWhitespaceToEqual(type, expected);
  });

  it("generates types for a select message with an other clause", () => {
    const type = generateType(
      parseMessage(
        "{powerLevel, select, 9000 {It's 9000!} other {It's other than 9000.}}",
      ),
    );
    const expected = '{powerLevel: "9000" | (string & {})}';
    expectNonWhitespaceToEqual(type, expected);
  });

  it("generates types for a select message with an other branch and an argument in all branches", () => {
    const type = generateType(
      parseMessage(
        "{powerLevel, select, 9000 {It's 9000! {someArg}} other {Its {someArg}!}}",
      ),
    );
    const expected =
      '{powerLevel: "9000" | (string & {})} & (({someArg: string}) | ({someArg: string}))';
    expectNonWhitespaceToEqual(type, expected);
  });

  it("generates types for a select message with an other branch and an argument in some branches", () => {
    const type = generateType(
      parseMessage(
        "{powerLevel, select, 9000 {It's 9000!} other {Its {someArg}!}}",
      ),
    );
    const expected =
      '{powerLevel: "9000" | (string & {})} & (({someArg: string}) | ({}))';
    expectNonWhitespaceToEqual(type, expected);
  });
});
