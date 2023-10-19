<script>
  import { t } from "$t18s";
  import Hero from "./Hero.svelte";
</script>

<Hero />

{#each { length: 300 } as _}
  <h1>{$t("hello")}</h1>
{/each}
