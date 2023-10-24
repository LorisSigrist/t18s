<script>
    import Prism from "prismjs"
    import "$lib/prism.css"
    import "prismjs/components/prism-javascript.js"
    import "prismjs/components/prism-typescript.js"
    import "prismjs/components/prism-bash.js"
    Prism.manual = true;

    const GRAMMARS = {
        //@ts-ignore
        "javascript" : Prism.languages.javascript,
        //@ts-ignore
        "typescript" : Prism.languages.typescript,
        //@ts-ignore
        "bash" : Prism.languages.bash,
        //@ts-ignore
        "html" : Prism.languages.html,
         //@ts-ignore
        "svelte" : Prism.languages.html,
    }

    /** @type {keyof typeof GRAMMARS}*/
    export let language;

     /** @type {string}*/
    export let code;

    $: html = Prism.highlight(code, GRAMMARS[language], language);
</script>

<svelte:options immutable={true} />
<pre class="language-{language}"><code class="language-{language}">{@html html}</code></pre>
