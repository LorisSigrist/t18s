<script>
  import MenuBars from "virtual:icons/heroicons/bars-3";
  import XMark from "virtual:icons/heroicons/x-mark";
  import BottomAppbarSection from "./BottomAppbarSection.svelte";
  import { page } from "$app/stores";

  let navOpen = false;
</script>

{#if navOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
    on:click={() => (navOpen = false)}
  />
{/if}

<header class="block md:hidden relative z-50">

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
  <nav
    class="absolute grid gap-2 top-0 left-0 -translate-y-full bg-white rounded-t-lg border-t w-full p-4 max-h-96 overflow-y-auto"
  >
    <BottomAppbarSection let:Link let:Heading>
      <Heading>Getting Started</Heading>
      <Link href="/" active={$page.url.pathname === "/"}>Installation</Link>
      <Link
        href="/getting-started"
        active={$page.url.pathname === "/getting-started"}>Setting Up</Link
      >
      <Link href="/roadmap" active={$page.url.pathname === "/roadmap"}
        >Roadmap</Link
      >
      <Link href="/syntax" active={$page.url.pathname === "/syntax"}
        >Syntax</Link
      >
    </BottomAppbarSection>
  </nav>
{/if}
</header>
