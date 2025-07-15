<!--
@component

#### IconButton
A button component that specifically renders an SVG icon.

@param {string} path The SVG path
@param {string} [title=undefined] Optional title of the icon

@example

```svelte
<IconButton label="..." path="..." onclick={() => {}} useLongpress />
```
-->

<script lang="ts">
  import { clsx } from 'clsx';

  import Icon from '$lib/components/Icon.svelte';
  import { longpress } from '$lib/util/actions';

  interface Props {
    label: string;
    path: string;
    popovertarget?: string;
    popovertargetaction?: 'toggle' | 'show' | 'hide' | null | undefined;
    onclick: () => void;
    useLongpress?: boolean;
  }

  let { label, popovertarget, popovertargetaction, useLongpress = false, path, onclick }: Props = $props();
</script>

<button
  aria-label={label}
  class={clsx(
    'rounded-full transition-opacity opacity-90 hover:opacity-100 text-primary-800 dark:text-primary-200 hover:bg-primary-200/10'
  )}
  type="button"
  use:longpress={{ enabled: useLongpress, callback: onclick }}
  {popovertarget}
  {popovertargetaction}
  {onclick}
>
  <Icon
    title={label}
    {path}
  />
</button>
