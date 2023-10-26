<script>
  import CodeGroup from "$lib/ui/CodeGroup.svelte";
  import CommandLineIcon from "virtual:icons/heroicons/command-line";
  import TypeScriptIcon from "virtual:icons/simple-icons/typescript";
  import {
    title,
    mission_statement,
    get_started_cta,
    precompilation_feature_title,
    precompilation_feature_description,
    typesafety_feature_title,
    typesafety_feature_description
  } from "$t18s/messages/homepage";
  import Prism from "$lib/ui/Prism.svelte";
</script>

<div
  class="bg-white fixed inset-0 grid place-items-center px-4 py-12 overflow-y-auto"
>
  <div class="max-w-2xl flex flex-col gap-4">
    <hgroup class="text-center">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        {$title()}
      </h1>
      <p class="mt-6 text-lg leading-8 text-gray-600">
        {$mission_statement()}
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
            {$typesafety_feature_title()}
          </dt>
          <dd class="inline">
            {$typesafety_feature_description()}
          </dd>
        </div>
        <div class="relative pl-9">
          <dt class="inline font-semibold text-orange-500">
            <CommandLineIcon
              class="absolute left-1 top-1 h-5 w-5 text-orange-500"
              aria-hidden
            />
            {$precompilation_feature_title()}
          </dt>
          <dd class="inline">
            {$precompilation_feature_description()}
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
        href="/getting-started"
        class="rounded-md bg-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >{$get_started_cta()}</a
      >
    </div>
  </div>
</div>
