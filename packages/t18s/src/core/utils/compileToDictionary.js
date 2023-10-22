import { parse } from "@formatjs/icu-messageformat-parser";
import { precompile, generateType } from "t18s/compiler"
import { ResultMatcher } from "./resultMatcher.js";

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
    const markKeyAsInvalid = () => void invalidKeys.add(translationKey);

    /** @param {ReturnType<typeof parse>} parsed */
    const addToDictionary = (parsed) => {
      dictionary.set(translationKey, {
        source: messageSource,
        description: null,
        precompiled: precompile(parsed, locale),
        typeDefinition: generateType(parsed),
      });
    };

    new ResultMatcher(parse)
      .ok(addToDictionary)
      .catch(SyntaxError, markKeyAsInvalid)
      .run(messageSource, {
        shouldParseSkeletons: true,
        requiresOtherClause: false,
      });
  }

  return {
    dictionary,
    invalidKeys: invalidKeys.size > 0 ? invalidKeys : undefined,
  };
}
