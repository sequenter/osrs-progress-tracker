<script lang="ts">
  import { clsx } from 'clsx';
  import Portal from 'svelte-portal';

  import Icon from '$lib/components/Icon.svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import IconWiki from '$lib/components/IconWiki.svelte';
  import { questStore } from '$lib/stores/quest.store.svelte';
  import { skillStore } from '$lib/stores/skill.store.svelte';
  import { userStore } from '$lib/stores/user.store.svelte';
  import type { QuestRewards, Requirement, Requirements, SkillLiteral } from '$lib/types';
  import { mdiIronman } from '$lib/util/icon';

  import { mdiCheckCircle, mdiCloseCircle, mdiTrophy, mdiTrophyAward } from '@mdi/js';

  interface Props {
    icon: string;
    title: string;
    requirements: Requirements;
    rewards?: QuestRewards;
  }

  const { icon, title, requirements, rewards }: Props = $props();

  const { completeQuestsByName, currentQuestPoints } = $derived(questStore);
  const { unlockedSkills } = $derived(skillStore);
  const { combat, combatLevel, ironman } = $derived(userStore);

  let isOpen = $state(false);

  const handleDialogClick = (event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) => {
    if (event.target === event.currentTarget) {
      isOpen = false;
    }
  };

  export const open = () => {
    isOpen = true;
  };
</script>

