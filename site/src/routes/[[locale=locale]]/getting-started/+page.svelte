<script>
  import CodeGroup from "$lib/ui/CodeGroup.svelte";
  import ViteConfigSnippet from "./vite-config-snippet.js?raw";
  import Prism from "$lib/ui/Prism.svelte";
</script>

<h1>Getting Started</h1>

<p>First you need to install t18s as a dev dependency.</p>

<CodeGroup let:Header let:Tab>
  <Header title="Installation" />
  <Tab name="npm"
    ><Prism code="npm install --save-dev t18s" language="bash" /></Tab
  >
  <Tab name="yarn"><Prism code="yarn add --dev t18s" language="bash" /></Tab>
  <Tab name="pnpm"
    ><Prism code="pnpm add --save-dev t18s" language="bash" /></Tab
  >
</CodeGroup>

<p>
  T18S isn't just a library, it's a vite-plugin, so you will need to register it
  in your vite config.
</p>

<CodeGroup let:Header let:Tab>
  <Header title="vite.config.js" />
  <Tab>
    <Prism code={ViteConfigSnippet} language="javascript" />
  </Tab>
</CodeGroup>

<p>
  You will need to at least one option in the plugin options; The list of
  locales that you want to support. Additionally you may use a fallback locale
  that will be used if a message is missing in the current locale.
</p>
