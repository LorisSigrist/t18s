<script>
  import { resolveTranslatedPath } from "$lib/i18n";
  import { locales, locale } from "$t18s";
  import { page } from "$app/stores";
  import { merge } from "$lib/utils/class-merge";

  import * as t from "$t18s/messages";
</script>

<div class="flex gap-4">
  {#each locales as availableLocale}
    <a
      href={resolveTranslatedPath(
        $page.route.id ?? "",
        availableLocale,
        $page.params
      )}
      data-sveltekit-reload
      class={merge(
        $locale === availableLocale ? "font-bold" : "font-normal",
        "text-gray-950"
      )}>{t.languages[availableLocale]()}</a
    >
  {/each}
</div>
