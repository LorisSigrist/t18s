<script>
    export let link;
    export let title;


    $: href = link.split('.')[0];
</script>


<a {href}>{title}</a>