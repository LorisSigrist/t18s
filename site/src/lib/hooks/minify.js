import { building } from '$app/environment';
import { minify } from 'html-minifier';

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
	removeComments: false, // some hydration code needs comments, so leave them in ---- what code??
	removeOptionalTags: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	sortAttributes: true,
	sortClassName: true
};

/** 
 * Minify HTML output in production.
 * @type {import('@sveltejs/kit').Handle} 
 */
export const minifyHook = async ({ event, resolve }) => {  
  const response = await resolve(event, {
    transformPageChunk: ({ html, done }) => {
			if (done) {
				return building ? minify(html, minification_options) : html;
			}
		}
  });

  return response;
};