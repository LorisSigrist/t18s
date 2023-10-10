/**
 * Adds quotes around a string
 * @param {string} str A string
 * @returns The same string, but with "quotes" around it
 */
export const addQuotes = (str) => `"${str}"`;

/**
 * Adds parentheses to a string ()
 * @param {string} str
 * @returns
 */
export const addParentheses = (str) => `(${str})`;

/**
 * Returns a type union of the given strings
 * @param {string[]} strings ["a","b","c"]
 * @returns "a" | "b" | "c"
 */
export const stringTypeUnion = (strings) => strings.map(addQuotes).join("|");

/**
 * Indents some text by one level.
 * @param {string} text
 */
export function indent(text) {
  const INDENT_SPACES = 4;
  const lines = text.split("\n");
  return lines.map((l) => " ".repeat(INDENT_SPACES) + l).join("\n");
}
