<script>
  import { page } from "$app/stores";
  import { DEFAULT_LOCALE } from "$lib/i18n";
  import HrefLang from "$lib/i18n/HrefLang.svelte";
  import * as t from "$t18s/messages/seo";

  $: metadata = $page.data.metadata ?? {};
</script>

<svelte:head>
  {#key $page.url.pathname}
    <title
      >{metadata?.title
        ? t.title({ pageTitle: metadata.title })
        : t.defaultTitle()}</title
    >

    {#if metadata.description}
      <meta name="description" content={metadata.description} />
    {/if}
  {/key}
</svelte:head>


<HrefLang defaultLocale={DEFAULT_LOCALE} />
