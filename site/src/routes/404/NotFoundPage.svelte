<script>
    import GithubIcon from "virtual:icons/simple-icons/github";
  </script>
  
  <svelte:head>
      <meta name="robots" content="noindex, nofollow">
      <title>Page Not Found</title>
  </svelte:head>
  
  <main
    class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
  >
    <div class="text-center">
      <p class="text-base font-semibold text-orange-600">404</p>
      <h1
        class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
      >
        Page not found
      </h1>
      <p class="mt-6 text-base leading-7 text-gray-600">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="/"
          class="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >Go back home</a
        >
        <a
          href="https://github.com/LorisSigrist/t18s/issues/new"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm font-semibold text-white bg-black hover:bg-zinc-950 px-3.5 py-2.5 rounded-md flex gap-2 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <GithubIcon class="w-4 h-4 min-w-max" />
          Report Issue</a
        >
      </div>
    </div>
  </main>
  
  <style lang="postcss">
    :global(html, body) {
      @apply h-full w-full;
    }
  </style>
  