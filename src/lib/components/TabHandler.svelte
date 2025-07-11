<script lang="ts">
  import { clsx } from 'clsx';

  import Icon from '$lib/components/Icon.svelte';
  import { achievementsIcon, collectionsIcon, petsIcon, questsIcon } from '$lib/util/icon';

  const tabNames = ['Achievements', 'Quests', 'Collections', 'Pets'] as const;

  let selectedTab = $state('Achievements');

  let tabs = $derived(
    [
      {
        icon: achievementsIcon,
        name: 'Achievements'
      },
      {
        icon: questsIcon,
        name: 'Quests'
      },
      {
        icon: collectionsIcon,
        name: 'Collections'
      },
      {
        icon: petsIcon,
        name: 'Pets'
      }
    ].map((tab) => ({ ...tab, selected: selectedTab === tab.name }))
  );
</script>

<div class="flex flex-col w-full">
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 backdrop-blur-sm shadow-elevation z-20 lg:sticky lg:top-16"
  >
    {#each tabs as { name, icon, selected }, index (name)}
      <div class="flex flex-col">
        <button
          class={clsx(
            'py-4 transition-colors duration-300',
            selected ? 'text-primary-800 dark:text-primary-400' : 'hover:text-primary-600 hover:dark:text-primary-200'
          )}
          onclick={() => {
            selectedTab = name;
          }}
        >
          <div
            class={clsx(
              'flex gap-4 items-center justify-center',
              index < tabs.length - 1 && 'border-r border-background-300 dark:border-background-700'
            )}
          >
            <Icon
              src={icon}
              title={name}
            />
            <span class="text-xl uppercase">{name}</span>
          </div>
        </button>
        <span
          class={clsx(
            'h-0.5 transition-colors duration-300 bg-background-300 dark:bg-background-700',
            selected && 'bg-primary-800 dark:bg-primary-400'
          )}
        ></span>
      </div>
    {/each}
  </div>

  <div class="p-4"></div>
</div>
