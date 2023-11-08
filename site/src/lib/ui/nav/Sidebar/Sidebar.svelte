<script>
  import { page } from "$app/stores";
  import { resolveTranslatedPath } from "$lib/i18n";
  import { merge } from "$lib/utils/class-merge";
  import { locale } from "$t18s";
  import SidebarSection from "./SidebarSection.svelte";
  import GithubIcon from "virtual:icons/simple-icons/github";
  import * as t from "$t18s/messages/nav";
</script>

<aside
  role="banner"
  class="hidden md:flex flex-col w-96 gap-8 overflow-y-auto pt-16 px-12 print:hidden"
>
  <header>
    <a
      href={resolveTranslatedPath("/[[locale=locale]]", $locale)}
      class="flex gap-2 items-center outline-orange-400"
    >
      <img src="/icon.svg" alt="t18s" class="w-8 h-8 bg-transparent" />
      <span class="text-lg font-bold text-gray-950">T18S</span>
    </a>
  </header>
  <nav class="grid gap-2">
    <SidebarSection let:Heading let:Link>
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
      href={resolveTranslatedPath("/[[locale=locale]]/switching-locales", $locale)}
      active={$page.url.pathname.endsWith("/switching-locales")}
      >{t.switching_locales()}</Link
    >
    </SidebarSection>

    <SidebarSection let:Heading let:Link>
      <Heading>{t.best_practices()}</Heading>
      <Link
        href={resolveTranslatedPath("/[[locale=locale]]/seo", $locale)}
        active={$page.url.pathname.endsWith("/seo")}>{t.seo()}</Link
      >
    </SidebarSection>

    <SidebarSection let:Heading let:Link>
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
    </SidebarSection>

    <SidebarSection let:Heading let:Link>
      <Heading>{t.appendix()}</Heading>
      <Link
        href={resolveTranslatedPath("/[[locale=locale]]/roadmap", $locale)}
        active={$page.url.pathname.endsWith("/roadmap")}>{t.roadmap()}</Link
      >
      <Link
        href={resolveTranslatedPath("/[[locale=locale]]/playground", $locale)}
        active={$page.url.pathname.endsWith("/playground")}>{t.playground()}</Link
      >
    </SidebarSection>
  </nav>

  <footer>
    <a
      class={merge(
        "text-gray-300 hover:text-orange-500 rounded-full outline-offset-4 outline-orange-400",
        "focus-visible:text-orange-400",
        "grid place-items-center w-min"
      )}
      href="https://github.com/LorisSigrist/t18s"
      target="_blank"
    >
      <span class="sr-only">View on Github</span>
      <GithubIcon class="w-6 h-6" />
    </a>
  </footer>
</aside>
