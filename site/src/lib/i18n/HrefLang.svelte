<!--
    @component
    Adds link tags to the head of the document for each available locale.
-->
<script>
  import { locales } from "$t18s";
  import { page } from "$app/stores";
  import { resolvePath } from "@sveltejs/kit";
  import { get } from "svelte/store";
  import { DEFAULT_LOCALE } from "$lib/i18n/index.js";

  /**
   * The name of the route parameter that defines the locale.
   * @type {string}
   * @default "locale"
   */
  export let localeParam = "locale";

  /**
   * The default locale to use when no locale is specified. Should be the same 
   * as your fallback locale.
   * This is used for the `x-default` hreflang.
   *
   * @type {import("$t18s").Locale | null}
   */
  export let defaultLocale = null;


  /**
   * @param {import("$t18s").Locale} locale
   */
  function translatedPath(locale) {
    const currentParams = get(page).params;
    let newParams = currentParams;
    if(locale === DEFAULT_LOCALE) {
      delete newParams[localeParam];
    } else {
      newParams[localeParam] = locale;
    }

    const routeId = get(page).route.id ?? "";
    return resolvePath(routeId, newParams);
  }
</script>

<svelte:head>
  {#if $page.route.id}
    {#each locales as locale}
      <link
        rel="alternate"
        hreflang={locale}
        href={translatedPath(locale)}
      />
    {/each}

    {#if defaultLocale}
      <link
        rel="alternate"
        hreflang="x-default"
        href={translatedPath(defaultLocale)}
      />
    {/if}
  {/if}
</svelte:head>
