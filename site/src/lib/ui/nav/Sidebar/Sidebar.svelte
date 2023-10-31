<script>
  import { page } from "$app/stores";
  import { resolveTranslatedPath } from "$lib/i18n";
  import LocaleSwitcher from "$lib/ui/LocaleSwitcher.svelte";
  import { merge } from "$lib/utils/class-merge";
  import { locale } from "$t18s";
  import * as t from "$t18s/messages/nav";

  import SidebarSection from "./SidebarSection.svelte";
  import GithubIcon from "virtual:icons/simple-icons/github";
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
        active={$page.url.pathname.endsWith("/syntax")}>{t.messageSyntax()}</Link
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
        href="/plugin-config"
        active={$page.url.pathname === "/plugin-config"}>{t.plugin_config()}</Link
      >
      <Link href="/$t18s" active={$page.url.pathname === "/$t18s"}>{t.$t18s()}</Link>
    </SidebarSection>

    <SidebarSection let:Heading let:Link>
      <Heading>{t.appendix()}</Heading>
      <Link href="/comparisons" active={$page.url.pathname === "/comparisons"}
        >{t.comparisons()}</Link
      >
      <Link href="/roadmap" active={$page.url.pathname === "/roadmap"}
        >{t.roadmap()}</Link
      >
    </SidebarSection>
  </nav>

  <footer>

    <LocaleSwitcher />
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
