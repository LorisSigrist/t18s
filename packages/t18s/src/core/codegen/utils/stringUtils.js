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
 * @param {Iterable<string>} strings The strings to union (e.g. ["a", "b", "c"])
 * @returns "a" | "b" | "c"
 */
export const stringTypeUnion = (strings) => {
  let union = "";
  for (const str of strings) {
    union += `"${str}"|`;
  }
  return union.slice(0, -1);
};

/**
 * Indents some text by n spaces.
 * @param {string} text
 * @param {number | undefined} spaces
 */
export function indent(text, spaces = 4) {
  const lines = text.split("\n");
  return lines.map((l) => " ".repeat(spaces) + l).join("\n");
}