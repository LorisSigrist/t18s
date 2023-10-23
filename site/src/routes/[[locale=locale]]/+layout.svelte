<script>
  import BottomAppbar from "$lib/ui/BottomAppbar.svelte";
  import Sidebar from "$lib/ui/Sidebar.svelte";
</script>

<div
  class="fixed inset-0 flex flex-col-reverse md:flex-row gap-x-8 lg:gap-x-24"
>
  <Sidebar />
  <BottomAppbar />
  <main class="w-full h-full overflow-y-auto p-4 pt-12 sm:pt-16">
    <div class="prose">
      <slot />
    </div>
  </main>
</div>
