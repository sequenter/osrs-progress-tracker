<script lang="ts">
  import { clsx } from 'clsx';
  import type { Snippet } from 'svelte';

  import IconButton from '$lib/components/IconButton.svelte';
  import IconWiki from '$lib/components/IconWiki.svelte';
  import { difficultyColourMap } from '$lib/constants';
  import type { ItemState } from '$lib/types';

  import { mdiCheckCircle, mdiCloseCircle, mdiHelpCircle } from '@mdi/js';

  interface Props {
    icon: string;
    description?: string;
    difficulty?: string;
    state: ItemState;
    title: string;
    children?: Snippet;
    oncomplete: (isComplete: boolean) => void;
  }

  const { description, difficulty, icon, state, title, children, oncomplete }: Props = $props();
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
      onclick={() => oncomplete(true)}
    />
  </div>
</div>
