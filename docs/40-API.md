# API

## `init`

The `init` function is used to initialize `$t18s`. It must be called before any other functions are used. It takes an options object with the following properties:

- `initialLocale`: The initial locale to use. Defaults to `"en"`.
- `fallbackLocale`: The locale to use if a translation is missing. Defaults to `null`.
- `loadingDelay`: The delay in ms before `$isLoading` is set to `true`. Defaults to `200`.

## `$t`

The `$t` function is the main translation function. It takes a key and any required arguments and returns the translated string.

```ts
import { t } from "$t18s";

t("hello", { name: "World" }); // 'Hello World'
```

## `setLocale`

The `setLocale` function is used to change the current locale. It takes a locale string and returns a promise that resolves when the new locale is loaded.

```ts
import { setLocale } from "$t18s";

await setLocale("de");
```

## `$isLoading`

The `$isLoading` store tells us if we are currently waiting for a translation to load. This is useful if you want to show a loading indicator while switching languages.

```svelte
<script>
//+layout.svelte
  import { isLoading } from '$t18s';
</script>

{#if $isLoading}
  <p>Loading...</p>
{:else}
    <slot/>
{/if}
```

By default it operates on a short delay of 200ms. This is to prevent flickering of the loading indicator when switching languages quickly. You can change this delay by passing an option to `init`.

```ts
await init({
  loadingDelay: 500, // 500ms
});
```

## `$locale`

The `$locale` store contains the currently active locale. It is a writable store, so you can change the locale at runtime.

```ts
import { locale } from "$t18s";

locale.set("de");
```

## `$locales`

The `$locales` store contains all available locales. It is a readonly store.
During development, locales may be added or removed dynamically, but in production it will be static.

```ts
import { locales } from "$t18s";

console.log($locales); // ['en', 'de']
```
