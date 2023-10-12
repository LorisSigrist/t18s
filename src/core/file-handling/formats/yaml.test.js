import { describe, expect, it } from "vitest";
import { LoadingException } from "../exception";
import { YamlHandler } from "./yaml";

describe("YamlHandler", () => {
  it("parses an empty file as an empty dictionary", () => {
    const result = YamlHandler.load("test.yaml", "");
    expect(result).toEqual(new Map());
  });

  it("sets a path on an empty file", () => {
    const newYaml = YamlHandler.setPath("", "key1.key2", "value");
    expect(newYaml).toEqual("key1:\n  key2: value\n");
  });

  it("sets a path on an existing file", () => {
    const oldYaml = "key1:\n  key2: value\n";
    const newYaml = YamlHandler.setPath(oldYaml, "key1.key3", "value");
    expect(newYaml).toEqual("key1:\n  key2: value\n  key3: value\n");
  });
});
