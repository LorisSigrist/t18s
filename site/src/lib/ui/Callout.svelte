<script>
  import InfoIcon from "virtual:icons/heroicons/information-circle-solid";
  import WarningIcon from "virtual:icons/heroicons/shield-exclamation-solid";
  import SuccessIcon from "virtual:icons/heroicons/check-circle-solid";

  /** @type {"success" | "warning" | "info"} */
  export let type = "info";

  /** @type {Record<typeof type, string>}*/
  const ColorClasses = {
    success: "border-emerald-500/20 bg-emerald-50/50  text-emerald-900",
    warning: "border-orange-500/20 bg-orange-50 text-orange-900",
    info: "border-blue-500/20 bg-blue-50 text-gray-900",
  };
</script>

<div
  class="not-prose my-6 flex  gap-2.5 p-4 rounded-2xl leading-6 border {ColorClasses[type]}"
>
  {#if type === "success"}
    <SuccessIcon class="mt-1 h-4 w-4 flex-none text-emerald-500" />
  {:else if type === "warning"}
    <WarningIcon class="mt-1 h-4 w-4 flex-none text-orange-500" />
  {:else if type === "info"}
    <InfoIcon class="mt-1 h-4 w-4 flex-none text-blue-500" />
  {/if}
  
  <div class="[&amp;>:first-child]:mt-0 [&amp;>:last-child]:mb-0">
    <p>
      <slot />
    </p>
  </div>
</div>
