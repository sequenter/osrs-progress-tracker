<!--
@component

#### TabSectionItem
A component that renders an item card within a tab section.

@param {number} icon The icon to display alongside the title
@param {string} [description=undefined] Optional description of the item
@param {string} dialogTitle The title for the requirements dialog
@param {string} [difficulty=undefined] Optional difficulty to display alongside the icon and title
@param {Requirements} requirements The requirements to display within the requirements dialog
@param {QuestRewards} [rewards=undefined] Optional rewards from a quest to pass to the requirements dialog
@param {ItemState} state The unlocked/locked/complete state of the item
@param {string} title The title of the item
@param {Snippet} [children=undefined] Optional children to render instead of a description
@param oncomplete callback for complete/incomplete button press
-->

<script lang="ts">
  import { clsx } from 'clsx';
  import type { Snippet } from 'svelte';

  import Dialog from '$lib/components/Dialog.svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import IconWiki from '$lib/components/IconWiki.svelte';
  import { difficultyColourMap } from '$lib/constants';
  import type { ItemState, QuestRewards, Requirements } from '$lib/types';

  import { mdiCheckCircle, mdiCloseCircle, mdiHelpCircle } from '@mdi/js';

  interface Props {
    icon: string;
    description?: string;
    dialogTitle: string;
    difficulty?: string;
    requirements: Requirements;
    rewards?: QuestRewards;
    state: ItemState;
    title: string;
    children?: Snippet;
    oncomplete: (isComplete: boolean) => void;
  }

  const { description, dialogTitle, difficulty, icon, requirements, rewards, state, title, children, oncomplete }: Props = $props();

  let dialog: Dialog;
</script>

<div class="flex flex-col p-4 gap-2 rounded-md shadow-elevation bg-white dark:bg-background-800">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <div class="flex justify-center w-6"><IconWiki {icon} /></div>

      <span class="text-xl">{title}</span>
    </div>

    {#if difficulty}
      <span class={clsx('text-lg', difficultyColourMap[difficulty])}>{difficulty}</span>
    {/if}
  </div>

  <hr class="h-px border-0 bg-background-300 dark:bg-background-600" />

  {#if children}
    {@render children()}

    <hr class="h-px border-0 bg-background-300 dark:bg-background-600" />
  {:else if description}
    <span class="grow text-md text-black dark:text-yellow-300">{description}</span>

    <hr class="h-px border-0 bg-background-300 dark:bg-background-600" />
  {/if}

  <div class={clsx('flex flex-row items-center', state === 'locked' ? 'justify-end' : 'justify-between')}>
    {#if state === 'complete'}
      <IconButton
        path={mdiCloseCircle}
        label="Mark as incomplete"
        onclick={() => oncomplete(false)}
      />
    {:else if state === 'unlocked'}
      <IconButton
        path={mdiCheckCircle}
        label="Mark as complete"
        onclick={() => oncomplete(true)}
      />
    {/if}

    <IconButton
      path={mdiHelpCircle}
      label="Requirements"
      onclick={() => dialog.open()}
    />
  </div>
</div>

<Dialog
  bind:this={dialog}
  title={dialogTitle}
  {icon}
  {requirements}
  {rewards}
/>
