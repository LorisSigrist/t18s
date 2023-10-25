<script>
  import { merge } from "$lib/utils/class-merge";
  export let active = false;

  /** @type {string} */
  export let href;
</script>

<a
  class={merge(
    "text-gray-700 relative outline-orange-400 hover:bg-orange-50 py-1.5 px-4 rounded-r-md border-l border-gray-100",
    active && " text-orange-600 border-orange-600",
    "focus-visible:bg-orange-400/20 focus-visible:outline-none"
  )}
  data-sveltekit-keepfocus
  aria-current={active ? "page" : undefined}
  {href}
>
  <slot />
</a>
