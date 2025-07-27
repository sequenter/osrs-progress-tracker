<script lang="ts">
  import Tab from '$lib/components/Tab.svelte';
  import TabSectionItem from '$lib/components/TabSectionItem.svelte';
  import { achievementStore } from '$lib/stores/achievement.store.svelte';
  import type { Achievement, ItemState } from '$lib/types';

  interface Props {
    onUnlocked: (items: number) => void;
  }

  const { onUnlocked }: Props = $props();

  const { completeAchievements, lockedAchievements, unlockedAchievements, setAchievementComplete, setAchievementOnHold } =
    $derived(achievementStore);

  $effect(() => {
    onUnlocked(unlockedAchievements.filter(({ isOnHold }) => !isOnHold).length);
  });
</script>

{#snippet snippet({ diary, difficulty, icon, name, requirements }: Achievement, state: ItemState)}
  <TabSectionItem
    description={name}
    dialogTitle={name}
    title={diary}
    oncomplete={(isComplete) => setAchievementComplete(name, isComplete)}
    onhold={(isOnHold) => setAchievementOnHold(name, isOnHold)}
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
  userKey="achievements"
  {snippet}
/>
