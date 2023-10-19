<script>
  import Searchbar from "./Searchbar.svelte";
  import SidebarLink from "./SidebarLink.svelte";
  import SidebarSectionHeading from "./SidebarSectionHeading.svelte";
  import GithubIcon from "virtual:icons/simple-icons/github";
  import LanguageIcon from "virtual:icons/simple-icons/github";
</script>

<aside role="navigation" class="flex flex-col max-w-lg gap-8 px-12 pt-16">
  <header>
    <span class="flex gap-2 items-center">
        <img src="/icon.svg" alt="t18s" class="w-12 h-12" />
        <span class="text-xl font-bold text-gray-950">T18S</span>
    </span>

    <div class="my-6" />

    <Searchbar />
  </header>
  <nav class="grid gap-3">
    <SidebarSectionHeading>Getting Started</SidebarSectionHeading>
    <SidebarLink href="/" active>Installation</SidebarLink>
    <SidebarLink href="/">Setting Up</SidebarLink>
    <SidebarLink href="/">Loading Messages</SidebarLink>

    <div class="my-2" />

    <SidebarSectionHeading>Guides</SidebarSectionHeading>
    <h3>Getting Started</h3>
    <SidebarLink href="/" active>Installation</SidebarLink>
    <h3>Getting Started</h3>
    <h3>Getting Started</h3>
    <h3>Getting Started</h3>
  </nav>

  <footer>
    <a class="text-gray-300 hover:text-gray-500" href="https://github.com/LorisSigrist/t18s" target="_blank">
        <span class="sr-only">View on Github</span>
        <GithubIcon class="w-6 h-6" />
    </a>
  </footer>
</aside>
