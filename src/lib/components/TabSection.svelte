<script lang="ts">
  import { clsx } from 'clsx';
  import type { Snippet } from 'svelte';

  import IconButton from '$lib/components/IconButton.svelte';

  import { mdiChevronDownCircle, mdiChevronUpCircle } from '@mdi/js';

  interface Props {
    count: number;
    title: string;
    children: Snippet;
  }

  const { count, title, children }: Props = $props();

  let isHidden = $state(false);
</script>

<div class="flex flex-col gap-4">
  <div class="flex items-center justify-between pb-4 border-b border-background-300 dark:border-background-700">
    <span class="capitalize text-2xl">{title}</span>

    <div class="flex items-center gap-4">
      <span class="text-base px-2 rounded-full text-black dark:text-white bg-gray-300 dark:bg-gray-800">{count}</span>

      <IconButton
        path={isHidden ? mdiChevronDownCircle : mdiChevronUpCircle}
        label={`${isHidden ? 'Show' : 'Hide'}`}
        onclick={() => {
          isHidden = !isHidden;
        }}
      />
    </div>
  </div>

  <div class={clsx('grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4', isHidden && 'hidden')}>
    {@render children()}
  </div>
</div>
