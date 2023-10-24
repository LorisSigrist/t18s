<script>
  import CodeGroup from "$lib/ui/CodeGroup.svelte";
  import Prism from "$lib/ui/Prism.svelte";
</script>

<CodeGroup let:Header let:Tab>
  <Header title="Installation" />
  <Tab name="npm"><Prism code="npm install --save-dev t18s" language="bash" /></Tab>
  <Tab name="yarn"><Prism code="yarn add --dev t18s" language="bash" /></Tab>
  <Tab name="pnpm"><Prism code="pnpm add --save-dev t18s" language="bash" /></Tab>
</CodeGroup>

<CodeGroup let:Header let:Tab>
  <Header title="Highlighting" />
  <Tab><Prism code="console.log('Hello World')" language="javascript" /></Tab>
</CodeGroup>
