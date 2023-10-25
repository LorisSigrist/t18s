<script>
  import "$lib/app.css"
  import { locale, setLocale } from "$t18s";
  import { DEFAULT_LOCALE } from "$lib/i18n/index.js";
  import HrefLang from "$lib/i18n/HrefLang.svelte";
  import { browser } from "$app/environment";
  import Metadata from "$lib/seo/Metadata.svelte";

  export let data;
  $: setLocale(data.locale);
  $: if(browser) document.documentElement.lang = $locale;
</script>

<Metadata />
<HrefLang defaultLocale={DEFAULT_LOCALE} />

<slot />