import { DEFAULT_LOCALE } from "$lib/i18n";
import { isLocale } from "$t18s";

/**
 * Replaces the placeholder %lang% with the current locale. s
 * @type {import('@sveltejs/kit').Handle} *
 */
export const localeHook = async ({ event, resolve }) => {
  const locale = getLocale(event);
  event.locals.locale = locale;

  const response = await resolve(event, {
    transformPageChunk({ html }) {
      html = html.replace("%lang%", locale);
      return html;
    },
  });

  return response;
};

/**
 * @param {import('@sveltejs/kit').RequestEvent} event
 * @returns {import('$t18s').Locale}
 */
function getLocale(event) {
  if (!event.params["locale"]) return DEFAULT_LOCALE;
  if (!isLocale(event.params["locale"])) return DEFAULT_LOCALE;
  return event.params["locale"];
}
