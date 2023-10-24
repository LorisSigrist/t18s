<script>
  import { getContext } from "svelte";
  import CodePanelBody from "./CodePanelBody.svelte";
  import CodePanelHeader from "./CodePanelHeader.svelte";

  /** @type {string|null}*/
  export let label = null;
  /** @type {string|null}*/
  export let tag = null;

  export let name = "default";
  /** @type {import("svelte/store").Writable<string[]>}*/
  const tabs = getContext("code-group-tabs");
  /** @type {import("svelte/store").Writable<number>}*/
  const activeTab = getContext("code-group-active-tab");
  /** @type {string}*/
  const codeGroupId = getContext("code-group-id");

  tabs.update((oldTabs) => [...oldTabs, name]);
  $: active = $tabs.findIndex((tab) => tab === name) === $activeTab;
</script>

<div 
  class="group dark:bg-white/2.5" 
  hidden={!active} 
  role={$tabs.length > 1 ? "tabpanel" : null}
  aria-labelledby={$tabs.length > 1 ? `code-group-${codeGroupId}-tab-${name}"` : null}
>
  {#if label || tag}
    <CodePanelHeader {tag} {label} />
  {/if}
  <CodePanelBody><slot /></CodePanelBody>
</div>
