<script lang="ts">
  import TabSectionItem from '../TabSectionItem.svelte';

  import Tab from '$lib/components/Tab.svelte';
  import { achievementStore } from '$lib/stores/achievement.store.svelte';
  import { skillStore } from '$lib/stores/skill.store.svelte';
  import type { Achievement, ItemState } from '$lib/types';
  import { bifilter, isFulfilled } from '$lib/util/array';

  interface Props {
    onUnlocked: (items: number) => void;
  }

  const { onUnlocked }: Props = $props();

  const { completeAchievements, lockedAchievements, unlockedAchievements, setAchievementComplete } = $derived(achievementStore);

  $effect(() => {
    onUnlocked(unlockedAchievements.length);
  });
</script>

{#snippet snippet({ diary, difficulty, icon, task }: Achievement, state: ItemState)}
  <TabSectionItem
    description={task}
    title={diary}
    oncomplete={(isComplete: boolean) => setAchievementComplete(task, isComplete)}
    {difficulty}
    {icon}
    {state}
  />
{/snippet}

<Tab
  complete={completeAchievements}
  locked={lockedAchievements}
  unlocked={unlockedAchievements}
  {snippet}
/>
