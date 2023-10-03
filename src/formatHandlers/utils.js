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
   * @param {unknown} obj
   * @param {string[]} path
   */
  function flatten(obj, path = []) {
    if (typeof obj === "string") {
      keyVal.set(path.join("."), obj);
      return;
    }

    for (const [key, value] of Object.entries(obj)) {
      flatten(value, [...path, key]);
    }
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
