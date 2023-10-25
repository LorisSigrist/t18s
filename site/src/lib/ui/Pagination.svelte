<script>
  import ArrowLeft from "virtual:icons/heroicons/arrow-left";
  import ArrowRight from "virtual:icons/heroicons/arrow-right";

  /** @type {string} */
  export let previousLabel;
  /** @type {string} */
  export let nextLabel;
  /** @type {string} */
  export let previousHref;
  /** @type {string} */
  export let nextHref;
</script>

<footer class="flex items-center justify-between not-prose pt-4 border-t">
  <a
    class="inline-flex gap-1 items-center justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-100 py-1 px-3 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
    href={previousHref}><ArrowLeft class="h-4 w-4" />{previousLabel}</a
  >

  <a
    class="inline-flex gap-1 items-center justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-100 py-1 px-3 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
    href={nextHref}>{nextLabel}<ArrowRight class="h-4 w-4" /></a
  >
</footer>
