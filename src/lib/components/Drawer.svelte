<script lang="ts">
  import { clsx } from 'clsx';

  import IconButton from './IconButton.svelte';

  import Icon from '$lib/components/Icon.svelte';
  import { skillStore } from '$lib/stores/skill.store.svelte';
  import { skillIconMap } from '$lib/util/icon';

  import { mdiChartBar, mdiLock, mdiMinusCircle, mdiPlusCircle } from '@mdi/js';

  let { skills, decrementSkill, incrementSkill, setSkillUnlocked } = $derived(skillStore);
  let isOpen = $state(false);
</script>

<div
  class={clsx(
    'fixed p-4 top-0 right-0 h-full w-[560px] shadow-elevation transition-transform duration-300 ease-in-out z-50 bg-background-50 dark:bg-background-800',
    isOpen ? 'translate-none' : 'translate-x-[560px]'
  )}
  data-testid={`drawer:${isOpen ? 'open' : 'closed'}`}
>
  <div class="grid grid-cols-4 gap-4 h-full">
    {#each skills as { currentLevel, isUnlocked, name } (name)}
      <div class="flex flex-col items-center justify-between p-2 rounded-md shadow-elevation text-xl grow bg-white dark:bg-background-700">
        <div class={clsx('flex flex-col items-center grow transition-opacity', isUnlocked ? 'opacity-100' : 'opacity-40 dark:opacity-20')}>
          <span>{name}</span>

          <img
            alt={`${name} icon`}
            height="56"
            width="56"
            src={skillIconMap[name]}
          />
        </div>

        {#if isUnlocked}
          <div class="flex items-center justify-between px-2 w-full">
            <IconButton
              label={`Decrement ${name}`}
              path={mdiMinusCircle}
              onclick={() => decrementSkill(name)}
              useLongpress
            />

            <span
              aria-label={`${name} level`}
              aria-live="polite"
              class="text-base">{currentLevel}</span
            >

            <IconButton
              label={`Increment ${name}`}
              path={mdiPlusCircle}
              onclick={() => incrementSkill(name)}
              useLongpress
            />
          </div>
        {:else}
          <IconButton
            label={`Unlock ${name}`}
            path={mdiLock}
            onclick={() => setSkillUnlocked(name, !isUnlocked)}
          />
        {/if}
      </div>
    {/each}
  </div>

  <button
    class="absolute rounded-full bottom-6 left-[-5.5rem] p-4 drop-shadow-lg transition-all brightness-100 hover:brightness-80 text-white dark:text-gray-800 bg-primary-800 dark:bg-primary-200"
    data-testid="drawer-button"
    type="button"
    onclick={() => {
      isOpen = !isOpen;
    }}
  >
    <Icon
      path={mdiChartBar}
      title={`${isOpen ? 'Close' : 'Open'} skills drawer`}
    />
  </button>
</div>
