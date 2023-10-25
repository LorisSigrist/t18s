<script>
  import Callout from "$lib/ui/Callout.svelte";
  import CodeGroup from "$lib/ui/CodeGroup.svelte";
  import Prism from "$lib/ui/Prism.svelte";
</script>

<h1>Message Syntax</h1>
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
the braces will be replaced with whatever value you pass when using the message.

<CodeGroup let:Tab>
  <Tab><pre>Hello <mark>{"{fullName}"}</mark>, how are you?</pre></Tab>
</CodeGroup>

<p>
  You can specify that a value is not a string by adding a type-annotation in
  the curly braces. The known types are <code>number</code>, <code>date</code>,
  and <code>time</code>.
</p>

<CodeGroup let:Tab>
  <Tab>
    <pre>There are {"{"}count, <mark>number</mark>{"}"} people here</pre>
    <pre>Today is {"{"}date, <mark>date</mark>{"}"}</pre>
    <pre>Sarah shows up at {"{"}time, <mark>time</mark>{"}"}</pre>
  </Tab>
</CodeGroup>

You can format the value by adding a third, format options in the curly braces.
You can for example specify how long the date should be.

<CodeGroup let:Tab>
  <Tab
    ><pre>Today is {"{data, date"}<mark>, short</mark>{"}"}</pre>
    <pre>Today is {"{data, date"}<mark>, medium</mark>{"}"}</pre>
    <pre>Today is {"{data, date"}<mark>, long</mark>{"}"}</pre>
  </Tab>
</CodeGroup>

These formatting options are locale aware and will do the right thing for the
locale you are using. It uses the <code>Intl</code> API under the hood.
Generally the format for interpolating values is always this.

<ol>
  <li>Variable name</li>
  <li>Type</li>
  <li>Options</li>
</ol>

<p>
  The options that are available vary by type. You can find a list of all the
  options for each type in the <a
    href="https://unicode-org.github.io/icu/userguide/format_parse/messages"
    target="_blank"
    rel="noopener noreferrer">ICU MessageFormat</a
  >
  documentation. (We <b>do</b> support skeletons)
</p>

<h2>Plurals</h2>

<p>
  You can use pluralization to use different messages based on a number. This is
  useful for things like "1 person" vs "2 people".
</p>

<p>
  You can declare them by using the `plural` type and listing out the options.
</p>

<CodeGroup let:Tab>
  <Tab>
    <pre>{"{count, "}<mark>plural</mark
      >{", one {There is one person here} other {There are multiple people here}}"}</pre>
  </Tab>
</CodeGroup>

<p />

<p>You can also match an exact number by using an equals sign before it.</p>

<CodeGroup let:Tab>
  <Tab>
    <pre>{"{count, plural,"}<mark> =0</mark
      >{" {There is no one here} other {There is someone here}}"}</pre>
  </Tab>
</CodeGroup>

<p>
  You can use the number itself inside the message by using the <code>#</code> placeholder.
</p>

<CodeGroup let:Tab>
  <Tab>
    <pre>{"{count, plural, one {There is "}<mark>#</mark
    >{" person here} other {There are "}<mark>#</mark>{" people here}}"}</pre>
  </Tab>
</CodeGroup>

<Callout type="info">
  You can use further interpolation inside the plural messages. Nesting is
  allowed.
</Callout>

<h2>Select</h2>
<p>
  Select allows you to use one of multiple values based on a key. This is useful
  for grammatical gender.
</p>

<p>
  You use it by using the <code>select</code> type, and then listing out each option
  with a key and a value in curly braces.
</p>

<CodeGroup let:Tab>
  <Tab>
    <pre>Hello {"{gender, "}<mark>select</mark
    >{", male {Mr.} female {Mrs.}} {name}"}</pre></Tab
  >
</CodeGroup>

<p>
  The special key <code>other</code> is used as a fallback if no other key matches.
</p>

<CodeGroup let:Tab>
  <Tab>
    <pre>Hello {"{gender, select, male {Mr.} female {Mrs.} "}<mark
      >other{" {Mx.}"}</mark
    >{"} {name}"}</pre>
  </Tab>
</CodeGroup>

<Callout type="info">
  Some i18n libraries require you to define a fallback case for all selects.
  T18s does not, instead relying on typesafety to ensure all values match a key.
</Callout>

<h2>Selectordinal</h2>
Selectordinal are usefull for stuff like "1st" vs "2nd" vs "3rd". You use them similarly
to plural, but with the<code>selectordinal</code> type.

<CodeGroup let:Tab>
  <Tab>
    <pre>{"{count, "}<mark>selectordinal</mark
    >{", one {#st} two {#nd} few {#rd} other {#th}}"}</pre>
  </Tab>
</CodeGroup>

<Callout type="warning">
  This is not interchangeable with plural. For example, english will use the
  same ordianl for 1st and 21st.
</Callout>

<h2>Inline HTML</h2>
<p>
  Sometimes you want to dynamically insert HTML into your messages. You can do
  this by writing tags inside your messages. However, these tags aren't raw html,
  they too are translated. When formatting the message, you will need to pass in 
  a callback that takes in the text-content of the tag and returns the html you want to insert.
</p>

<CodeGroup let:Tab>
  <Tab>
    <pre>Go to our <mark>{"<homepageLink>"}</mark>Homepage<mark>{"</homepageLink>"}</mark></pre>
  </Tab>
</CodeGroup>

<CodeGroup let:Tab>
  <Tab>
    <Prism language="javascript" code={'$t("key", {homepageLink: (innerText) => `<a href="...">${innerText}</a>`})'} />
  </Tab>
</CodeGroup>

<Callout type="info">
  When you use messages containing HTML, don't forget to use svelte's {"{@html}"} directive to render them.
</Callout>


