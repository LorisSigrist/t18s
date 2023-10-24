<script>
  import { merge } from "$lib/utils/class-merge";
  import { cubicInOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";
  export let active = false;

  /** @type {string} */
  export let href;

  const [send, receive] = crossfade({
    duration: 250,
    easing: cubicInOut,
  });
</script>

<a
  class={merge(
    "text-gray-700 relative outline-orange-400 hover:bg-orange-50 py-2 rounded-md",
    active && "font-semibold"
  )}
  {href}
>
  <slot />

  {#if active}
    <!--Active Indicator-->
    <span
      class="absolute top-1/2 left-0 w-1.5 h-1.5 -translate-y-1/2 -translate-x-4 rounded-full bg-orange-500"
      in:send={{ key: "sidebar-link-active-indicator" }}
      out:receive={{ key: "sidebar-link-active-indicator" }}
    />
  {/if}
</a>
