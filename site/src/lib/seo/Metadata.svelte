<script>
  import { page } from "$app/stores";
  import { title, defaultTitle } from "$t18s/messages/seo";
  import { test } from "$t18s/messages";

  $: metadata = $page.data.metadata ?? {};
</script>

<svelte:head>
  {#key $page.url.pathname}
    <title
      >{metadata?.title
        ? $title({ pageTitle: metadata.title })
        : $defaultTitle()}</title
    >

    {#if metadata.description}
      <meta name="description" content={metadata.description} />
    {/if}
  {/key}
</svelte:head>
