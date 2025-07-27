<!--
@component

#### Tab
A generic component that renders the three unlocked, locked, and complete sections, with snippet items.

@param {Array<T>} complete An array of complete items
@param {Array<T>} locked An array of locked items
@param {Array<T>} unlocked An array of unlocked items
@param {string} userKey The key to use when interacting with the user store
@param {Snippet<[T, ItemState]>} snippet The snippet of the item to display
-->

<script
  lang="ts"
  generics="T extends { name: string, isOnHold: boolean }"
>
  import type { Snippet } from 'svelte';

  import TabSection from '$lib/components/TabSection.svelte';
  import type { ItemState } from '$lib/types';
  import { bifilter } from '$lib/util/array';

  interface Props {
    complete: Array<T>;
    locked: Array<T>;
    unlocked: Array<T>;
    userKey: string;
    snippet: Snippet<[T, ItemState]>;
  }

  interface Section {
    itemState: ItemState;
    items: Array<T>;
  }

  let { complete, locked, unlocked, userKey, snippet }: Props = $props();

  const [unlockedItems, onHoldItems] = $derived(bifilter(unlocked, ({ isOnHold }) => isOnHold));

  const sections: Array<Section> = $derived([
    {
      itemState: 'unlocked',
      items: unlockedItems
    },
    {
      itemState: 'onhold',
      items: onHoldItems
    },
    {
      itemState: 'locked',
      items: locked
    },
    {
      itemState: 'complete',
      items: complete
    }
  ]);
</script>

{#each sections as { itemState, items } (itemState)}
  <TabSection
    count={items.length}
    {itemState}
    {userKey}
  >
    {#each items as item (item.name)}
      {@render snippet(item, itemState)}
    {/each}
  </TabSection>
{/each}
