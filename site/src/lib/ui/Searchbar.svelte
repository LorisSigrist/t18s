<script>
  import SearchIcon from "virtual:icons/heroicons/magnifying-glass";
  export let query = "";
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
