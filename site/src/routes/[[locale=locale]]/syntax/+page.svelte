<script>
  import Callout from "$lib/ui/Callout.svelte";
</script>

<h1>Syntax</h1>
<p>
  T18s uses the <a
    href="https://unicode-org.github.io/icu/userguide/format_parse/messages"
    target="_blank"
    rel="noopener noreferrer">ICU MessageFormat</a
  > Syntax for messages, the de-facto standard in the JavaScript ecosystem. Let's
  learn how to use it.
</p>

<h2>Interpolating Values</h2>

<h2>Plurals</h2>

<h2>Select</h2>
Select allows you to use one of multiple values based on a key. This is useful
for things like grammatical gender.

<code>
Hello {"{gender, select, male {Mr.} female {Mrs.}}"} {"{name}"}
</code>

The special key <code>other</code> is used as a fallback if no other key matches.

<Callout type="info">
  Some i18n libraries require you to define a fallback case for all selects. 
  T18s does not, instead relying on typesafety to ensure all values match a key. 
</Callout>

<h2>Inline HTML</h2>

<Callout type="warning">
  You cannot use any additional values inside tags.
</Callout>
