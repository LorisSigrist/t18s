<script lang="ts">
  // @ts-expect-error missing
  import Icon from "virtual:t18s-toolkit:Icon.svelte";
  import CustomCursor from "./CustomCursor.svelte";

  let active = false;

  function deactivate(e) {
    active = false;
    e.preventDefault();
  }

</script>

<svelte:window 
  on:keydown={active ? deactivate : undefined}
/>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="t18s-toolkit" on:click={() => (active = !active)}>
  <Icon />
</div>

{#if active} 
  <CustomCursor />
{/if}

<style>
  .t18s-toolkit {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 10000;
  }
</style>
