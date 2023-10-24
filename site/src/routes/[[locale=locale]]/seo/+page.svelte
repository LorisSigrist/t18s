<script>
  import CodeGroup from "$lib/ui/CodeGroup.svelte";
  import Prism from "$lib/ui/Prism.svelte";
  import link_rel_alternate_snippet from "./link-rel-alternate-snippet.html?raw";
  import x_default_snippet from "./x-default-snippet.html?raw";
  import app_template_snippet from "./app-template-snippet.html?raw";
  import hooks_server_js_snippet from "./hooks-server-js-snippet.js?raw";
  import browser_locale_switching_snippet from "./browser-locale-switching-snippet.svelte?raw";
  import a_hreflang_snippet from "./a-hreflang-snippet.html?raw";
  import Callout from "$lib/ui/Callout.svelte";
</script>
<h1>SEO</h1>
<p>
    There are quite a few SEO related things you need to keep in mind when developing
    a multi-language site. This page will give you a quick overview of the most important ones.
</p>


<h2>Alternate Links</h2>
<p>
    Alternate links are a way to tell search engines that a page exists in multiple languages, 
    and where to find them. This is done by adding a link tag to the head of your page.
</p>


<p>
    You should add a link tag for each language your site is available in, including the 
    one the page is currently in. 
</p>

<CodeGroup let:Tab>
    <Tab>
        <Prism language="html" code={link_rel_alternate_snippet} />
    </Tab>
</CodeGroup>

<p>
    If you have a <i>"default lanugage"</i> that you want to use when the user's language is not available,
    you should add a link tag with the <code>hreflang</code> attribute set to <code>x-default</code>. This 
    tells search engines that this is the default language.
</p>

<CodeGroup let:Tab>
    <Tab>
        <Prism language="html" code={x_default_snippet} />
    </Tab>
</CodeGroup>


<h2>Locale Switchers</h2>
<p>
    It is recommended that you use <code>a</code> tags for your locale switchers. This is because
    search engines and the SvelteKit prerenderer will follow these links, and index the pages they lead to. They
    also work if JavaScript is disabled.
</p>

<p>
    But, we need to make sure to tell the search engines that these links just lead to the same page
    in a different language, not separate pages. We do this by adding an <code>hreflang</code> attribute.
</p>



<CodeGroup let:Tab>
    <Tab>
        <Prism language="html" code={a_hreflang_snippet} />
    </Tab>
</CodeGroup>


<h2>The Lang Attribute</h2>
<p>
    Browsers determine the page's language by looking at the <code>lang</code> attribute on the <code>html</code> tag.
    We need to make sure that this attribute is set to the correct language, both during server rendering,
    and when switching languages on the client.
</p>


<h3>On the Server</h3>

<p>
    SvelteKit offers a relatively simple way to set the <code>lang</code> attribute during server rendering.
    We can set it in a hook.
</p>

<p>
    In the app template, let's add a placeholder string in the <code>lang</code> attribute.
</p>

<CodeGroup let:Header let:Tab>
    <Header title="src/app.html" />
    <Tab>
        <Prism language="html" code={app_template_snippet} />
    </Tab>
</CodeGroup>

<p>
    Then in the server <code>handle</code> hook, we can replace it with the correct language.
</p>

<CodeGroup let:Header let:Tab>
    <Header title="src/hooks.server.js" />
    <Tab>
        <Prism language="javascript" code={hooks_server_js_snippet} />
    </Tab>
</CodeGroup>

<h3>On the client</h3>

<p>
    T18S does not do a full page reload when switching languages, so we need to make sure that the <code>lang</code> attribute
    gets set correctly when switching languages on the client.
</p>

<p>
    In the root layout. Check that we are in the browser, 
    and then reactively set the <code>lang</code> attribute base on the <code>$locale</code> store exported
    by T18S.
</p>

<CodeGroup let:Header let:Tab>
    <Header title="src/routes/+layout.svelte" />
    <Tab>
        <Prism language="svelte" code={browser_locale_switching_snippet} />
    </Tab>
</CodeGroup>

<Callout type="info">
    This may become built in behavior in the future, depending on feedback. Old
    code probably won't break, so you can add this now without worrying about it.
</Callout>