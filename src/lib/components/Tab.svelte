<!--
@component

#### Tab
A generic component that renders the three unlocked, locked, and complete sections, with snippet items.

@param {Array<T>} complete An array of complete items
@param {Array<T>} locked An array of locked items
@param {Array<T>} unlocked An array of unlocked items
@param {Snippet<[T, ItemState]>} snippet The snippet of the item to display
-->

<script
  lang="ts"
  generics="T extends { name: string }"
>
  import type { Snippet } from 'svelte';

  import TabSection from '$lib/components/TabSection.svelte';
  import type { ItemState } from '$lib/types';

  interface Props {
    complete: Array<T>;
    locked: Array<T>;
    unlocked: Array<T>;
    snippet: Snippet<[T, ItemState]>;
  }

  interface Section {
    title: ItemState;
    items: Array<T>;
  }

  let { complete, locked, unlocked, snippet }: Props = $props();

  const sections: Array<Section> = $derived([
    {
      title: 'unlocked',
      items: unlocked
    },
    {
      title: 'locked',
      items: locked
    },
    {
      title: 'complete',
      items: complete
    }
  ]);
</script>

{#each sections as { title, items } (title)}
  <TabSection
    count={items.length}
    {title}
  >
    {#each items as item (item.name)}
      {@render snippet(item, title)}
    {/each}
  </TabSection>
{/each}
