<script>
  import BottomAppbar from "$lib/ui/nav/Appbar/BottomAppbar.svelte";
  import Sidebar from "$lib/ui/nav/Sidebar/Sidebar.svelte";
</script>

<div
  class="fixed inset-0 flex flex-col-reverse md:flex-row print:block print:static"
>
  <Sidebar />
  <BottomAppbar />
  <main class="w-full h-full overflow-y-auto pt-12 sm:pt-16 px-4 print:overflow-y-visible print:h-auto">
    <div class="prose mb-12">
      <slot />
    </div>
  </main>
</div>
