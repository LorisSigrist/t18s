<script>
  import SidebarSectionHeading from "./SidebarSectionHeading.svelte";
  import SidebarSectionLink from "./SidebarLink.svelte";
</script>

<div class="grid">
  <slot Heading={SidebarSectionHeading} Link={SidebarSectionLink} />
</div>
