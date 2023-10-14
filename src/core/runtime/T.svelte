<script context="module">
</script>

<script>
  //@ts-ignore
  import { t, locale } from "$t18s";
  //@ts-ignore
  import { dev } from "$app/environment";
  //@ts-ignore
  import { get } from "svelte/store";

  import EditableMessage from "./EditableMessage.svelte";

  /** @type {string} */
  export let key;

  /** @type {any} */
  export let values = undefined;

  $: txt = $t(key, values);

  function submit() {
    if (import.meta.hot) {
      import.meta.hot.send("t18s:add-message", {
        locale: get(locale),
        key: "dynamically-added",
        value: "I'm a dynamically added message!",
      });
    }
  }
</script>

{#if dev}
  <EditableMessage txt={txt} />
{:else}
  {txt}
{/if}
