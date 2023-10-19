export const prerender = true;
import { DEFAULT_LOCALE } from "$lib/i18n/index.js";
import { preloadLocale } from "$t18s";

export async function load({ params }) {
  const locale = params.locale ?? DEFAULT_LOCALE;
  await preloadLocale(locale);
  return { locale };
}
