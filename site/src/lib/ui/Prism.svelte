<svelte:options immutable={true} />

<script>
  import Prism from "prismjs";
  import "$lib/prism.css";
  import "prismjs/components/prism-javascript.js";
  import "prismjs/components/prism-typescript.js";
  import "prismjs/components/prism-bash.js";
  import "prismjs/components/prism-yaml.js";
  Prism.manual = true;

  /** @type {any} */
  const prism_languages = Prism.languages;

  const GRAMMARS = {
    javascript: prism_languages.javascript,
    js: prism_languages.javascript,
    typescript: prism_languages.typescript,
    ts: prism_languages.typescript,
    bash: prism_languages.bash,
    html: prism_languages.html,
    svelte: prism_languages.html,
    yaml: prism_languages.yaml,
  };

  /**
   * Maps language names onto their prism names
   * @type {Record<keyof typeof GRAMMARS, string>}
   */
  const LANGUAGES = {
    javascript: "JavaScript",
    js: "JavaScript",
    typescript: "TypeScript",
    ts: "TypeScript",
    bash: "Bash",
    html: "HTML",
    svelte: "Svelte",
    yaml: "YAML",
  };

  /** @type {keyof typeof GRAMMARS}*/
  export let language;

  /** @type {string}*/
  export let code;

  $: html = Prism.highlight(code, GRAMMARS[language], LANGUAGES[language]);
</script>

<pre class="language-{LANGUAGES[language]}"><code
    class="language-{LANGUAGES[language]}">{@html html}</code
  ></pre>
