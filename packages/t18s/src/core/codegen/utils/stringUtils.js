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

/**
 * Allows indenting template strings without the extra indentation ending up in the result.
 * Still allows indentation of lines relative to one another in the template string.
 * 
 * Copied from SvelteKit
 * 
 * @param {TemplateStringsArray} strings
 * @param {any[]} values
 */
export function dedent(strings, ...values) {
  const firstString = strings[0];
  if (firstString === undefined) throw new Error("Dedent strings is undefined");

  const indentation = /** @type {RegExpExecArray} */ (
    /\n?([ \t]*)/.exec(firstString)
  )[1];
  const pattern = new RegExp(`^${indentation}`, "gm");

  /**
   * @type {{strings: string[], indents: string[]}}
   */
  let dedented = {
    strings: strings.map((str) => str.replace(pattern, "")),
    indents: [],
  };

  let current = "\n";

  for (let i = 0; i < values.length; i += 1) {
    const string = dedented.strings[i];
    if (string === undefined) {
      throw new Error("Dedent string is undefined");
    }
    const match = /\n([ \t]*)$/.exec(string);

    if (match) current = match[0];
    dedented.indents[i] = current;
  }

  let str = dedented.strings[0];
  if (str === undefined) {
    throw new Error("Dedent strings is undefined");
  }

  for (let i = 0; i < values.length; i += 1) {
    const indent = dedented.indents[i];
    if (indent === undefined) {
      throw new Error("Dedent indent is undefined");
    }
    str += String(values[i]).replace(/\n/g, indent) + dedented.strings[i + 1];
  }

  str = str.trim();

  return str;
}
