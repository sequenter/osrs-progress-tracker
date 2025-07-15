<script lang="ts">
  import Tab from '$lib/components/Tab.svelte';
  import TabSectionItem from '$lib/components/TabSectionItem.svelte';
  import { achievementStore } from '$lib/stores/achievement.store.svelte';
  import type { Achievement, ItemState } from '$lib/types';

  interface Props {
    onUnlocked: (items: number) => void;
  }

  const { onUnlocked }: Props = $props();

  const { completeAchievements, lockedAchievements, unlockedAchievements, setAchievementComplete } = $derived(achievementStore);

  $effect(() => {
    onUnlocked(unlockedAchievements.length);
  });
</script>

{#snippet snippet({ diary, difficulty, icon, requirements, task }: Achievement, state: ItemState)}
  <TabSectionItem
    description={task}
    dialogTitle={task}
    title={diary}
    oncomplete={(isComplete: boolean) => setAchievementComplete(task, isComplete)}
    {difficulty}
    {icon}
    {requirements}
    {state}
  />
{/snippet}

<Tab
  complete={completeAchievements}
  locked={lockedAchievements}
  unlocked={unlockedAchievements}
  {snippet}
/>
