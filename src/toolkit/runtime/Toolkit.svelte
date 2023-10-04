<script lang="ts">
  // @ts-expect-error missing
  import Icon from "virtual:t18s-toolkit:Icon.svelte";
  import { locales, locale } from "$t18s";

  function test() {
    if (import.meta.hot) {
      import.meta.hot.send("t18s:test", {});
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="t18s-toolkit" on:click={test}>
  <Icon />
</div>

<style>
  .t18s-toolkit {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 10000;

    font-size: 1.5rem;

    padding: 0.5rem;
    background-color: #ff3e00;
    color: white;
    border-radius: 0.25rem;
  }
</style>
