<script>
  import { page } from "$app/stores";
  import NotFoundPage from "./404/NotFoundPage.svelte";
</script>

{#if $page.status === 404}
  <NotFoundPage />
{:else}
  <h1>Something went wrong {$page.status}</h1>
{/if}
