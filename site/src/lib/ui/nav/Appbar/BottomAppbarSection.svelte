<script>
    import Link from "./BottomAppbarLink.svelte"
    import Heading from "./BottomAppbarSectionHeading.svelte"
</script>

<div class="grid">
    <slot {Link} {Heading} />
</div>