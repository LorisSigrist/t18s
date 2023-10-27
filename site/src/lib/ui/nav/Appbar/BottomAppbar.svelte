<script>
  import MenuBars from "virtual:icons/heroicons/bars-3";
  import XMark from "virtual:icons/heroicons/x-mark";
  import BottomAppbarSection from "./BottomAppbarSection.svelte";
  import { page } from "$app/stores";
  import { conditionalFocusTrap } from "$lib/utils/focus";


  let navOpen = false;
</script>

{#if navOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
    on:click={() => (navOpen = false)}
  />
{/if}

<header
  class="block md:hidden relative z-50 print:hidden"
  use:conditionalFocusTrap={navOpen}
>
  <div class="flex p-4 border-t items-center justify-between z-50 bg-white">
    <a class="flex gap-2" href="/">
      <img src="/icon.svg" alt="t18s" class="w-6 h-6" />
      <span class="font-semibold">T18S</span>
    </a>

    <button on:click={() => (navOpen = !navOpen)}>
      {#if navOpen}
        <XMark class="w-6 h-6" />
      {:else}
        <MenuBars class="w-6 h-6" />
      {/if}
    </button>
  </div>

  {#if navOpen}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <nav
      class="absolute grid gap-2 top-0 left-0 -translate-y-full bg-white rounded-t-lg border-t w-full p-4 max-h-96 overflow-y-auto"
      on:click={() => (navOpen = false)}
    >
    <BottomAppbarSection let:Heading let:Link>
      <Heading>Guide</Heading>
      <Link href="/getting-started" active={$page.url.pathname === "/getting-started"}>Getting Started</Link>
      <Link href="/syntax" active={$page.url.pathname === "/syntax"}>Syntax</Link>
      <Link href="/switching-locales" active={$page.url.pathname === "/switching-locales"}>Switching Locales</Link>
      <Link href="/preloading" active={$page.url.pathname === "/preloading"}>Preloading</Link>
    </BottomAppbarSection>

    <BottomAppbarSection let:Heading let:Link>
      <Heading>Best Practices</Heading>
      <Link href="/seo" active={$page.url.pathname === "/seo"}>SEO</Link>
    </BottomAppbarSection>

    <BottomAppbarSection let:Heading let:Link>
      <Heading>Reference</Heading>
      <Link href="/plugin-config" active={$page.url.pathname === "/plugin-config"}>Plugin Config</Link>
      <Link href="/$t18s" active={$page.url.pathname === "/$t18s"}>$t18s</Link>
    </BottomAppbarSection>

    <BottomAppbarSection let:Heading let:Link>
      <Heading>Appendix</Heading>
      <Link href="/comparisons" active={$page.url.pathname === "/comparisons"}>Comparisons</Link>
      <Link href="/roadmap" active={$page.url.pathname === "/roadmap"}>Roadmap</Link>
    </BottomAppbarSection>
    </nav>
  {/if}
</header>
