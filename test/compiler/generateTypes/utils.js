import { expect } from "vitest";

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
