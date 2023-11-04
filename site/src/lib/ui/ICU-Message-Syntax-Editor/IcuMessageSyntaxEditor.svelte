<script>
  import "$lib/prism.css";
  import Prism from "prismjs";
  import "prismjs/components/prism-icu-message-format.js";
  import { parse } from "@formatjs/icu-messageformat-parser";
  import { generateType, precompile } from "t18s/compiler";
  import CodeGroup from "../CodeGroup.svelte";
  import PrismComponent from "../Prism.svelte";

  Prism.manual = true;

  /**
   * @type {string}
   */
  export let message;

  $: html = Prism.highlight(
    message,
    // @ts-ignore
    Prism.languages["icu-message-format"],
    "icu-message-format"
  );

  /**
   * @type {import("@formatjs/icu-messageformat-parser").MessageFormatElement[]}
   */
  let elements = [];

  $: try {
    elements = parse(message, {
      requiresOtherClause: false,
      shouldParseSkeletons: true,
    });
  } catch (e) {
    console.error(e);
  }

  $: precompiled = precompile(elements, "en");
  $: generatedType = generateType(elements);
</script>

<div
  class="relative w-full h-56 overflow-auto not-prose bg-zinc-900 shadow-md rounded-md text-sm"
>
  <textarea
    bind:value={message}
    class="p-4 min-w-full w-full max-w-none h-full absolute top-0 left-0 resize-none bg-transparent font-mono text-white whitespace-nowrap overflow-x-hidden"
  />
  <pre
    class="language-icu-message-format p-4 min-w-full max-w-none h-full absolute top-0 left-0 font-mono pointer-events-none select-none overflow-x-visible">{@html html}</pre>
</div>

<CodeGroup let:Tab let:Header>
  <Header title="T18S Compiler Output" />

  <Tab name="Generated Code">
    <PrismComponent language="javascript" code={precompiled} />
  </Tab>
  <Tab name="Generated Type">
    <PrismComponent language="typescript" code={generatedType} />
  </Tab>
</CodeGroup>
