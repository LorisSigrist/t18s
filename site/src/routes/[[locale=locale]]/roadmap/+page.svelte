<script>
  import better_i18n_demo_gif from "./better-i18n-demo.gif";
</script>

<h1>Roadmap</h1>

<p>
  T18S is not done. There is still a lot we want to add. Here are some of our
  ideas for the future in no particular order.
</p>

<h2>Robustness</h2>
<p>
  T18S is still relatively new, and hasn't handled all the edge cases yet. This causes occasional 
  problems with the dev-server, reloading translations and other inconveniences. We want to make sure
  that t18s is as robust as possible and can deliver the best experience possible.
</p>


<h2>Support more File Formats</h2>
<p>
    There exists a wide range of file formats for translations. We want to support as many of them as possible
    in order to allow developers and translators to use the tools they are most comfortable with.
</p>

<h2>Built in Internationalized Routing</h2>
<p>
    SvelteKit currently doesn't offer a built in way to internationalize routes. It's left 
    to the developer to implement this. We want to provide a standard and straight forward 
    way to do this. Due to the complexity of the problem there are still a lot of open questions here,
    and there is a lot of experimenting left to be done.
</p>

<h2>Interactive Translation</h2>
<p>
  There are a few proof-of-concept tools & sites out there that push the
  boundary of how we interact with the things we build. One of those is
  <a
    href="https://github.com/versiobit/better-i18n-for-svelte"
    target="_blank"
    rel="noopener noreferrer">better-i18n-for-svelte</a
  >. It's a proof of concept for editing translations in your dev-browser
  directly, instead of files.
</p>

<img
  src={better_i18n_demo_gif}
  width="1100"
  height="700"
  loading="lazy"
  alt="Better i18n for Svelte allowing you to click on some text and edit it directly in the browser. The changes are then saved to disk."
/>

<p>
  We want to experiment with implementing features like this in t18s. There are a lot of open questions 
  with this though. How do we determine which text came from a translation? How do we handle variable interpolation
  in the editor, how do we add new translations? 
</p>

<p>
    Until we have answers to these questions, this will remain relatively low priority.
</p>