{#snippet chip(title: string, complete: boolean, level?: number)}
  <div class="flex items-center p-1 pr-2 gap-1 rounded-full shadow-elevation bg-white dark:bg-background-800">
    <Icon
      class={clsx(complete ? 'text-green-800 dark:text-green-500' : 'text-red-800 dark:text-red-500')}
      path={complete ? mdiCheckCircle : mdiCloseCircle}
      title={complete ? 'Complete' : 'Incomplete'}
    />

    <span class="text-base">{level} {title}</span>
  </div>
{/snippet}

{#snippet rewardsSnippet()}
  <div class="flex flex-col gap-2">
    {#if rewards && rewards.skills}
      {#if rewards.skills.all}
        <div class="flex flex-col gap-1">
          <span class="text-base">All of the below skills unlocked for quest rewards</span>

          <div class="flex flex-wrap gap-2">
            {#each rewards.skills.all as skill (skill)}
              {@render chip(skill, !!unlockedSkills[skill])}
            {/each}
          </div>
        </div>
      {/if}

      {#if rewards.skills.any}
        <div class="flex flex-col gap-1">
          <span class="text-base">Any of the below skills unlocked for quest rewards</span>

          <div class="flex flex-wrap gap-2">
            {#each rewards.skills.any as skill (skill)}
              {@render chip(skill, !!unlockedSkills[skill])}
            {/each}
          </div>
        </div>
      {/if}
    {/if}
  </div>
{/snippet}

{#snippet requirementsSnippet(requirements: Array<Requirement>)}
  {#each requirements as { required, description }, index (index)}
    <div class={clsx('flex flex-col gap-1', requirements.length > 1 && 'p-2 border border-background-300 dark:border-background-800')}>
      {#if description}
        <span>{description}</span>
      {/if}

      {#each required as { quests, skills, ...rest }, index (index)}
        <div class={clsx('flex flex-col gap-2', required.length > 1 && 'p-2 border border-background-300 dark:border-background-800')}>
          {#if Object.keys(rest).length}
            <div class="flex flex-col gap-1">
              <span class="text-base">Miscellaneous</span>

              <div class="flex flex-wrap gap-2">
                {#if rest.combat}
                  {@render chip('Combat', combat)}
                {/if}

                {#if rest.combatLevel}
                  {@render chip('Combat level', combatLevel >= rest.combatLevel, rest.combatLevel)}
                {/if}

                {#if rest.QP}
                  {@render chip('Quest points', currentQuestPoints >= rest.QP, rest.QP)}
                {/if}
              </div>
            </div>
          {/if}

          {#if skills}
            {#if skills.all}
              <div class="flex flex-col gap-1">
                <span class="text-base">All of the below skills</span>

                <div class="flex flex-wrap gap-2">
                  {#each Object.entries(skills.all) as Array<[SkillLiteral, number]> as [skill, level] (skill)}
                    {@render chip(skill, (unlockedSkills[skill] || 0) >= level, level)}
                  {/each}
                </div>
              </div>
            {/if}

            {#if skills.any}
              <div class="flex flex-col gap-1">
                <span class="text-base">Any of the below skills</span>

                <div class="flex flex-wrap gap-2">
                  {#each Object.entries(skills.any) as Array<[SkillLiteral, number]> as [skill, level] (skill)}
                    {@render chip(skill, (unlockedSkills[skill] || 0) >= level, level)}
                  {/each}
                </div>
              </div>
            {/if}
          {/if}

          {#if quests}
            <div class="flex flex-col gap-1">
              <span class="text-base">Quests</span>

              <div class="flex flex-wrap gap-2">
                {#each quests as quest (quest)}
                  {@render chip(quest, completeQuestsByName.includes(quest))}
                {/each}
              </div>
            </div>
          {/if}
        </div>

        {#if index < required.length - 1}
          <div class="flex justify-center">
            <span class="font-medium text-black dark:text-yellow-300 bg-background-50 dark:bg-background-900">or</span>
          </div>
        {/if}
      {/each}
    </div>

    {#if index < requirements.length - 1}
      <div class="flex justify-center">
        <span class="font-medium text-black dark:text-yellow-300 bg-background-50 dark:bg-background-900">and</span>
      </div>
    {/if}
  {/each}
{/snippet}

{#if isOpen}
  <Portal>
    <div
      class="flex items-center justify-center fixed bottom-0 top-0 left-0 right-0 z-[999] bg-black/40"
      role="presentation"
      onclick={handleDialogClick}
    >
      <div
        class="p-4 rounded-md shadow-elevation w-xl max-h-10/12 m-auto bg-background-50 dark:bg-background-900 pointer-events-auto overflow-y-auto"
      >
        <div class="flex flex-col gap-4 text-lg">
          <div class="flex items-center justify-between">
            <span class="text-2xl">Requirements</span>

            <IconButton
              label="Close requirements"
              path={mdiCloseCircle}
              onclick={() => {
                isOpen = false;
              }}
            />
          </div>

          <hr class="h-px border-0 bg-background-300 dark:bg-background-600" />

          <div class="flex items-center gap-4">
            <div class="flex justify-center w-6"><IconWiki {icon} /></div>

            <span>{title}</span>
          </div>

          <hr class="h-px border-0 bg-background-300 dark:bg-background-600" />

          <div class="flex flex-col gap-4">
            {#if Object.keys(requirements).length || (rewards && rewards.skills)}
              {#if requirements.main}
                <div class="flex flex-col">
                  <div class="flex items-center gap-4 mb-2 text-amber-600 dark:text-amber-400">
                    <Icon
                      path={mdiTrophy}
                      title="Main"
                    />

                    <span>Main</span>
                  </div>

                  {@render requirementsSnippet(requirements.main)}
                </div>
              {/if}

              {#if requirements.main && ironman && requirements.ironman}
                <hr class="h-px border-0 bg-background-300 dark:bg-background-600" />
              {/if}

              {#if ironman && requirements.ironman}
                <div class="flex flex-col">
                  <div class="flex items-center gap-4 mb-2 text-black dark:text-gray-200">
                    <Icon
                      path={mdiIronman}
                      title="Ironman"
                    />

                    <span>Ironman</span>
                  </div>

                  {@render requirementsSnippet(requirements.ironman)}
                </div>
              {/if}

              {#if rewards && rewards.skills && (requirements.main || (ironman && requirements.ironman))}
                <hr class="h-px border-0 bg-background-300 dark:bg-background-600" />
              {/if}

              {#if rewards && rewards.skills}
                <div class="flex flex-col">
                  <div class="flex items-center gap-4 mb-2 text-cyan-800 dark:text-cyan-400">
                    <Icon
                      path={mdiTrophyAward}
                      title="Rewards"
                    />

                    <span>Rewards</span>
                  </div>

                  {@render rewardsSnippet()}
                </div>
              {/if}
            {:else}
              <span>None!</span>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </Portal>
{/if}
