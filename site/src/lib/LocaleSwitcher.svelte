<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { isLocale, locale, locales, preloadLocale, t } from "$t18s";
  import { resolveTranslatedPath } from "./i18n";

  /** @param {import("$t18s").Locale} newLocale */
  async function handleLocaleChange(newLocale) {
    await preloadLocale(newLocale);
    goto(resolveTranslatedPath($page.route.id ?? "", newLocale, $page.params), {
      replaceState: true,
      keepFocus: true,
      noScroll: true,
    });
  }

  /** @param {Event} e */
  function handleSelectChange(e) {
    if (!e.target || !(e.target instanceof HTMLSelectElement)) return;
    if (!isLocale(e.target.value)) return;
    handleLocaleChange(e.target.value);
  }
</script>

<select value={$locale} on:change={handleSelectChange}>
  {#each locales as availableLocale}
    <option value={availableLocale} selected={$locale == availableLocale}>
      {$t(`language.${availableLocale}`)}
    </option>
  {/each}
</select>
