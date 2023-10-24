<script>
  import CodeGroup from "$lib/ui/CodeGroup.svelte";
</script>

<CodeGroup let:Header let:Tab>
  <Header title="Installation" />
  <Tab name="npm">npm install --save-dev t18s</Tab>
  <Tab name="yarn">yarn add --dev t18s</Tab>
  <Tab name="pnpm">pnpm add --save-dev t18s</Tab>
</CodeGroup>

<CodeGroup let:Tab>
  <Tab>npm install --save-dev t18s</Tab>
</CodeGroup>
