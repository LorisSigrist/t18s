<script>
  import CodeGroup from "$lib/ui/CodeGroup.svelte";

</script>
<h1>Getting Started</h1>

<p>
    First you need to install t18s as a dev dependency.
</p>

<CodeGroup let:Tab>
    <Tab>npm install --save-dev t18s</Tab>
</CodeGroup>

<p>
    T18S isn't just a library, it's a vite-plugin, so you will need to register it in your vite config.
</p>

<CodeGroup let:Header let:Tab>
    <Header title="vite.config.js" />
    <Tab>
        
    </Tab>
</CodeGroup>

<p>
    Aaaand we're off.
</p>