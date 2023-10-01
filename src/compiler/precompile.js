import { TYPE } from "@formatjs/icu-messageformat-parser";

/**
 * Compiles a message into a function that can be used to format the message.
 * This eliminates the need to ship a parser to the client.
 *
 * @param {import("@formatjs/icu-messageformat-parser").MessageFormatElement[]} elements
 * @param {string} locale
 * @returns {string}
 */
export function precompile(elements, locale) {
  if (hasOnlyLiterals(elements)) {
    return '()=>"' + elements.map((e) => e.value).join("") + '"';
  }

  return (
    "(args) => `" +
    elements.map((el) => compileElement(el, locale, null)).join("") +
    "`"
  );
}

/**
 * Compile a single element
 * @param {import("@formatjs/icu-messageformat-parser").MessageFormatElement} element
 * @param {string} locale
 * @param {string | null} poundValue
 * @returns {string}
 */
function compileElement(element, locale, poundValue) {
  switch (element.type) {
    case TYPE.literal:
      return escapeLiteral(element.value);
    case TYPE.argument:
      return "${args." + element.value + "}";
    case TYPE.tag:
      return (
        "<${args." +
        element.value +
        "}>" +
        element.children
          .map((el) => compileElement(el, locale, poundValue))
          .join("") +
        "</${args." +
        element.value +
        "}>"
      );
    case TYPE.select: {
      return compileSelect(element, locale, poundValue);
    }
    case TYPE.pound: {
      if (poundValue === null) {
        throw new Error("Pound sign used outside of plural/select element");
      }
      return (
        '${new Intl.NumberFormat("' +
        locale +
        '").format(args.' +
        poundValue +
        ")}"
      );
    }
    case TYPE.plural: {
      return compilePlural(element, locale, poundValue);
    }
    case TYPE.time: {
      return (
        "${" +
        `new Intl.DateTimeFormat("${locale}",` +
        `{timeStyle: "${element.style}"}` +
        `).format(args.${element.value})}`
      );
    }
    case TYPE.date: {
      return compileDate(element, locale);
    }
    case TYPE.number: {
      return compileNumber(element, locale);
    }
  }
}

/**
 *
 * @param {import("@formatjs/icu-messageformat-parser").NumberElement} element
 * @param {string} locale
 */
function compileNumber(element, locale) {
  if (!element.style) {
    return (
      "${" + `new Intl.NumberFormat("${locale}").format(args.${element.value})}`
    );
  }

  if (typeof element.style === "string") {
    return (
      "${" +
      `new Intl.NumberFormat("${locale}", {style:"${element.style}"}).format(args.${element.value})}`
    );
  }

  const options = JSON.stringify(element.style.parsedOptions);

  return (
    "${" +
    `new Intl.NumberFormat("${locale}", ${options}).format(args.${element.value})}`
  );
}

/**
 *
 * @param {import("@formatjs/icu-messageformat-parser").DateElement} element
 * @param {string} locale
 */
function compileDate(element, locale) {
  if (!element.style) {
    return (
      "${" +
      `new Intl.DateTimeFormat("${locale}").format(args.${element.value})}`
    );
  }

  if (typeof element.style === "string") {
    return (
      "${" +
      `new Intl.DateTimeFormat("${locale}", {dateStyle:"${element.style}"}).format(args.${element.value})}`
    );
  }

  const options = JSON.stringify(element.style.parsedOptions);

  return (
    "${" +
    `new Intl.DateTimeFormat("${locale}", ${options}).format(args.${element.value})}`
  );
}

/**
 * @param {import("@formatjs/icu-messageformat-parser").SelectElement} element
 * @param {string} locale
 * @param {string | null} poundValue
 * @returns {string}
 */
function compileSelect(element, locale, poundValue) {
  let fallback = '""';

  /**
   * @type {Record<string, string>}
   */
  const options = {};

  for (const [key, option] of Object.entries(element.options)) {
    if (key === "other") {
      fallback =
        "`" +
        option.value
          .map((el) => compileElement(el, locale, poundValue))
          .join("") +
        "`";
    } else {
      options[key] =
        "`" +
        option.value
          .map((el) => compileElement(el, locale, poundValue))
          .join("") +
        "`";
    }
  }

  let str = "${";

  for (const [key, option] of Object.entries(options)) {
    str += `args.${element.value} === "${key}" ? ${option} : `;
  }

  str += `${fallback}`;

  str += "}";
  return str;
}

/**
 * @param {import("@formatjs/icu-messageformat-parser").PluralElement} element
 * @param {string} locale
 * @param {string | null} poundValue
 * @returns {string}
 */
function compilePlural(element, locale, poundValue) {
  /** @type {Record<number, string>} */
  const exactValues = {};

  /** @type {Record<Intl.LDMLPluralRule | string, string>} */
  const pluralValues = {};

  let fallback = '""';

  for (const [key, option] of Object.entries(element.options)) {
    if (key.startsWith("=")) {
      const number = parseInt(key.slice(1));
      exactValues[number] =
        "`" +
        option.value
          .map((el) => compileElement(el, locale, element.value))
          .join("") +
        "`";
    } else if (key === "other") {
      fallback =
        "`" +
        option.value
          .map((el) => compileElement(el, locale, element.value))
          .join("") +
        "`";
    } else {
      pluralValues[key] =
        "`" +
        option.value
          .map((el) => compileElement(el, locale, element.value))
          .join("") +
        "`";
    }
  }

  let str = "${";

  for (const [number, option] of Object.entries(exactValues)) {
    str += `args.${element.value} == ${number} ? ${option} : `;
  }

  for (const [pluralRule, option] of Object.entries(pluralValues)) {
    str += `new Intl.PluralRules("${locale}", {type: "${element.pluralType}"}).select(args.${element.value}) == "${pluralRule}" ? ${option} : `;
  }

  str += `${fallback} }`;
  return str;
}

/**
 * A TypeGuard that checks if an array of elements contains only literals
 *
 * @param {import("@formatjs/icu-messageformat-parser").MessageFormatElement[]} elements
 * @returns {elements is import("@formatjs/icu-messageformat-parser").LiteralElement[]}
 */
function hasOnlyLiterals(elements) {
  let hasOnlyLiterals = true;
  for (const element of elements) {
    hasOnlyLiterals &&= element.type === TYPE.literal;
  }
  return hasOnlyLiterals;
}

/**
 * Escape a string literal so that it can be used inside a template literal
 * @param {string} literal
 * @returns {string}
 */
function escapeLiteral(literal) {
  literal = literal.replace(/`/g, "\\`");
  return literal;
}
