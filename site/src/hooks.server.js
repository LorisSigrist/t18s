import { building } from "$app/environment";
import { DEFAULT_LOCALE } from "$lib/i18n.js";
import { isLocale } from "$t18s";
import { sequence } from "@sveltejs/kit/hooks";
import { minify } from "html-minifier";

/** @type {import('@sveltejs/kit').Handle} */
const localeHook = async ({ event, resolve }) => {
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

const minification_options = {
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
	conservativeCollapse: true,
	decodeEntities: true,
	html5: true,
	ignoreCustomComments: [/^#/],
	minifyCSS: true,
	minifyJS: true,
	removeAttributeQuotes: true,
	removeComments: false, // some hydration code needs comments, so leave them in
	removeOptionalTags: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	sortAttributes: true,
	sortClassName: true
};

/** @type {import('@sveltejs/kit').Handle} */
const minifyHook = async ({ event, resolve }) => {  
  const response = await resolve(event, {
    transformPageChunk: ({ html, done }) => {
			if (done) {
				return building ? minify(html, minification_options) : html;
			}
		}
  });

  return response;
};

export const handle = sequence(localeHook, minifyHook);

/**
 * @param {import('@sveltejs/kit').RequestEvent} event
 * @returns {import('$t18s').Locale}
 */
function getLocale(event) {
  if (!event.params["locale"]) return DEFAULT_LOCALE;
  if (!isLocale(event.params["locale"])) return DEFAULT_LOCALE;
  return event.params["locale"];
}
