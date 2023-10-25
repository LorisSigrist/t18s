<script>
    import { locale } from "$t18s";
    import { browser } from "$app/environment";
    $: if(browser) document.documentElement.lang = $locale;
</script>
  
<slot /> 