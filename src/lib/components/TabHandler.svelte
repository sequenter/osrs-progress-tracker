<script lang="ts">
  import { clsx } from 'clsx';
  import type { Component } from 'svelte';

  import Icon from '$lib/components/Icon.svelte';
  import Achievements from '$lib/components/tabs/Acheivements.svelte';
  import Pets from '$lib/components/tabs/Pets.svelte';
  import Quests from '$lib/components/tabs/Quests.svelte';
  import { achievementsIcon, collectionsIcon, petsIcon, questsIcon } from '$lib/util/icon';

  type TabHeader = 'Achievements' | 'Quests';

  type Tabs = {
    [key in TabHeader]: {
      Component: Component<{ onUnlocked: (count: number) => void }> | null;
      icon: string;
      selected: boolean;
      unlocked: number;
    };
  };

  let tabs: Tabs = $state({
    Achievements: {
      Component: Achievements,
      icon: achievementsIcon,
      selected: true,
      unlocked: 0
    },
    Quests: {
      Component: Quests,
      icon: questsIcon,
      selected: false,
      unlocked: 0
    },
    Collections: {
      Component: null,
      icon: collectionsIcon,
      selected: false,
      unlocked: 0
    },
    Pets: {
      Component: Pets,
      icon: petsIcon,
      selected: false,
      unlocked: 0
    }
  });

  const handleSelected = (title: string) => {
    Object.keys(tabs).forEach((tab) => {
      tabs[tab as TabHeader].selected = tab === title;
    });
  };

  const handleUnlocked = (title: string, count: number) => {
    tabs[title as TabHeader].unlocked = count;
  };
</script>

<div class="flex flex-col w-full">
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 backdrop-blur-sm shadow-elevation z-20 lg:sticky lg:top-16"
  >
    {#each Object.entries(tabs) as [title, { icon, selected, unlocked }], index (title)}
      <div class="flex flex-col">
        <button
          class={clsx('py-4', selected && 'text-primary-800 dark:text-primary-400')}
          onclick={() => handleSelected(title)}
        >
          <div
            class={clsx(
              'flex gap-4 items-center justify-center',
              index < Object.keys(tabs).length - 1 && 'border-r border-background-300 dark:border-background-700'
            )}
          >
            <Icon
              size="h-8 w-8"
              src={icon}
              {title}
            />
            <span class="text-xl uppercase">{title}</span>

            <span
              class={clsx(
                'flex items-center justify-center h-6 w-6 rounded-full text-md transition-transform duration-300 text-gray-900 bg-amber-500',
                unlocked > 0 ? 'scale-100' : 'scale-0'
              )}
            >
              {unlocked}
            </span>
          </div>
        </button>
        <span class={clsx('h-0.5 bg-background-300 dark:bg-background-700', selected && 'bg-primary-800 dark:bg-primary-400')}></span>
      </div>
    {/each}
  </div>

  {#each Object.entries(tabs) as [title, { Component, selected }] (title)}
    <div class={clsx('flex flex-col p-4 gap-4', !selected && 'hidden')}>
      <Component onUnlocked={(count) => handleUnlocked(title, count)} />
    </div>
  {/each}
</div>
