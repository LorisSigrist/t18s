<script>
  import { setLocale } from "$t18s";
  import HrefLang from "$lib/HrefLang.svelte";
  import { DEFAULT_LOCALE } from "$lib/i18n.js";
  import LocaleSwitcher from "$lib/LocaleSwitcher.svelte";
  import { browser } from "$app/environment";

  export let data;
  $: setLocale(data.locale);
  $: if(browser) document.documentElement.lang = data.locale;
</script>

<HrefLang defaultLocale={DEFAULT_LOCALE} />

<LocaleSwitcher />
<slot />

