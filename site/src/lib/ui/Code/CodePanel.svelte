<script>
  import CodePanelBody from "./CodePanelBody.svelte";
  import CodePanelHeader from "./CodePanelHeader.svelte";

  /** @type {string|null}*/
  export let label = null;
  /** @type {string|null}*/
  export let tag = null;
</script>

<div class="group dark:bg-white/2.5">
  {#if label || tag}
    <CodePanelHeader {tag} {label} />
  {/if}
  <CodePanelBody><slot /></CodePanelBody>
</div>
