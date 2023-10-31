<script context="module">
  import { browser } from "$app/environment";

  /**
   * @param {string} query
   */
  let search = async (query) => ({ results: [] });

  if (browser) {
    try {
      const pagefind = await import("" + "/pagefind/pagefind.js");
    } catch (e) {
      console.error(e);
    }

    search = async (query) => {
      return pagefind.search(query);
    };
  }
</script>

<script>
  import SearchIcon from "virtual:icons/heroicons/magnifying-glass";
  import SearchResult from "./SearchResult.svelte";
  export let query = "";

  $: resultsPromise = search(query);
</script>

<label
  class="flex gap-2 bg-gray-100 text-gray-800 pl-4 rounded-md items-center focus-within:ring-2 ring-orange-600"
>
  <SearchIcon class="text-gray-400 w-4 h-4 min-w-max" />
  <span class="sr-only">Search</span>
  <input
    type="text"
    bind:value={query}
    class="bg-transparent py-2 pe-2 focus-within:outline-none placeholder:text-gray-400"
    placeholder="Search"
  />
</label>

{#await resultsPromise}
  Loading Results
{:then resultObject}
  <ul>
    {#each resultObject.results as result}
      <li>
        {#await result.data()}
          Loading
        {:then data}
          <SearchResult link={data.url} title={data.meta.title} />
        {/await}
      </li>
    {/each}
  </ul>
{/await}
