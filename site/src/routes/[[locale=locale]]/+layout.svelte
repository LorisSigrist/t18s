<script>
  import Sidebar from "$lib/ui/Sidebar.svelte";
</script>

<div class="fixed inset-0 flex flex-row">
  <Sidebar />
  <main class="px-24 py-16 w-full h-full overflow-y-auto">
    <div class="prose">
      <slot />
    </div>
  </main>
</div>
