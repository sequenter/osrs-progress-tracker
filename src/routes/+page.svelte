<script lang="ts">
  import '../app.css';

  import DarkMode from '$lib/components/DarkMode.svelte';
  import Drawer from '$lib/components/Drawer.svelte';
  import Progress from '$lib/components/Progress.svelte';
  import { achievementStore } from '$lib/stores/achievement.store.svelte';
  import { collectionStore } from '$lib/stores/collection.store.svelte';
  import { petStore } from '$lib/stores/pet.store.svelte';
  import { questStore } from '$lib/stores/quest.store.svelte';
  import { skillStore } from '$lib/stores/skill.store.svelte';

  let { totalAchievements, totalAchievementsComplete } = $derived(achievementStore);
  let { totalCollections, totalCollectionsComplete } = $derived(collectionStore);
  let { totalPets, totalPetsComplete } = $derived(petStore);
  let { currentQuestPoints, totalQuestPoints, totalQuests, totalQuestsComplete } = $derived(questStore);
  let { totalSkills, totalSkillsComplete } = $derived(skillStore);
</script>

<div class="flex flex-col h-screen w-full overflow-auto">
  <header class="h-16 shadow-elevation z-40 bg-primary-800 dark:bg-primary-200 text-white dark:text-gray-800">
    <div class="flex h-full w-full items-center justify-between px-4 py-1.5">
      <span class="text-xl">OSRS Progress Tracker</span>

      <DarkMode />
    </div>
  </header>

  <div class="flex flex-col grow lg:flex-row">
    <aside class="flex flex-col gap-4 p-4 shadow-elevation z-30 lg:h-full lg:w-96 bg-background-50 dark:bg-background-800">
      <span class="text-2xl">Progress</span>

      <div class="flex-none grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-col">
        <Progress
          colour={{ dark: 'bg-amber-400', light: 'bg-amber-200' }}
          complete={totalSkillsComplete}
          total={totalSkills}
          title="Skills"
        />

        <Progress
          colour={{ dark: 'bg-green-400', light: 'bg-green-200' }}
          complete={totalAchievementsComplete}
          total={totalAchievements}
          title="Achievements"
        />

        <Progress
          adornment={`QP: ${currentQuestPoints}/${totalQuestPoints}`}
          colour={{ dark: 'bg-cyan-400', light: 'bg-cyan-200' }}
          complete={totalQuestsComplete}
          total={totalQuests}
          title="Quests"
        />

        <Progress
          colour={{ dark: 'bg-purple-400', light: 'bg-purple-200' }}
          complete={totalCollectionsComplete}
          total={totalCollections}
          title="Collections"
        />

        <Progress
          colour={{ dark: 'bg-red-400', light: 'bg-red-200' }}
          complete={totalPetsComplete}
          total={totalPets}
          title="Pets"
        />
      </div>
    </aside>

    <div class="p-4"></div>

    <Drawer />
  </div>
</div>
