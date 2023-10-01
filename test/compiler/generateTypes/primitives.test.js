import { it, describe } from "vitest";
import { generateType } from "../../../src/compiler/generateTypes";
import { expectNonWhitespaceToEqual } from "./utils";

describe("primitive types", () => {
  it("generates an empty type for a message with no arguments", () => {
    const type = generateType("Hello, world!");
    expectNonWhitespaceToEqual(type, "{}");
  });

  it("generates a type for a message with a number argument", () => {
    const type = generateType("You have {numPhotos, number} photos.");
    expectNonWhitespaceToEqual(type, "{numPhotos:number}");
  });

  it("generates a type for a message with a date argument", () => {
    const type = generateType("The event is on {date, date, long}.");
    expectNonWhitespaceToEqual(type, "{date:Date}");
  });

  it("generates types for a message with a time argument", () => {
    const type = generateType("The event is at {time, time, short}.");
    expectNonWhitespaceToEqual(type, "{time:Date}");
  });

  it("generates types for a message with an untyped argument", () => {
    const type = generateType("Welcome, {name}!");
    expectNonWhitespaceToEqual(type, "{ name: string }");
  });

  it("generates types for a number with a skeleton", () => {
    const type = generateType(
      "{progress, number, ::percent scale/100 .##} completed",
    );
    expectNonWhitespaceToEqual(type, "{progress:number}");
  });

  it("generates types for a message with multiple arguments", () => {
    const type = generateType(
      "You have {numPhotos, number} in your {numAlbums, number} albums {name}",
    );
    expectNonWhitespaceToEqual(
      type,
      "{numPhotos:number, numAlbums:number, name: string}",
    );
  });
});
