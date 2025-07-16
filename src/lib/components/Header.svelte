<!--
@component

#### Header
An app bar header component that displays the app name and toggle button controls.

- Combat: enable/disable tasks that require combat
- Ironman: enable/disable ironman mode
- Dark mode: toggle dark mode
-->

<script lang="ts">
  import ToggleButton from '$lib/components/ToggleButton.svelte';
  import { userStore } from '$lib/stores/user.store.svelte';
  import { mdiCombat, mdiCombatOff, mdiIronman, mdiIronmanOff } from '$lib/util/icon';

  import { mdiGhost, mdiGhostOff } from '@mdi/js';

  const { combat, darkMode, ironman, setCombat, setDarkMode, setIronman } = $derived(userStore);

  $effect(() => {
    // Update document element for TailwindCSS dark selectors
    document.documentElement.classList.toggle('dark', darkMode);
  });
</script>

<header class="shadow-elevation sticky top-0 z-40 bg-primary-800 dark:bg-primary-200 text-white dark:text-gray-800">
  <div class="flex h-16 items-center justify-between px-4">
    <span class="text-xl">OSRS Progress Tracker</span>

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
