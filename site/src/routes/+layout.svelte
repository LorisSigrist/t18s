<script>
  import { locale, setLocale } from "$t18s";
  import { DEFAULT_LOCALE } from "$lib/i18n/index.js";
  import HrefLang from "$lib/i18n/HrefLang.svelte";
  import { browser } from "$app/environment";
  import "$lib/app.css"

  export let data;
  $: setLocale(data.locale);
  $: if(browser) document.documentElement.lang = $locale;
</script>

<HrefLang defaultLocale={DEFAULT_LOCALE} />

<slot />