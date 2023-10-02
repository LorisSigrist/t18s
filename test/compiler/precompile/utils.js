import { parse } from "@formatjs/icu-messageformat-parser";
import { createIntl, defineMessage } from "@formatjs/intl";
/**
 * See what formatJS does to the message
 *
 * @param {string} message
 * @param {Record<string,any>} values
 */
export function formatJS(
  message,
  values = {},
  locale = "en",
  key = "app.greeting",
) {
  const intl = createIntl({ locale });
  const messages = defineMessage({
    greeting: {
      id: key,
      defaultMessage: message,
      description: "Greeting to welcome the user to the app",
    },
  });

  return intl.formatMessage(messages.greeting, values, {
    requiresOtherClause: false,
  });
}


/**
 * Parses a message into an AST, using our standard options.
 * @param {string} source 
 * @returns {import("@formatjs/icu-messageformat-parser").MessageFormatElement[]}
 */
export function parseMessage(source) {
  return parse(source, {
    shouldParseSkeletons: true,
    requiresOtherClause: false,
  });
}