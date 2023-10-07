# Internationalized Routing

Out of the box, `t18s` only provides message translations. It does not hold any opinions on how you should resolve a user's locale. This is up to you. Here are some common patterns:

- a) `/en/page`, `/de/page` - Each locale has it's own subroute
- b) `/page`, `/de/page` - The default locale is in the root, with each secondary locale getting it's own subroute.
- c) `/page?lang=en`, `/page?lang=de` - Using a query parameter for the language
- d) `/page#en`, `/page#de` - Using a hash for the language.
- e) `/page` - No locale in the url. The locale is determined by the browser's `Accept-Language` header, or cookies.

Patterns `c` and `d` are not recommended, since they do not work with Prerendering, and may cause issues with SSR.
Pattern `e` is also suboptimal. It requires a Server, and different users visiting the same url may see different content. This is bad for SEO. (It may be appropriate for App-like sites, but it's a bad default)

So in this guide, we will focus on patterns `a` and `b`.

## Handling the Locale in the URL

### Adding a Locale Route Parameter

SvelteKit makes dynamic routes easy. We can just add a route parameter `lang` to our routes.

```
src/routes
├── +layout.js
├── [locale]
│   ├── +page.svelte
```

In `+layout.js` we can `init` `t18s` using the locale from the url.

```js
// src/routes/+layout.js
import { init } from "$t18s";

export async function load({ page }) {
  await init({ initialLocale: page.params.locale });
}
```

But this isn't perfect yet. It does not enforce that the `lang` route parameter is a valid locale. We can fix that by adding a matcher.

```js
// src/params/locale.js
import { isLocale } from "$t18s";
export const match = isLang;
```

Then we can use it in our route.

```
src/routes
├── +layout.js
├── [locale=locale]
│   ├── +page.svelte
```

Now we correctly `404` on invalid locales.

### Redirecting from "/"

Unless you are using pattern `b`, you will want to redirect from `/` to an initial locale.
We can add a `+server.js` file to the root of our project to redirect from `/` to an initial locale.

```js
// src/routes/+server.js

export function GET() {
  const locale = getInitialLocaleSomehow(); //You're on your own here
  throw redirect(302, `/${locale}`);
}
```

> This approach does actually work with prerendering. Even if JS is disabled!
> SvelteKit will generate an `index.html` for the root, which contains a meta refresh tag that redirects to the initial locale.

### Updating the locale client side - Without a page reload

`t18s` can update any translated messages in place. A page reload is not required.
However, depending on how complex your app is, simply doing a page reload may be the easiest solution. If you really want to avoid a page reload, read on.

#### Updating the url

If you are switching locales, you will want to update the locale in the url to match. That way the locale isn't lost on a page refresh.

SvelteKit currently does not offer a great way to do this without causing a full rerender of the page. It's probably best to use `history.replaceState` directly.

You will need to write a url-locale-replacement function. Here is an example:

```js
// src/routes/+layout.js
import { locale } from "$t18s";
import { browser } from "$app/environment";

function setLocaleInUrl(url, newLocale) {
  //up to you to implement this
}

//after init
if (browser) {
  locale.subscribe((newLocale) => {
    const newPath = setLocaleInUrl(new URL(window.location.href), newLocale);
    history.replaceState({}, "", newPath);
  });
}
```

I really hope SvelteKit offers a better way to do this in the future.

#### Rerunning Load Functions

Some `load` functions may depend on the locale. For example, if you are loading a list of blog posts, you may want to load the posts in the current locale. We can cause the load function to rerun by calling `invalidate` whenever the `$locale` store changes.

```ts
// src/routes/+layout.js
import { invalidate } from "$app/stores";
import { locale } from "$t18s";
import { browser } from "$app/environment";

//after init
if (browser) locale.subscribe(() => invalidate("t18s:locale"));
```

In any load function that depends on the locale, we can use `depends` to make sure it reruns when the locale changes.

```ts
export async function load({ depends }) {
    depends('t18s:locale');
    return { ... }
}
```

## SEO & Prerendering

### Setting the `lang` attribute on `<html>`

This is fairly straight forward. In `src/app.html`, replace the attribute with a string-placeholder of your choosing.

```html
<html lang="%lang%">
  <!-- ... --->
</html>
```

Then, in your server hook, replace it with the actual locale.

```js
// src/hooks.server.js
import { isLocale } from "$t18s";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const locale = event.url.pathname.split("/")[1];

  const response = await resolve(event, {
    transformPageChunk({ html }) {
      if (!isLocale(locale)) return html;
      html = html.replace("%lang%", locale);
      return html;
    },
  });
  return response;
}
```

### Linking to other locales

For both SEO and Prerendering reasons, it's important that each page links to it's translated counterparts.
We can reuse our url locale replacement logic to generate the correct links.

In your root layout you can add this:

```svelte
<script>
    import { locales } from "$t18s"
    import { page } from "$app/stores";

    //Your url locale replacement logic
    import { setLocaleInUrl } from "$lib/i18n.js";
</script>

<svelte:head>
    {#each $locales as locale}
        <link
            rel="alternate"
            hreflang={locale}
            href={setLocaleInUrl($page.url, locale)}
        />
    {/each}
</svelte:head>

<slot/>
```

This is great for prerendering, since the crawler will discover any alternate language pages on it's own.

## What about Blog Posts?

For text-heavy sites, like Blog posts or about pages, where pretty much everything is translated, the key-value approach of `t18s` is not ideal. Instead, I recommend you create a component for each version of the page, and use the `$locale` store to pick one.

```
src/routes/blog/post
├── +page.svelte
├── de.svelte
└── en.svelte
```

```svelte
<!-- src/routes/blog/post/+page.svelte -->
<script>
  import { locale } from "$t18s";
  import En from "./en.svelte";
  import De from "./de.svelte";
</script>

{#if $locale === "de"}
  <De/>
{:else }
  <!-- Do the fallback locale last, so that it's the default -->
  <En/>
{/if}
```
