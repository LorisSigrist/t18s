<script>
  import { setLocale } from "$t18s";
  import { DEFAULT_LOCALE } from "$lib/i18n/index.js";
  import HrefLang from "$lib/i18n/HrefLang.svelte";
  import { browser } from "$app/environment";
  import "$lib/app.css"
  import Sidebar from "$lib/ui/Sidebar.svelte";

  export let data;
  $: setLocale(data.locale);
  $: if(browser) document.documentElement.lang = data.locale;
</script>

<HrefLang defaultLocale={DEFAULT_LOCALE} />


<div class="fixed inset-0 flex flex-row">
  <Sidebar />
  <main class="px-24 py-16 w-full h-full  overflow-y-auto">
    <div class="prose">
      <slot />
    </div>
  </main>
</div>


