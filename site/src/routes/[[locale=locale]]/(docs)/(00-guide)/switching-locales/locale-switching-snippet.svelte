<script>
    import { locale } from "$t18s"
</script>

{#key $locale}
    <slot/>
{/key}