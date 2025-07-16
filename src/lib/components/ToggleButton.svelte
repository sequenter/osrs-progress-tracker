<!--
@component

#### ToggleButton
A component utilised to display a toggle button with on/off states.

@param {string} iconOn The icon to display when the state is 'on'
@param {string} iconOff The icon to display when the state is 'off'
@param {string} title The title of the icon (which is displayed on hover)
@param {boolean} value Checked state of the icon button
@param ontoggle callback when pressed

@example

```svelte
<ToggleButton iconOff="..." iconOn="..." title="..." value={true} ontoggle={...} />
```
-->

<script lang="ts">
  import { clsx } from 'clsx';

  import Icon from '$lib/components/Icon.svelte';

  interface Props {
    iconOn: string;
    iconOff: string;
    title: string;
    value: boolean;
    ontoggle: (value: boolean) => void;
  }

  const { iconOn, iconOff, title, value, ontoggle }: Props = $props();
</script>

<button
  class={clsx(
    'p-2.5 rounded-lg focus:outline-hidden hover:bg-primary-600 dark:hover:bg-primary-100 dark:text-gray-800',
    value && 'bg-primary-600 dark:bg-primary-100'
  )}
  onclick={() => ontoggle(!value)}
>
  <Icon
    path={value ? iconOn : iconOff}
    title={`Toggle ${title} ${value ? 'off' : 'on'}`}
  />
</button>
