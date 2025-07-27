<script lang="ts">
  import { clsx } from 'clsx';

  import IconButton from '../IconButton.svelte';

  import IconWiki from '$lib/components/IconWiki.svelte';
  import Tab from '$lib/components/Tab.svelte';
  import TabSectionItem from '$lib/components/TabSectionItem.svelte';
  import { collectionStore } from '$lib/stores/collection.store.svelte';
  import type { Collection, ItemState } from '$lib/types';

  import { mdiCheckCircle, mdiCloseCircle } from '@mdi/js';

  interface Props {
    onUnlocked: (items: number) => void;
  }

  const { onUnlocked }: Props = $props();

  const {
    completeCollections,
    lockedCollections,
    unlockedCollections,
    setCollectionComplete,
    setCollectionItemComplete,
    setCollectionOnHold
  } = $derived(collectionStore);

  $effect(() => {
    onUnlocked(unlockedCollections.filter(({ isOnHold }) => !isOnHold).length);
  });
</script>

{#snippet snippet({ collection, icon, items, name, requirements }: Collection, state: ItemState)}
  <TabSectionItem
    dialogTitle={collection || name}
    title={collection || name}
    oncomplete={(isComplete) => setCollectionComplete(name, isComplete)}
    onhold={(isOnHold) => setCollectionOnHold(name, isOnHold)}
    difficulty={`${items.filter(({ isComplete }) => isComplete).length}/${items.length}`}
    {icon}
    {requirements}
    {state}
  >
    <div class="flex flex-col gap-2 grow max-h-32 pr-4 overflow-y-scroll">
      {#each items as { icon, isComplete, name: itemName } (itemName)}
        <div class="flex items-center justify-between p-1 gap-2 rounded-md w-full bg-background-200 dark:bg-background-900">
          <div class={clsx('flex items-center gap-2 min-w-0', isComplete && 'opacity-30')}>
            <div class="flex justify-center w-6">
              <IconWiki icon={icon || itemName} />
            </div>

            <span class="text-lg overflow-hidden text-ellipsis whitespace-nowrap text-black dark:text-yellow-300">{itemName}</span>
          </div>

          {#if state !== 'locked'}
            <IconButton
              label={`Mark as ${isComplete ? 'incomplete' : 'complete'}`}
              path={isComplete ? mdiCloseCircle : mdiCheckCircle}
              onclick={() => setCollectionItemComplete(name, itemName, !isComplete)}
            />
          {/if}
        </div>
      {/each}
    </div>
  </TabSectionItem>
{/snippet}

<Tab
  complete={completeCollections}
  locked={lockedCollections}
  unlocked={unlockedCollections}
  {snippet}
/>
