import { it, describe } from "vitest";
import { generateType } from "../../generateTypes.js";
import { expectNonWhitespaceToEqual, parseMessage } from "./utils.js";

describe("primitive types", () => {
  it("generates an empty type for a message with no arguments", () => {
    const type = generateType(parseMessage("Hello, world!"));
    expectNonWhitespaceToEqual(type, "");
  });

  it("generates a type for a message with a number argument", () => {
    const type = generateType(
      parseMessage("You have {numPhotos, number} photos."),
    );
    expectNonWhitespaceToEqual(type, "{numPhotos:number}");
  });

  it("generates a type for a message with a date argument", () => {
    const type = generateType(
      parseMessage("The event is on {date, date, long}."),
    );
    expectNonWhitespaceToEqual(type, "{date:Date}");
  });

  it("generates types for a message with a time argument", () => {
    const type = generateType(
      parseMessage("The event is at {time, time, short}."),
    );
    expectNonWhitespaceToEqual(type, "{time:Date}");
  });

  it("generates types for a message with an untyped argument", () => {
    const type = generateType(parseMessage("Welcome, {name}!"));
    expectNonWhitespaceToEqual(type, "{ name: string }");
  });

  it("generates types for a number with a skeleton", () => {
    const type = generateType(
      parseMessage("{progress, number, ::percent scale/100 .##} completed"),
    );
    expectNonWhitespaceToEqual(type, "{progress:number}");
  });

  it("generates types for a message with multiple arguments", () => {
    const type = generateType(
      parseMessage(
        "You have {numPhotos, number} in your {numAlbums, number} albums {name}",
      ),
    );
    expectNonWhitespaceToEqual(
      type,
      "{numPhotos:number, numAlbums:number, name: string}",
    );
  });
});
