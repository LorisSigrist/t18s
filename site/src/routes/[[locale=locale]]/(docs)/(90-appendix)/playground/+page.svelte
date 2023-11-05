<script>
  import IcuMessageSyntaxEditor from "$lib/ui/ICU-Message-Syntax-Editor/IcuMessageSyntaxEditor.svelte";
  let value = "Hello World";

  /** @type {import("@sveltejs/kit").Snapshot<string>} */
  export const snapshot = {
    capture: () => value,
    restore: (storedValue) => (value = storedValue),
  };
</script>

<IcuMessageSyntaxEditor bind:value />
