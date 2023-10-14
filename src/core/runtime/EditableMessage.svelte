<script>
  /** @type {string} */
  export let txt;

  let editing = false;
</script>

{#if editing}
  {txt}
{:else}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span
    data-t18s-key={key}
    style="display: contents;"
    on:click={() => (editing = true)}
  >
    {txt}
  </span>
{/if}
