<script>
  import CodePanelHeader from "./CodePanelHeader.svelte";
  import CopyButton from "./CopyButton.svelte";

  /** @type {string} */
  export let code;
</script>

<div class="group dark:bg-white/2.5">
  <CodePanelHeader tag="GET" label="sigrist.dev/api/v1/users" />
  <div class="relative">
    <pre class="overflow-x-auto p-4 text-xs text-white"><slot /></pre>
    <CopyButton {code} />
  </div>
</div>
