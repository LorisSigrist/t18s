export const prerender = true;
import { DEFAULT_LOCALE } from "$lib/i18n/index.js";

export async function load({ params }) {
  const locale = params.locale ?? DEFAULT_LOCALE;
  return { locale };
}
