import { basename } from "node:path";

/**
 * @typedef {{ success: true, locale: string, domain: string } | {success: false, reason: "LOCALE_MISSING" | "INVALID_DOMAIN_NAME" | "UNREGISTERED_LOCALE", path: string }} FileCategorizationResult
 */

/**
 * @param {string} path
 * @param {Iterable<string>} knownLocales
 * @returns {FileCategorizationResult}
 */
export function categorizeFile(path, knownLocales) {
  const locales = new Set(knownLocales);

  //get the filename without the extension
  const filename = basename(path).split(".").slice(0, -1).join(".");
  const [first, second] = filename.split(".");

  if (!first) {
    return {
      success: false,
      reason: "LOCALE_MISSING",
      path,
    };
  }

  if (!second) {
    const locale = first;

    if (!locales.has(locale))
      return { success: false, reason: "UNREGISTERED_LOCALE", path };

    return { success: true, locale, domain: "" };
  }

  const domain = first;
  const locale = second;
  if (!isValidDomainName(domain)) {
    return {
      success: false,
      reason: "INVALID_DOMAIN_NAME",
      path,
    };
  }

  if (!locales.has(locale))
    return { success: false, reason: "UNREGISTERED_LOCALE", path };

  return { success: true, locale: second, domain };
}

/**
 * Validates that the given domain is only made up of letters, numbers, underscores and dashes.
 * @param {string} domain
 * @returns {boolean}
 */
function isValidDomainName(domain) {
  return /^[a-zA-Z0-9-_]+$/.test(domain);
}
