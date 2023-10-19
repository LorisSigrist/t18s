<script>
  /** @type {string}*/
  export let code;

  /** @type {string | null}*/
  export let language = null;
</script>


<pre class="rounded-md overflow-hidden relative bg-gray-50 text-gray-700 px-6 py-3 w-full">
<code class="language-{language}">{code}</code>
</pre>