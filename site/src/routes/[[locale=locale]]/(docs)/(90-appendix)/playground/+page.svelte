<script>
  import IcuMessageSyntaxEditor from "$lib/ui/ICU-Message-Syntax-Editor/IcuMessageSyntaxEditor.svelte";
  let value = "Hello {fullName}";

  /** @type {import("@sveltejs/kit").Snapshot<string>} */
  export const snapshot = {
    capture: () => value,
    restore: (storedValue) => (value = storedValue),
  };
</script>

<h1>Playground</h1>

<p>
  Play around with the ICU Message Format and the T18S Compiler. 
  Getting a feel of what kind of code you are shipping is always a good idea, so 
  go write some absurdly complex messages and see what happens.
</p>

<IcuMessageSyntaxEditor bind:value />
