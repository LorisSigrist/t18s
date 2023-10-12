import { describe, expect, it } from "vitest";
import { JsonHandler } from "./json";
import { LoadingException } from "../exception";

describe("JsonHandler", () => {
  it("parses a flat JSON file", () => {
    const json = '{ "key1": "value1", "key2": "value2" }';
    const result = JsonHandler.load("test.json", json);

    const expected = new Map().set("key1", "value1").set("key2", "value2");

    expect(result).toEqual(expected);
  });

  it("parses an empty file as an empty dictionary", () => {
    const result = JsonHandler.load("test.json", "");
    expect(result).toEqual(new Map());
  });

  it("parses a nested JSON file", () => {
    const json =
      '{ "common" : { "save": "Save", "cancel": "Cancel" }, "home": { "title": "Home" } }';

    const result = JsonHandler.load("test.json", json);
    const expected = new Map()
      .set("common.save", "Save")
      .set("common.cancel", "Cancel")
      .set("home.title", "Home");

    expect(result).toEqual(expected);
  });

  it("throws LoadingException if the JSON is invalid", () => {
    const invalidJson = '{ "key1": "value1", "key2": "value2" ';
    const parseInvalid = () => {
      JsonHandler.load("test.json", invalidJson);
    };

    expect(parseInvalid).toThrow(LoadingException);
  });

  it("sets a key on the top level", () => {
    const oldObject = { key1: "value1", key2: "value2" };
    const oldJSON = JSON.stringify(oldObject);

    const newJSON = JsonHandler.setPath(oldJSON, "key3", "value3");
    const newObject = JSON.parse(newJSON);

    expect(newObject).toEqual({ ...oldObject, key3: "value3" });
  });

  it("sets a key if the original file is empty", () => {
    const oldJSON = "";

    const newJSON = JsonHandler.setPath(oldJSON, "newKey", "newValue");
    const newObject = JSON.parse(newJSON);

    expect(newObject).toEqual({ newKey: "newValue" });
  });

  it("sets a key on a deeply nested level", () => {
    const oldObject = {
      common: { save: "Save", cancel: "Cancel" },
      home: { title: "Home" },
    };

    const oldJSON = JSON.stringify(oldObject);

    const newJSON = JsonHandler.setPath(
      oldJSON,
      "home.subtitle.description",
      "Subtitle"
    );
    const newObject = JSON.parse(newJSON);

    expect(newObject).toEqual({
      common: { save: "Save", cancel: "Cancel" },
      home: { title: "Home", subtitle: { description: "Subtitle" } },
    });
  });
});
