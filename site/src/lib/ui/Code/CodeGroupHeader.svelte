<script>
  import { merge } from "$lib/utils/class-merge";

  /** @type {string | null}*/
  export let title = null;

  /** @type {string[]}*/
  export let tabs = [];
  export let activeTab = 0;
</script>

<div
  class="flex flex-wrap items-start gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4 dark:border-zinc-800 dark:bg-transparent"
>
  {#if title}
    <h3 class="mr-auto py-3 text-xs font-semibold text-white">
      {title}
    </h3>
  {/if}

  {#if tabs.length > 0}
    <div
      role="tablist"
      aria-orientation="horizontal"
      class="-mb-px flex gap-4 text-xs font-medium"
    >
      {#each tabs as tab, i}
        {@const active = i === activeTab}
        <button
          role="tab"
          on:click={() => (activeTab = i)}
          class={merge(
            "border-b py-3 transition ui-not-focus-visible:outline-none",
            active
              ? "border-orange-500 text-orange-400"
              : "border-transparent text-zinc-400 hover:text-zinc-300"
          )}>{tab}</button
        >
      {/each}
    </div>
  {/if}
</div>
