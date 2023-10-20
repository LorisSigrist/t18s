<script>
    /** @type {string}*/
    export let title ="";
    export let seletctedIndex = 0;
</script>

<div class="flex min-h-[calc(theme(spacing.12)+1px)] flex-wrap items-start gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4 dark:border-zinc-800 dark:bg-transparent">

    {#if title}
      <h3 class="mr-auto pt-3 text-xs font-semibold text-white">
        {title}
      </h3>
    {/if}

    <!--

    {hasTabs && (
      <Tab.List className="-mb-px flex gap-4 text-xs font-medium">
        {Children.map(children, (child, childIndex) => (
          <Tab
            className={clsx(
              'border-b py-3 transition ui-not-focus-visible:outline-none',
              childIndex === selectedIndex
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-300',
            )}
          >
            {getPanelTitle(isValidElement(child) ? child.props : {})}
          </Tab>
        ))}
      </Tab.List>
    )}
    -->
  </div>