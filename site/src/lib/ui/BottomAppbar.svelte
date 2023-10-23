<script>
  import { fly } from "svelte/transition";
  import MenuBars from "virtual:icons/heroicons/bars-3";
  import XMark from "virtual:icons/heroicons/x-mark";

  let navOpen = false;
</script>

{#if navOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-40"
    on:click={() => (navOpen = false)}
  />
{/if}

<header class="block md:hidden relative z-50">
  {#if navOpen}
    <nav
      class="absolute top-0 left-0 -translate-y-full bg-white rounded-t-lg border-t w-full p-4 max-h-96 overflow-y-auto"
      in:fly={{ y: 50, duration: 150 }}
    >
      Hello World<br/>
      Hello World<br/>
      Hello World<br/>
      Hello World<br/>
      Hello World<br/>
      Hello World<br/>
      Hello World<br/>
      Hello World<br/>
      Hello World<br/>
      Hello World<br/>
      Hello World<br/>
      Hello World<br/>
      Hello World<br/>
      Hello World<br/>
      Hello World<br/>
      Hello World<br/>
      Hello World<br/>
      Hello World<br/>
      Hello World<br/>
      Hello World<br/>
      Hello World<br/>
      Hello World<br/>
    </nav>
  {/if}

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
</header>
