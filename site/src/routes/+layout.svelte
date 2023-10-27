<script>
  import "$lib/app.css"
  import { locale, setLocale } from "$t18s";
  import { browser } from "$app/environment";
  import Metadata from "$lib/seo/Metadata.svelte";

  export let data;
  $: setLocale(data.locale);
  $: if(browser) document.documentElement.lang = $locale;
</script>

<Metadata />

<slot />