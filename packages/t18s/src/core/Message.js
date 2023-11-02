import { parse } from "@formatjs/icu-messageformat-parser";
import { precompile } from "../../compiler/precompile.js";
import { generateType } from "../../compiler/generateTypes.js";

export class Message {
  /** @type {string} */
  source;

  /** @type {string} */
  typeDefinition;

  /** @type {string} */
  precompiled;

  /** @type {string|null} */
  description;

  /** @type {string} */
  locale;

  /**
   * @param {string} locale
   * @param {string} source
   * @param {string|null} description
   */
  constructor(locale, source, description = null) {
    this.locale = locale;
    this.source = source;
    this.description = description;

    const parsed = parse(source, {
      shouldParseSkeletons: true,
      requiresOtherClause: false,
    });

    this.precompiled = precompile(parsed, locale);
    this.typeDefinition = generateType(parsed);
  }

  /**
   * @param {unknown} thing 
   * @returns {thing is Message}
   */
  static isMessage(thing) {
    return thing instanceof Message;
  }
}
