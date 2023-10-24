<script>
  import CodePanelHeader from "./CodePanelHeader.svelte";
  import CopyButton from "./CopyButton.svelte";

  /** @type {HTMLElement}*/
  let content;

  let copied = false;
  function saveCodeToClipboard() {
    copied = true;
    navigator.clipboard.writeText(content.innerText);
    setTimeout(() => {
      copied = false;
    }, 1000);
  }
</script>

<div class="group dark:bg-white/2.5">
  <CodePanelHeader tag="GET" label="sigrist.dev/api/v1/users" />
  <div class="relative">
    <pre class="overflow-x-auto p-4 text-xs text-white" bind:this={content}><slot /></pre>
    <CopyButton on:click={saveCodeToClipboard} {copied} />
  </div>
</div>
