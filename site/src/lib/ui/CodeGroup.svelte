<script>
  import { setContext } from "svelte";
  import CodeGroupHeader from "./Code/CodeGroupHeader.svelte";
  import CodeTab from "./Code/CodePanel.svelte";
  import { writable } from "svelte/store";

  /** @type {import("svelte/store").Writable<string[]>}*/
  let tabs = writable([]);
  let activeTab = writable(0);

  setContext("code-group-id", crypto.randomUUID());
  setContext("code-group-tabs", tabs);
  setContext("code-group-active-tab", activeTab);
</script>

<div
  class="shadow-md my-6 overflow-hidden rounded-md bg-zinc-900 dark:ring-1 dark:ring-white/10 not-prose"
>
  <slot Header={CodeGroupHeader} Tab={CodeTab} />
</div>
