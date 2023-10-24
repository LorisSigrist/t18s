<script>
  import CodeGroupHeader from "./Code/CodeGroupHeader.svelte";
  import CodeTab from "./Code/CodePanel.svelte";
</script>

<div
  class="shadow-xl my-6 overflow-hidden rounded-md bg-zinc-900 dark:ring-1 dark:ring-white/10 not-prose"
>
  <slot Header={CodeGroupHeader} Tab={CodeTab} />
</div>
