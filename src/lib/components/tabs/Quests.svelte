<script lang="ts">
  import Tab from '$lib/components/Tab.svelte';
  import TabSectionItem from '$lib/components/TabSectionItem.svelte';
  import { questStore } from '$lib/stores/quest.store.svelte';
  import type { ItemState, Quest } from '$lib/types';

  interface Props {
    onUnlocked: (items: number) => void;
  }

  const { onUnlocked }: Props = $props();

  const { completeQuests, lockedQuests, unlockedQuests, setQuestComplete, setQuestOnHold } = $derived(questStore);

  $effect(() => {
    onUnlocked(unlockedQuests.filter(({ isOnHold }) => !isOnHold).length);
  });
</script>

{#snippet snippet({ name, difficulty, icon, length, release, requirements, rewards }: Quest, state: ItemState)}
  <TabSectionItem
    description={`${release}, ${length}`}
    dialogTitle={name}
    title={name}
    oncomplete={(isComplete) => setQuestComplete(name, isComplete)}
    onhold={(isOnHold) => setQuestOnHold(name, isOnHold)}
    {difficulty}
    {icon}
    {requirements}
    {rewards}
    {state}
  />
{/snippet}

<Tab
  complete={completeQuests}
  locked={lockedQuests}
  unlocked={unlockedQuests}
  userKey="quests"
  {snippet}
/>
