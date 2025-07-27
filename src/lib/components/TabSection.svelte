<!--
@component

#### TabSection
A component that renders a section within an unlocked/locked/complete section within a tab. Also displays an item count, and provides a 
control to hide/show the section.

@param {number} count Total count of the items
@param {string} title The title of the sectiom
@param {string} userKey The key to use when interacting with the user store
@param {Snippet} children Items to display within the section
-->

<script lang="ts">
  import { clsx } from 'clsx';
  import type { Snippet } from 'svelte';

  import IconButton from '$lib/components/IconButton.svelte';
  import { userStore } from '$lib/stores/user.store.svelte';
  import type { ItemState } from '$lib/types';

  import { mdiChevronDownCircle, mdiChevronUpCircle } from '@mdi/js';

  interface Props {
    count: number;
    itemState: ItemState;
    userKey: string;
    children: Snippet;
  }

  const { count, itemState, userKey, children }: Props = $props();

  const { isSectionHidden, setIsSectionHidden } = $derived(userStore);

  let isHidden = $derived(isSectionHidden(`${userKey}:${itemState}`));
</script>

<div class="flex flex-col gap-4">
  <div class="flex items-center justify-between pb-4 border-b border-background-300 dark:border-background-700">
    <span class="capitalize text-2xl">{itemState === 'onhold' ? 'On Hold' : itemState}</span>

    <div class="flex items-center gap-4">
      <span class="text-base px-2 rounded-full text-black dark:text-white bg-gray-300 dark:bg-gray-800">{count}</span>

      <IconButton
        path={isHidden ? mdiChevronDownCircle : mdiChevronUpCircle}
        label={`${isHidden ? 'Show' : 'Hide'}`}
        onclick={() => setIsSectionHidden(`${userKey}:${itemState}`, !isHidden)}
      />
    </div>
  </div>

  <div class={clsx('grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4', (isHidden || count === 0) && 'hidden')}>
    {@render children()}
  </div>
</div>
