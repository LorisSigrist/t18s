import { expect } from "vitest";
import { parse } from "@formatjs/icu-messageformat-parser";

/**
 * Tests that two type definitions are equal.
 * @param {string} actual
 * @param {string} expected
 */
export function expectTypeDefinitionsToEqual(actual, expected) {
  //Remove whitespace
  actual = actual.replace(/\s/g, "");
  expected = expected.replace(/\s/g, "");

  //Compare
  expect(actual).toEqual(expected);
}

/**
 * Tests that two strings are equal, ignoring whitespace.
 * @param {string} actual
 * @param {string} expected
 */
export function expectNonWhitespaceToEqual(actual, expected) {
  //Remove whitespace
  actual = actual.replace(/\s/g, "");
  expected = expected.replace(/\s/g, "");

  //Compare
  expect(actual).toEqual(expected);
}

/**
 * Parses a message into an AST, using our standard options.
 * @param {string} source
 * @returns {import("@formatjs/icu-messageformat-parser").MessageFormatElement[]}
 */
export function parseMessage(source) {
  return parse(source, {
    shouldParseSkeletons: true,
    requiresOtherClause: false,
  });
}
