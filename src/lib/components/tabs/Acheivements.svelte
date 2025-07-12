<script lang="ts">
  import TabSectionItem from '../TabSectionItem.svelte';

  import Tab from '$lib/components/Tab.svelte';
  import { achievementStore } from '$lib/stores/achievement.store.svelte';
  import type { Achievement, ItemState } from '$lib/types';

  interface Props {
    onUnlocked: (items: number) => void;
  }

  const { onUnlocked }: Props = $props();

  const { completeAchievements, incompleteAchievements, setAchievementComplete } = $derived(achievementStore);
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
  locked={incompleteAchievements}
  {snippet}
/>
