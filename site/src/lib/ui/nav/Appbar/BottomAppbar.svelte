<script>
  import MenuBars from "virtual:icons/heroicons/bars-3";
  import XMark from "virtual:icons/heroicons/x-mark";
  import BottomAppbarSection from "./BottomAppbarSection.svelte";
  import { page } from "$app/stores";
  import { conditionalFocusTrap } from "$lib/utils/focus";
  import * as t from "$t18s/messages/nav";
  import { resolveTranslatedPath } from "$lib/i18n";
  import { locale } from "$t18s";

  let navOpen = false;
</script>

{#if navOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
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
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <nav
      class="absolute grid gap-2 top-0 left-0 -translate-y-full bg-white rounded-t-lg border-t w-full p-4 max-h-96 overflow-y-auto"
      on:click={() => (navOpen = false)}
    >
      <BottomAppbarSection let:Heading let:Link>
        <Heading>{t.guide()}</Heading>
        <Link
          href={resolveTranslatedPath(
            "/[[locale=locale]]/getting-started",
            $locale
          )}
          active={$page.url.pathname.endsWith("/getting-started")}
          >{t.gettingStarted()}</Link
        >
        <Link
          href={resolveTranslatedPath("/[[locale=locale]]/syntax", $locale)}
          active={$page.url.pathname.endsWith("/syntax")}
          >{t.messageSyntax()}</Link
        >

        <Link
          href={resolveTranslatedPath(
            "/[[locale=locale]]/switching-locales",
            $locale
          )}
          active={$page.url.pathname.endsWith("/switching-locales")}
          >{t.switching_locales()}</Link
        >
      </BottomAppbarSection>

      <BottomAppbarSection let:Heading let:Link>
        <Heading>{t.best_practices()}</Heading>
        <Link
          href={resolveTranslatedPath("/[[locale=locale]]/seo", $locale)}
          active={$page.url.pathname.endsWith("/seo")}>{t.seo()}</Link
        >
      </BottomAppbarSection>

      <BottomAppbarSection let:Heading let:Link>
        <Heading>{t.reference()}</Heading>
        <Link
          href={resolveTranslatedPath(
            "/[[locale=locale]]/plugin-config",
            $locale
          )}
          active={$page.url.pathname.endsWith("/plugin-config")}
          >{t.plugin_config()}</Link
        >
        <Link
          href={resolveTranslatedPath("/[[locale=locale]]/$t18s", $locale)}
          active={$page.url.pathname.endsWith("/$t18s")}>{t.$t18s()}</Link
        >
      </BottomAppbarSection>

      <BottomAppbarSection let:Heading let:Link>
        <Heading>{t.appendix()}</Heading>
        <Link
          href={resolveTranslatedPath(
            "/[[locale=locale]]/comparisons",
            $locale
          )}
          active={$page.url.pathname.endsWith("/comparisons")}
          >{t.comparisons()}</Link
        >
        <Link
          href={resolveTranslatedPath("/[[locale=locale]]/roadmap", $locale)}
          active={$page.url.pathname.endsWith("/roadmap")}>{t.roadmap()}</Link
        >
        <Link
          href={resolveTranslatedPath("/[[locale=locale]]/playground", $locale)}
          active={$page.url.pathname.endsWith("/playground")}
          >{t.playground()}</Link
        >
      </BottomAppbarSection>
    </nav>
  {/if}
</header>
