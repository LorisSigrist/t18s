import { resolvePath } from "@sveltejs/kit";

/** @type {import("$t18s").Locale} */
export const DEFAULT_LOCALE = "en";

/**
 * A version of `resolvePath` that always set's the locale parameter to the correct value.
 *
 * @param {string} routeId
 * @param {import("$t18s").Locale} locale
 * @param {Record<string, string | undefined>} params
 */
export function resolveTranslatedPath(routeId, locale, params = {}) {
  return resolvePath(routeId, {
    ...params,
    locale: locale === DEFAULT_LOCALE ? undefined : locale,
  });
}
