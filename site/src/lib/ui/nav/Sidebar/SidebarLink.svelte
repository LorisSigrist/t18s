<script>
  import { merge } from "$lib/utils/class-merge";
  import { Ripple } from "svelte-material-ripple";

  export let active = false;

  /** @type {string} */
  export let href;
</script>

<a
  class={merge(
    "text-gray-700 relative outline-orange-400 py-1.5 px-4 rounded-r-md border-l border-gray-100",
    active && " text-orange-600 border-orange-600",
    "focus-visible:bg-orange-400/20 focus-visible:outline-none"
  )}
  data-sveltekit-keepfocus
  aria-current={active ? "page" : undefined}
  {href}
>
  <Ripple hoverOpacity={0.2} hoverColor="rgb(251 146 60)" pressedColor="#ff3e00" />
  <slot />
</a>
