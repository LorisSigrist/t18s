<script>
  import { merge } from "$lib/utils/class-merge";
  export let active = false;
  export let href = "#";
</script>

<a
  {href}
  class={merge(
    "flex justify-between gap-2 py-2 px-2 rounded-md text-sm transition text-zinc-600 hover:text-zinc-900",
    active && "bg-orange-50"
  )}
>
  <span class="truncate"><slot /></span>
</a>
