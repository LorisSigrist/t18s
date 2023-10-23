<script>
  import Searchbar from "./Searchbar.svelte";
  import SidebarLink from "./SidebarLink.svelte";
  import SidebarSectionHeading from "./SidebarSectionHeading.svelte";
  import GithubIcon from "virtual:icons/simple-icons/github";
</script>

<aside role="navigation" class="hidden md:flex flex-col max-w-lg gap-8 overflow-y-auto pt-16 px-8">
  <header>
    <span class="flex gap-2 items-center">
      <img src="/icon.svg" alt="t18s" class="w-12 h-12" />
      <span class="text-xl font-bold text-gray-950">T18S</span>
    </span>

    <div class="my-6" />
    <Searchbar />
  </header>
  <nav class="grid gap-8">
    
    <div class="grid">
      <SidebarSectionHeading>Getting Started</SidebarSectionHeading>
      <SidebarLink href="/" active>Installation</SidebarLink>
      <SidebarLink href="/getting-started">Setting Up</SidebarLink>
      <SidebarLink href="/roadmap">Loading Messages</SidebarLink>
    </div>

    <div class="grid">
      <SidebarSectionHeading>Guides</SidebarSectionHeading>
      <SidebarLink href="/" active>Installation</SidebarLink>
      <SidebarLink href="/syntax">Syntax</SidebarLink>
    </div>
  </nav>

  <footer>
    <a
      class="text-gray-300 hover:text-gray-500"
      href="https://github.com/LorisSigrist/t18s"
      target="_blank"
    >
      <span class="sr-only">View on Github</span>
      <GithubIcon class="w-6 h-6" />
    </a>
  </footer>
</aside>
