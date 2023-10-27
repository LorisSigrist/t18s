<script>
  import { page } from "$app/stores";
  import { merge } from "$lib/utils/class-merge";
  import SidebarSection from "./SidebarSection.svelte";
  import GithubIcon from "virtual:icons/simple-icons/github";
</script>

<aside
  role="banner"
  class="hidden md:flex flex-col w-96 gap-8 overflow-y-auto pt-16 px-12 print:hidden"
>
  <header>
    <a href="/" class="flex gap-2 items-center outline-orange-400">
      <img src="/icon.svg" alt="t18s" class="w-8 h-8 bg-transparent" />
      <span class="text-lg font-bold text-gray-950">T18S</span>
    </a>
  </header>
  <nav class="grid gap-2">
    <SidebarSection let:Heading let:Link>
      <Heading>Guide</Heading>
      <Link
        href="/getting-started"
        active={$page.url.pathname === "/getting-started"}>Getting Started</Link
      >
      <Link href="/syntax" active={$page.url.pathname === "/syntax"}
        >Syntax</Link
      >
    </SidebarSection>

    <SidebarSection let:Heading let:Link>
      <Heading>Best Practices</Heading>
      <Link href="/seo" active={$page.url.pathname === "/seo"}>SEO</Link>
    </SidebarSection>

    <SidebarSection let:Heading let:Link>
      <Heading>Reference</Heading>
      <Link
        href="/plugin-config"
        active={$page.url.pathname === "/plugin-config"}>Plugin Config</Link
      >
      <Link href="/$t18s" active={$page.url.pathname === "/$t18s"}>$t18s</Link>
    </SidebarSection>

    <SidebarSection let:Heading let:Link>
      <Heading>Appendix</Heading>
      <Link href="/comparisons" active={$page.url.pathname === "/comparisons"}
        >Comparisons</Link
      >
      <Link href="/roadmap" active={$page.url.pathname === "/roadmap"}
        >Roadmap</Link
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
