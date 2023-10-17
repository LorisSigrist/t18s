<script>
  import Icon from "./Icon.svelte";
  import { onMount } from "svelte";

  let left = 0;
  let top = 0;

  const update = (e) => {
    left = e.clientX;
    top = e.clientY;
  };

  onMount(()=>{
    const html = document.querySelector("html");
    html?.addEventListener("pointermove", update);
    html?.addEventListener("pointerenter", update);
    html?.addEventListener("pointerleave", update);

    ()=> {
        html?.removeEventListener("pointermove", update);
        html?.removeEventListener("pointerenter", update);
        html?.removeEventListener("pointerleave", update);
    }
  })
</script>

<div
  class="cursor"
  style:--t18s-cursor-left="{left}px"
  style:--t18s-cursor-top="{top}px"
>
  <Icon />
</div>

<style>
  .cursor {
    position: fixed;
    z-index: 10000;

    cursor: none;

    top: var(--t18s-cursor-top);
    left: var(--t18s-cursor-left);

    pointer-events: none;
    transform: translate(30%, 30%) scale(0.7);
  }
</style>
