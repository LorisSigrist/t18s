<script>
  import { merge } from "$lib/utils/class-merge";
  import { getContext } from "svelte";

  /** @type {string | null}*/
  export let title = null;

  /** @type {import("svelte/store").Writable<string[]>}*/
  const tabs = getContext("code-group-tabs");

  /** @type {import("svelte/store").Writable<number>}*/
  const activeTab = getContext("code-group-active-tab");

  /** @type {string}*/
  const codeGroupId = getContext("code-group-id");
</script>

<div
  class="flex flex-wrap items-start gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4 dark:border-zinc-800 dark:bg-transparent"
>
  {#if title}
    <h3 class="mr-auto py-3 text-xs font-semibold text-white">
      {title}
    </h3>
  {/if}

  {#if $tabs.length > 1}
    <div
      role="tablist"
      aria-orientation="horizontal"
      class="-mb-px flex text-xs font-medium"
    >
      {#each $tabs as tab, i}
        {@const active = i === $activeTab}
        <button
          role="tab"
          id="code-group-{codeGroupId}-tab-{tab}"
          on:click={() => activeTab.set(i)}
          class={merge(
            "border-b py-3 px-2 transition ui-not-focus-visible:outline-none outline-none",
            "focus-visible:bg-orange-600/30",
            active
              ? "border-orange-500 text-orange-400"
              : "border-transparent text-zinc-400 hover:text-zinc-300",
          )}>{tab}</button
        >
      {/each}
    </div>
  {/if}
</div>
