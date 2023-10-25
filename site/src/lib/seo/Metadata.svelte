<script>
  import { page } from "$app/stores";

  const FALLBACK_TITLE = "T18S";

  $: metadata = $page.data.metadata ?? {};
</script>

<svelte:head>
  {#key $page.url.pathname}
    <title>{metadata?.title ?? FALLBACK_TITLE}</title>

    {#if metadata.description}
      <meta name="description" content={metadata.description} />
    {/if}
  {/key}
</svelte:head>
