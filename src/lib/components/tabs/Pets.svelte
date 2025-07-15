<script lang="ts">
  import Tab from '$lib/components/Tab.svelte';
  import TabSectionItem from '$lib/components/TabSectionItem.svelte';
  import { petStore } from '$lib/stores/pet.store.svelte';
  import type { ItemState, Pet } from '$lib/types';

  interface Props {
    onUnlocked: (items: number) => void;
  }

  const { onUnlocked }: Props = $props();

  const { completePets, lockedPets, unlockedPets, setPetComplete } = $derived(petStore);

  $effect(() => {
    onUnlocked(unlockedPets.length);
  });
</script>

{#snippet snippet({ name, icon, requirements }: Pet, state: ItemState)}
  <TabSectionItem
    dialogTitle={name}
    title={name}
    oncomplete={(isComplete: boolean) => setPetComplete(name, isComplete)}
    {icon}
    {requirements}
    {state}
  />
{/snippet}

<Tab
  complete={completePets}
  locked={lockedPets}
  unlocked={unlockedPets}
  {snippet}
/>
