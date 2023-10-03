# Advanced Usage

## Route Matcher

A common pattern for locale based routing is to prefix the locale to the route. For example, `/en/home` and `/de/home`. In SvelteKit, having a route-param matcher to match the available locales is the best way to make sure that invalid routes correctly return a 404.

You can do this by adding a `locale` matcher.

```ts
//src/params/locale.js
import { locales } from "$t18s";
import { get } from "svelte/store";

/**
 * @param {any} param
 * @returns {param is import("$t18s").Locale}
 */
export const match = (param) => {
  return get(locales).includes(param);
};
```

You can then use `[locale=locale]/stuff` as a route.
