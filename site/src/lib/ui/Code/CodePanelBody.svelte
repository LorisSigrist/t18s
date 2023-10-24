<script>
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

<div class="relative">
  <div class="overflow-x-auto px-4 py-3 text-xs text-white font-mono leading-6" bind:this={content}>
    <slot />
  </div>
  <CopyButton on:click={saveCodeToClipboard} {copied} />
</div>
