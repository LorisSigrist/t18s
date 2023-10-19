<script>
  export let active = false;
  export let href = "#";
</script>

<a class="{active ? "font-semibold" : ""} text-gray-700 relative outline-orange-400" {href}>
  <slot />

  {#if active}
    <span
      class="absolute top-1/2 left-0 w-1.5 h-1.5 -translate-y-1/2 -translate-x-4 rounded-full bg-orange-500"
    />
  {/if}
</a>
