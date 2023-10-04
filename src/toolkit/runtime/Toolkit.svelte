<script lang="ts">
  function test() {
      if(import.meta.hot) {
        import.meta.hot.send("t18s:test", {});
      }
  }
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="t18s-toolkit" on:click={test}>
  t18s
</div>

<style>
  .t18s-toolkit {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 10000;


    width: 2rem;
    height: 2rem;

    background-color: white;
    border: 1px solid blue;
    border-radius: 0.25rem;
  }
</style>
