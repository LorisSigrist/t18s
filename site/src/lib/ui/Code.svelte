<script>
  import CodeTab from "./Code/CodeTab.svelte";
  /** @type {string}*/
  export let code;

  /** @type {string | null}*/
  export let language = null;

  /** @type {string | null}*/
  export let filename = null;
</script>

<div
  class="my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10 not-prose"
>
  <CodeTab code={"npm install --save-dev t18s"}>npm install --save-dev t18s</CodeTab>
</div>
