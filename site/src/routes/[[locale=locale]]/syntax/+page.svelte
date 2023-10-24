<script>
  import Callout from "$lib/ui/Callout.svelte";
  import CodeGroup from "$lib/ui/CodeGroup.svelte";
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
You can interpolate strings into your messages using curly braces. The value inside
the braces will be replaced with the value of the variable with the same name.

<CodeGroup let:Tab>
  <Tab>Hello <mark>{"{fullName}"}</mark>, how are you?</Tab>
</CodeGroup>

You can specify that a value is a number by adding a type-annotation in the
curly braces.

<CodeGroup let:Tab>
  <Tab>There are {"{"}count<mark>, number</mark>{"}"} people here</Tab>
</CodeGroup>

The same thing works for dates.

<CodeGroup let:Tab>
  <Tab>Today is {"{"}date<mark>, date</mark>{"}"}</Tab>
</CodeGroup>

You can format the value by adding a third, format options in the curly braces.
You can for example specify how long the date should be.

<CodeGroup let:Tab>
  <Tab>Today is {"{data, date"}<mark>, short</mark>{"}"}</Tab>
</CodeGroup>

These formatting options are locale aware and will do the right thing for the
locale you are using. It uses the <code>Intl</code> API under the hood.
Generally the format for interpolating values is always this.
<ol>
  <li>Variable name</li>
  <li>Type</li>
  <li>Options</li>
</ol>

<h2>Plurals</h2>

<h2>Select</h2>
<p>
  Select allows you to use one of multiple values based on a key. This is useful
  for things like grammatical gender.
</p>

<p>
  You use it by using the <code>select</code> type, and then listing out each option
  with a key and a value in curly braces.
</p>

<CodeGroup let:Tab>
  <Tab>
    Hello {"{gender, select, male {Mr.} female {Mrs.}} {name}"}</Tab
  >
</CodeGroup>

<p>
  The special key <code>other</code> is used as a fallback if no other key matches.
</p>

<CodeGroup let:Tab>
  <Tab>
    Hello {"{gender, select, male {Mr.} female {Mrs.} "}<mark
      >other{" {Mx.}"}</mark
    >{"} {name}"}
  </Tab>
</CodeGroup>

<Callout type="info">
  Some i18n libraries require you to define a fallback case for all selects.
  T18s does not, instead relying on typesafety to ensure all values match a key.
</Callout>

<h2>Inline HTML</h2>

<Callout type="warning">
  You cannot use any additional values inside tags.
</Callout>
