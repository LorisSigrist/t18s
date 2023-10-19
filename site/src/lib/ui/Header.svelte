<script>
  import SvelteIcon from "virtual:icons/simple-icons/github";
  import LocaleSwitcher from "$lib/LocaleSwitcher.svelte";
  import { t } from "$t18s";
</script>

<header
    class="sticky top-0 left-0 w-full flex justify-between items-center px-6 py-2"
>
  <div>
    <a href="/" title={$t("link.home")}>
        <span class="sr-only">{$t("link.home")}</span>
      <img
        src="/favicon.svg"
        alt="t18s"
        class="w-8 h-8"
      />
  </div>
  <div class="flex">
    <LocaleSwitcher />
    <a
      href="https://github.com/LorisSigrist/t18s"
      target="_blank"
      rel="noopener noreferrer"
    >
      <SvelteIcon />
    </a>
  </div>
</header>


<style lang="postcss">
    header {
        @apply bg-gray-900 text-white;
    }
</style>
