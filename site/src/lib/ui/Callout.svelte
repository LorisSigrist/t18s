<script>
  import InfoIcon from "virtual:icons/heroicons/information-circle-solid";
  import WarningIcon from "virtual:icons/heroicons/shield-exclamation-solid";

  /** @type {"info" | "warning"} */
  export let type = "info";
</script>

<div
  class="not-prose my-6 flex gap-2.5 p-4 rounded-2xl leading-6 border {type === "info" ? "border-emerald-500/20 bg-emerald-50/50  text-emerald-900" : "border-orange-500/20 bg-orange-50/50 text-orange-900"}"
>
  {#if type === "info"}
    <InfoIcon class="mt-1 h-4 w-4 flex-none text-emerald-500" />
  {:else if type === "warning"}
    <WarningIcon class="mt-1 h-4 w-4 flex-none text-orange-500" />
  {/if}
  
  <div class="[&amp;>:first-child]:mt-0 [&amp;>:last-child]:mb-0">
    <p>
      <slot />
    </p>
  </div>
</div>
