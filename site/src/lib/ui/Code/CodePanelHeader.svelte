<script>
    import Tag from "./Tag.svelte";
  /** @type {string} */
  export let tag;
  /** @type {string} */
  export let label;
</script>

{#if tag || label}
  <div
    class="flex h-9 items-center gap-2 border-y border-b-white/7.5 border-t-transparent bg-white/2.5 bg-zinc-900 px-4 dark:border-b-white/5 dark:bg-white/1"
  >
    {#if tag}
      <div class="dark flex">
        <Tag>{tag}</Tag>
      </div>
    {/if}
    {#if tag && label}
      <span class="h-0.5 w-0.5 rounded-full bg-zinc-500" />
    {/if}
    {#if label}
      <span class="font-mono text-xs text-zinc-400">{label}</span>
    {/if}
  </div>
{/if}
