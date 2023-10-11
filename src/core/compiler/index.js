import { parse } from "@formatjs/icu-messageformat-parser";
import { precompile } from "./precompile.js";
import { generateType } from "./generateTypes.js";
import { safe } from "../utils/exception-helpers.js";

const safeParse = safe(parse);

/**
 * @param {Map<string, string>} keyVal
 * @param {string} locale
 *
 * @returns {{
 *  dictionary: import("../types.js").Dictionary,
 *  invalidKeys: Set<string> | undefined
 * }}
 */
export function compileToDictionary(keyVal, locale) {
  /** @type {import("../types.js").Dictionary} */
  const dictionary = new Map();

  /** @type {Set<string>} */
  const invalidKeys = new Set();

  for (const [translationKey, messageSource] of keyVal.entries()) {
    const { error, result: parsed } = safeParse(messageSource, {
      shouldParseSkeletons: true,
      requiresOtherClause: false,
    });

    if (error) {
      invalidKeys.add(translationKey);
      continue;
    }

    dictionary.set(translationKey, {
      source: messageSource,
      description: null,
      precompiled: precompile(parsed, locale),
      typeDefinition: generateType(parsed),
    });
  }

  return {
    dictionary,
    invalidKeys: invalidKeys.size > 0 ? invalidKeys : undefined,
  };
}
