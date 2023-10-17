<script context="module">
</script>

<script>
  //@ts-ignore
  import { t, locale } from "$t18s";
  //@ts-ignore
  import { dev } from "$app/environment";
  /** @type {string} */
  export let key;

  /** @type {any} */
  export let values = undefined;

  $: txt = $t(key, values);
</script>

{#if dev}
  <span
    style="display: contents;" 
    data-t18s-key={key}
    data-t18s-locale={$locale}
    class="t18s-dev-message"
  >{txt}</span>
{:else}
  {txt}
{/if}
