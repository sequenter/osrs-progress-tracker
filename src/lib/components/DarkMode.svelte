<!--
@component

#### DarkMode
A button component utilised to toggle dark mode on and off.

- Persists dark mode preference to localStorage, defaulting to the browsers match media preference
- Toggles the 'dark' class on the document element

@example

```svelte
<DarkMode />
```
-->

<script lang="ts">
  import { clsx } from 'clsx';

  import Icon from '$lib/components/Icon.svelte';
  import { getJSONObject, setJSONObject } from '$lib/util/localStorage';

  import { mdiLightbulb, mdiLightbulbOff } from '@mdi/js';

  const DARKMODE_PREFERENCE_KEY = 'preference/darkmode';

  // Obtain the dark mode preference from localStorage, or default to match media if it doesn't exist
  let darkMode = $state(
    getJSONObject<boolean>(DARKMODE_PREFERENCE_KEY) ?? !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  // Update the document element to toggle the 'dark' class, and persist in localStorage
  $effect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    setJSONObject(DARKMODE_PREFERENCE_KEY, darkMode);
  });
</script>

<button
  class={clsx('p-2.5 rounded-lg text-gray-800 focus:outline-hidden hover:bg-primary-100 hover:text-black', !darkMode && 'bg-primary-100')}
  onclick={() => {
    darkMode = !darkMode;
  }}
>
  {#if darkMode}
    <Icon
      path={mdiLightbulbOff}
      title="Toggle dark mode off"
    />
  {:else}
    <Icon
      path={mdiLightbulb}
      title="Toggle dark mode on"
    />
  {/if}
</button>
