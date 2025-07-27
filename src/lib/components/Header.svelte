<!--
@component

#### Header
An app bar header component that displays the app name and toggle button controls.

- Combat: enable/disable tasks that require combat
- Ironman: enable/disable ironman mode
- Dark mode: toggle dark mode
-->

<script lang="ts">
  import { clsx } from 'clsx';

  import Icon from './Icon.svelte';
  import IconButton from './IconButton.svelte';

  import ToggleButton from '$lib/components/ToggleButton.svelte';
  import { userStore } from '$lib/stores/user.store.svelte';
  import { mdiCombat, mdiCombatOff, mdiIronman, mdiIronmanOff } from '$lib/util/icon';

  import { mdiChevronDown, mdiChevronUp, mdiGhost, mdiGhostOff, mdiGithub, mdiPlusCircle, mdiTrashCan } from '@mdi/js';

  const { combat, currentUser, darkMode, ironman, users, addUser, removeUser, setCombat, setCurrentUser, setDarkMode, setIronman } =
    $derived(userStore);

  let isUserOpen = $state(false);
  let inputUser = $state('');

  /**
   * Add a new user.
   */
  const handleAddUser = () => {
    addUser(inputUser);

    inputUser = '';
  };

  /**
   * Remove a user.
   * @param {string} user
   */
  const handleRemoveUser = (user: string) => {
    if (currentUser === user) {
      handleSelectUser('default');
    }

    removeUser(user);
  };

  /**
   * Select a user.
   * @param {string} user
   */
  const handleSelectUser = (user: string) => {
    setCurrentUser(user);

    isUserOpen = false;
  };

  $effect(() => {
    // Update document element for TailwindCSS dark selectors
    document.documentElement.classList.toggle('dark', darkMode);
  });
</script>

<header class="shadow-elevation sticky top-0 z-40 bg-primary-800 dark:bg-primary-200 text-white dark:text-gray-800">
  <div class="flex h-16 items-center justify-between px-4">
    <div class="flex items-center gap-4">
      <span class="text-xl">OSRS Progress Tracker</span>

      <a
        href="https://github.com/sequenter/osrs-progress-tracker"
        target="_blank"
      >
        <Icon
          title="GitHub"
          path={mdiGithub}
        /></a
      >

      <div>
        <button
          class="flex items-center gap-2"
          onclick={() => {
            isUserOpen = !isUserOpen;
          }}
        >
          <span class="text-xl">{currentUser || 'default'}</span>

          <Icon
            path={isUserOpen ? mdiChevronUp : mdiChevronDown}
            title="Select user"
          />
        </button>

        <div
          class={clsx(
            'absolute flex flex-col top-16 shadow-elevation z-[100] outline-2 p-4 rounded-b-md w-64 text-gray-600 dark:text-gray-400 outline-primary-800 dark:outline-primary-200 bg-white dark:bg-background-900',
            !isUserOpen && 'hidden'
          )}
        >
          {#each users as user (user)}
            <div class="flex justify-between">
              <button
                class={clsx('text-xl', user === (currentUser || 'default') && 'text-primary-800 dark:text-primary-200')}
                onclick={() => handleSelectUser(user)}>{user}</button
              >

              {#if user !== 'default'}
                <IconButton
                  label={`Remove ${user}`}
                  path={mdiTrashCan}
                  onclick={() => handleRemoveUser(user)}
                />
              {/if}
            </div>

            <hr class="h-px my-2 border-0 bg-background-300 dark:bg-background-600" />
          {/each}

          <div class="flex justify-between gap-2">
            <input
              bind:value={inputUser}
              id="user-input"
              class="text-lg h-6 grow border rounded-md px-2 focus:outline-none border-background-50 dark:border-background-800"
              placeholder="Add a user..."
            />

            <IconButton
              label="Add user"
              path={mdiPlusCircle}
              onclick={handleAddUser}
            />
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <ToggleButton
        title="combat"
        iconOff={mdiCombatOff}
        iconOn={mdiCombat}
        value={combat}
        ontoggle={setCombat}
      />

      <ToggleButton
        title="ironman"
        iconOff={mdiIronmanOff}
        iconOn={mdiIronman}
        value={ironman}
        ontoggle={setIronman}
      />

      <ToggleButton
        title="dark mode"
        iconOff={mdiGhostOff}
        iconOn={mdiGhost}
        value={darkMode}
        ontoggle={setDarkMode}
      />
    </div>
  </div>
</header>
