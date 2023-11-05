<script>
  import "$lib/prism.css";
  import Prism from "prismjs";
  import "prismjs/components/prism-icu-message-format.js";
  import { parse } from "@formatjs/icu-messageformat-parser";
  import { generateType, precompile } from "t18s/compiler";
  import CodeGroup from "../CodeGroup.svelte";
  import PrismComponent from "../Prism.svelte";
  import { undoable } from "$lib/utils/undo";
  import { shortcut } from "@svelte-put/shortcut";

  Prism.manual = true;

  /**
   * @type {string}
   */
  export let value;

  export let locale = "en";

  const message = undoable(value);
  $: value = $message;
  $: message.set(value);

  $: html = Prism.highlight(
    $message,
    // @ts-ignore
    Prism.languages["icu-message-format"],
    "icu-message-format"
  );

  /**
   * @type {import("@formatjs/icu-messageformat-parser").MessageFormatElement[]}
   */
  let elements = [];

  $: try {
    elements = parse($message, {
      requiresOtherClause: false,
      shouldParseSkeletons: true,
    });
  } catch (e) {
    console.error(e);
  }

  /** @type {HTMLTextAreaElement}*/
  let textarea;

  /**
   * @param {HTMLTextAreaElement} textarea
   * @param {string} newText
   */
  function typeInTextarea(textarea, newText) {
    const [start, end] = [textarea.selectionStart, textarea.selectionEnd];
    textarea.setRangeText(newText, start, end, "select");

    //Place cursor at the end of the inserted text
    textarea.setSelectionRange(start + newText.length, start + newText.length);

    //Fire input event manually so that Svelte's bind:value is updated
    const e = document.createEvent("Event");
    e.initEvent("input", true, true);
    textarea.dispatchEvent(e);
  }

  /**
   * @param {HTMLTextAreaElement} textarea
   * @param {string} before
   * @param {string} after
   */
  function wrapSelectedText(textarea, before, after) {
    const [start, end] = [textarea.selectionStart, textarea.selectionEnd];
    const selectedText = textarea.value.substring(start, end);
    textarea.setRangeText(
      `${before}${selectedText}${after}`,
      start,
      end,
      "select"
    );

    //Place cursor at the end of the inserted text, but before the after text
    textarea.setSelectionRange(
      start + before.length + selectedText.length,
      start + before.length + selectedText.length
    );

    //Fire input event manually so that Svelte's bind:value is updated
    const e = document.createEvent("Event");
    e.initEvent("input", true, true);
    textarea.dispatchEvent(e);
  }

  /**
   * @param {HTMLTextAreaElement} textarea
   */
  function getCharacterAfterCursor(textarea) {
    const [_start, end] = [textarea.selectionStart, textarea.selectionEnd];
    return textarea.value.substring(end, end + 1);
  }

  /**
   * @param {HTMLTextAreaElement} textarea
   * @param {number} offset
   */
  function moveSelection(textarea, offset) {
    const [start, end] = [textarea.selectionStart, textarea.selectionEnd];
    textarea.setSelectionRange(start + offset, end + offset);
  }

  /**
   * @param {KeyboardEvent} event
   */
  function handleTextareaKeydown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      typeInTextarea(textarea, "  ");
    }

    // on parentheses, wrap selected text
    if (event.key === "(") {
      event.preventDefault();
      wrapSelectedText(textarea, "(", ")");
    }

    if (event.key === ")") {
      if (getCharacterAfterCursor(textarea) === ")") {
        event.preventDefault();
        moveSelection(textarea, 1);
      }
    }

    if (event.key === "'") {
      if (getCharacterAfterCursor(textarea) === "'") {
        moveSelection(textarea, 1);
      } else {
        wrapSelectedText(textarea, "'", "'");
      }

      event.preventDefault();
    }

    if (event.key === '"') {
      if (getCharacterAfterCursor(textarea) === '"') {
        moveSelection(textarea, 1);
      } else {
        wrapSelectedText(textarea, '"', '"');
      }

      event.preventDefault();
    }

    if (event.key === "{") {
      event.preventDefault();
      wrapSelectedText(textarea, "{", "}");
    }

    if (event.key === "}") {
      if (getCharacterAfterCursor(textarea) === "}") {
        event.preventDefault();
        moveSelection(textarea, 1);
      }
    }

    if (event.key === "[") {
      event.preventDefault();
      wrapSelectedText(textarea, "[", "]");
    }

    if (event.key === "]") {
      if (getCharacterAfterCursor(textarea) === "]") {
        event.preventDefault();
        moveSelection(textarea, 1);
      }
    }
  }

  $: precompiled = precompile(elements, locale);
  $: generatedType = generateType(elements);
</script>

<div class="not-prose mb-4 w-36 max-w-full">
  <label
    for="locale-input"
    class="block text-sm font-medium leading-6 text-gray-900">Locale</label
  >
  <div class="mt-2">
    <input
      type="text"
      name="locale"
      id="locale-input"
      placeholder="en-US"
      bind:value={locale}
      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
    />
  </div>
</div>

<div
  class="relative w-full h-56 overflow-auto not-prose bg-zinc-900 shadow-md rounded-md text-sm"
>
  <textarea
    bind:value={$message}
    bind:this={textarea}
    on:keydown={handleTextareaKeydown}
    use:shortcut={{
      trigger: [
        {
          key: "z",
          modifier: ["ctrl", "meta"],
          callback: (e) => {
            message.undo();
          },
          preventDefault: true,
        },
        {
          key: "z",
          modifier: [
            ["ctrl", "shift"],
            ["meta", "shift"],
          ],
          callback: (e) => {
            console.log("redo");
            message.redo();
          },
          preventDefault: true,
        },
      ],
    }}
    class="text-sm border-none p-4 min-w-full w-full max-w-none h-full absolute top-0 left-0 resize-none bg-transparent font-mono text-white whitespace-nowrap overflow-x-hidden"
  />
  <pre
    class="language-icu-message-format text-sm p-4 min-w-full max-w-none h-full absolute top-0 left-0 font-mono pointer-events-none select-none overflow-x-visible">{@html html}</pre>
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
