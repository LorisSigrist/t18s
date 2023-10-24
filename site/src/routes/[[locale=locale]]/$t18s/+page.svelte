<script>
  import CodeGroup from "$lib/ui/CodeGroup.svelte";
  import Prism from "$lib/ui/Prism.svelte";
  import locale_param_matcher_snippet from "./locale-param-matcher-snippet.js?raw";
</script>

<h1>$t18s Reference</h1>
<p>
  The `$t18s` module contains all runtime code for t18s. It is how you interact
  with the library.
</p>

<h2><code>type Locale</code></h2>
<p>A union type of all the locales you have registered with t18s.</p>

<CodeGroup let:Tab>
  <Tab>
    <Prism language="typescript" code={'type Locale = "en" | "de";'} />
  </Tab>
</CodeGroup>

<h2><code>locales</code></h2>
<p>
  An array of all the locales you have registered with t18s. Useful for places
  where you need to iterate over all locales, such as Locale Switchers or SEO.
</p>

<h2><code>$locale</code> Store</h2>
<p>A writable store containing the currently active locale.</p>

<CodeGroup let:Tab>
  <Tab>
    <Prism language="typescript" code="const locale = Writable<Locale>;" />
  </Tab>
</CodeGroup>

<h2><code>isLocale</code></h2>
<p>
  A convenience function for checking if something is a valid locale or not.
  Only the locales that are registered with t18s are considered valid.
</p>

<CodeGroup let:Tab>
  <Tab>
    <Prism
      language="typescript"
      code="const isLocale = (thing: any) => thing is Locale;"
    />
  </Tab>
</CodeGroup>

<p>It is useful for quickly creating a param matcher for locales.</p>

<CodeGroup let:Tab let:Header>
  <Header title="src/params/locale.js" />
  <Tab>
    <Prism language="javascript" code={locale_param_matcher_snippet} />
  </Tab>
</CodeGroup>

<h2><code>setLocale</code></h2>
<p>Sets the current locale. Useful for Locale Switchers.</p>

<h2><code>$t</code> Store</h2>

The main store through which you interact with t18s. It contains a function that
will return a translated string for a given key.

<CodeGroup let:Tab>
  <Tab>
    <Prism
      language="typescript"
      code="Readable<(key: string, values: ✨inferred✨) => string>"
    />
  </Tab>
</CodeGroup>

You need to pass it a key and depending on the message an object of values to
interpolate into.

<CodeGroup let:Tab let:Header>
  <Header title="Example" />
  <Tab name="Svelte">
    <Prism
      language="typescript"
      code={"$t('greeting', { fullName: 'John Doe' })"}
    />
  </Tab>
  <Tab name="en.yaml">
    <Prism language="yaml" code={"greeting: Hello, {fullName}!"} />
  </Tab>
</CodeGroup>

<h2><code>preloadLocale</code></h2>
<p>
  Preloads any messages that are needed for the given locale. Call this before
  trying to display any messages to avoid a flash of fallbacks. This is usually
  done in `+page.js` files.
</p>

<CodeGroup let:Tab>
  <Tab>
    <Prism language="typescript" code="(locale: Locale) => Promise<void>" />
  </Tab>
</CodeGroup>

<h2><code>const fallbackLocale</code></h2>
<p>
  The fallback locale you specified in your config, or null if you don't specify one. Will be definitely
  typed based on your config.
</p>

<CodeGroup let:Tab>
  <Tab>
    <Prism language="typescript" code="const fallbackLocale: Locale | null; //will be one or the other based on your config" />
  </Tab>
</CodeGroup>
