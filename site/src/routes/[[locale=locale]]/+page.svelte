<script>
  import CodeGroup from "$lib/ui/CodeGroup.svelte";
  import CommandLineIcon from "virtual:icons/heroicons/command-line";
  import TypeScriptIcon from "virtual:icons/simple-icons/typescript";
  import Prism from "$lib/ui/Prism.svelte";
  import { resolveTranslatedPath } from "$lib/i18n";
  import { locale } from "$t18s";
  import * as t from "$t18s/messages/homepage"
  import { get } from "svelte/store";
</script>

<div
  class="bg-white fixed inset-0 grid place-items-center px-4 py-12 overflow-y-auto"
>
  <div class="max-w-2xl flex flex-col gap-4">
    <hgroup class="text-center">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        {get(t.title)}
      </h1>
      <p class="mt-6 text-lg leading-8 text-gray-600">
        {get(t.mission_statement)()}
      </p>
    </hgroup>
    <div>
      <dl
        class="mx-auto mt-8 px-4 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-700 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-12"
      >
        <div class="relative pl-9">
          <dt class="inline font-semibold text-orange-500">
            <TypeScriptIcon
              class="absolute left-1 top-1 h-5 w-5 text-orange-500"
              aria-hidden
            />
            {get(t.features.typesafety.title)()}
          </dt>
          <dd class="inline">
            {get(t.features.typesafety.description)()}
          </dd>
        </div>
        <div class="relative pl-9">
          <dt class="inline font-semibold text-orange-500">
            <CommandLineIcon
              class="absolute left-1 top-1 h-5 w-5 text-orange-500"
              aria-hidden
            />
            {get(t.features.precompilation.title)()}
          </dt>
          <dd class="inline">
            {get(t.features.precompilation.description)()}
          </dd>
        </div>
      </dl>
    </div>
    <div class="flex flex-row flex-wrap gap-x-4 items-center justify-center">
      <div class="w-56 max-w-full text-left">
        <CodeGroup let:Tab>
          <Tab><Prism language="bash" code="npm i -D t18s" /></Tab>
        </CodeGroup>
      </div>
      <a
        href={resolveTranslatedPath(
          "/[[locale=locale]]/getting-started",
          $locale
        )}
        class="rounded-md bg-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >{get(t.get_started_cta)()}</a
      >
    </div>
  </div>
</div>
