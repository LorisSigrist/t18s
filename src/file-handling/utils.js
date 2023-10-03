import { parse } from "@formatjs/icu-messageformat-parser";
import { generateType } from "../compiler/generateTypes.js";
import { precompile } from "../compiler/precompile.js";

/**
 * @param {unknown} tree
 * @param {string} locale
 * @returns {import("../types.js").Dictionary}
 */
export function generateDictionaryFromTree(tree, locale) {
  if (typeof tree !== "object") return new Map();

  /** @type {Map<string, string>} */
  const keyVal = new Map();

  /**
   * @param {unknown} thing
   * @param {string[]} path
   */
  function flatten(thing, path = []) {
    if (thing === null) {
      keyVal.set(path.join("."), "");
      return;
    }

    if (typeof thing === "string" || typeof thing === "number") {
      keyVal.set(path.join("."), String(thing));
      return;
    }

    if (typeof thing === "object") {
      for (const [key, value] of Object.entries(thing)) {
        flatten(value, [...path, key]);
      }
      return;
    }

    throw new Error("Invalid tree");
  }

  flatten(tree);

  /** @type {import("../types.js").Dictionary} */
  const dictionary = new Map();

  for (const [translationKey, messageSource] of keyVal.entries()) {
    const parsed = parse(messageSource, {
      shouldParseSkeletons: true,
      requiresOtherClause: false,
    });

    dictionary.set(translationKey, {
      source: messageSource,
      description: null,
      precompiled: precompile(parsed, locale),
      typeDefinition: generateType(parsed),
    });
  }

  return dictionary;
}
