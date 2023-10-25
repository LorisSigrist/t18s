<script>
  import CodeGroup from "$lib/ui/CodeGroup.svelte";
</script>

<div class="bg-white fixed inset-0 grid place-items-center p-4 overflow-y-auto">
  <div class="max-w-2xl">
    <div class="text-center">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        i18n meets Typesafety
      </h1>
      <p class="mt-6 text-lg leading-8 text-gray-600">
        T18S aims to provide the best internationalization experience for
        SvelteKit, delivering typesafety, performance, and ease of use.
      </p>
      <div class="mt-10 flex flex-row flex-wrap gap-x-4 items-center justify-center">
        <div class="w-80 max-w-full">
          <CodeGroup let:Tab>
            <Tab>npm i -D t18s</Tab>
          </CodeGroup>
        </div>
        <a
          href="/getting-started"
          class="rounded-md bg-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >Get started</a
        >
      </div>
    </div>
  </div>
</div>
