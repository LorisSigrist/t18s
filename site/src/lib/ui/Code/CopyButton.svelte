<script>
  import { merge } from "$lib/utils/class-merge";
  import ClipboardIcon from "virtual:icons/heroicons/clipboard";

  export let copied = false;
</script>

<button
  class={merge(
    "group/button text-sm absolute right-4 top-2.5 overflow-hidden rounded-full py-1 pl-2 pr-3 text-2xs font-medium opacity-0 backdrop-blur transition group-hover:opacity-100",
    copied
      ? "bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/20"
      : "bg-white/5 hover:bg-white/7.5 dark:bg-white/2.5 dark:hover:bg-white/5",
    "focus:opacity-100 outline-none focus-visible:bg-orange-400/30",
  )}
  on:click
>
  <span
    aria-hidden={copied}
    class={merge(
      "pointer-events-none flex items-center gap-0.5 text-zinc-400 transition duration-300",
      copied && "translate-y-1.5 opacity-0"
    )}
  >
    <ClipboardIcon
      className="h-5 w-5 fill-zinc-500/20 stroke-zinc-500 transition-colors group-hover/button:stroke-zinc-400"
    />
    Copy
  </span>

  <span
    aria-hidden={!copied}
    class={merge(
      "pointer-events-none absolute inset-0 flex items-center justify-center text-emerald-400 transition duration-300",
      !copied && "-translate-y-1.5 opacity-0"
    )}
  >
    Copied!
  </span>
</button>
