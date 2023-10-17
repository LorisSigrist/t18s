<script lang="ts">
  // @ts-expect-error missing
  import Icon from "virtual:t18s-toolkit:Icon.svelte";
  import { locale } from "$t18s";
  import { get } from "svelte/store";

  function test() {
    if (import.meta.hot) {
      import.meta.hot.send("t18s:add-message", {
        locale: get(locale),
        key: "dynamically-added",
        domain: "messages",
        value: "I'm a dynamically added message!",
      });
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
  }
</style>
