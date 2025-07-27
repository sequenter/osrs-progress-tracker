<script lang="ts">
  import '../app.css';

  import Drawer from '$lib/components/Drawer.svelte';
  import Header from '$lib/components/Header.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Progress from '$lib/components/Progress.svelte';
  import TabHandler from '$lib/components/TabHandler.svelte';
  import { achievementStore } from '$lib/stores/achievement.store.svelte';
  import { collectionStore } from '$lib/stores/collection.store.svelte';
  import { petStore } from '$lib/stores/pet.store.svelte';
  import { questStore } from '$lib/stores/quest.store.svelte';
  import { skillStore } from '$lib/stores/skill.store.svelte';
  import { progressIcon } from '$lib/util/icon';

  let { totalAchievements, totalAchievementsComplete } = $derived(achievementStore);
  let { totalCollections, totalCollectionsComplete, totalCompleteItems, totalItems } = $derived(collectionStore);
  let { totalPets, totalPetsComplete } = $derived(petStore);
  let { currentQuestPoints, totalQuestPoints, totalQuests, totalQuestsComplete } = $derived(questStore);
  let { combatLevel, totalSkills, totalSkillsComplete } = $derived(skillStore);
</script>

<div class="flex flex-col h-screen w-full overflow-y-scroll">
  <Header />

  <div class="flex flex-col grow lg:flex-row">
    <aside
      class="flex flex-col gap-4 p-4 shadow-elevation shrink-0 whitespace-nowrap z-30 lg:h-[calc(100vh-64px)] lg:sticky lg:top-16 lg:w-96 bg-background-50 dark:bg-background-800"
    >
      <div class="flex items-center gap-4">
        <Icon
          src={progressIcon}
          size="h-8 w-8"
          title="Progress"
        />

        <span class="text-2xl">Progress</span>
      </div>

      <div class="flex-none grid grid-cols-1 gap-4 grow sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-col">
        <Progress
          adornment={`CL: ${combatLevel}`}
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

        <Progress
          colour={{ dark: 'bg-indigo-400', light: 'bg-indigo-200' }}
          complete={totalCompleteItems + totalPetsComplete}
          total={totalItems + totalPets}
          title="Items"
        />
      </div>
    </aside>

    <main class="w-full"><TabHandler /></main>
  </div>

  <Drawer />
</div>
