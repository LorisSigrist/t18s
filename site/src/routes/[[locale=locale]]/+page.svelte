<script>
  import CodeGroup from "$lib/ui/CodeGroup.svelte";
  let activeTab = 0;
</script>

<CodeGroup let:Header let:Tab>
  <Header title="Installation" tabs={["npm", "pnpm"]} bind:activeTab />
  {#if activeTab === 0}
    <Tab>npm install --save-dev t18s</Tab>
  {:else if activeTab === 1}
    <Tab>pnpm install --save-dev t18s</Tab>
  {/if}
</CodeGroup>

<CodeGroup let:Tab>
  <Tab>npm install --save-dev t18s</Tab>
</CodeGroup>
