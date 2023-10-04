# Internationalized Routing

Out of the box, `t18s` only provides message translations. It does not hold any opinions on how you should resolve a user's locale. This is up to you. Here are some common patterns:

- a) `/en/page`, `/de/page` - Each locale has it's own subroute
- b) `/page`, `/de/page` - The default locale is in the root, with each secondary locale getting it's own subroute.
- c) `/page?lang=en`, `/page?lang=de` - Using a query parameter for the language
- d) `/page#en`, `/page#de` - Using a hash for the language.
- e) `/page` - No locale in the url. The locale is determined by the browser's `Accept-Language` header, or cookies.

Patterns `c` and `d` are not recommended, since they do not work with Prerendering, and may cause issues with SSR. So in this guide, we will focus on patterns `a` and `b`.

## Pattern A: Each locale has it's own subroute
TODO

### Redirecting from "/"

We can add a `+server.js` file to the root of our project to redirect from `/` to an initial locale.

```js
// src/routes/+server.js

export function GET() {
  const locale = getInitialLocaleSomehow(); //You're on your own here
  throw redirect(302, `/${locale}`);
}
```

This even works with prerendering, as long as the user has JS enabled.

### Updating the locale client side
`t18s` can update any translated messages in place. A page reload is not required.
However, if you are switching locales, you will want to update the locale in the url to match. That way the locale isn't lost on a page refresh.

Not only that, but you will probably want to update all urls in the history to match the new locale.

#### Updating the url

TODO

#### Rerunning Load Functions

Some `load` functions may depend on the locale. For example, if you are loading a list of blog posts, you may want to load the posts in the current locale. We can cause the load function to rerun by calling `invalidate` whenever the `$locale` store changes.

```ts
import { invalidate } from "$app/stores";
import { locale } from "$t18s";

locale.subscribe(() => invalidate("t18s:locale"));
```

In any load function that depends on the locale, we can use `depends` to make sure it reruns when the locale changes.

```ts
export async function load({ depends }) {
    depends('t18s:locale');
    return { ... }
}
```

## SEO & Prerendering

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