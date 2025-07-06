<!--
@component

#### Progress
A card component utilised to render progress of a numeric goal.

- Renders three numerical progress values: complete, total, and incomplete
- Renders a progress bar, showing a percentage progress of complete in comparison to total

@param {string} [adorment=undefined] Optional adornment to render next to the title
@param {Colour} [colour={ dark: 'bg-primary-400', light: 'bg-primary-200' }] Optional dark and light tailwind colours for the progress bar
@param {number} complete Complete value
@param {string} title The title of the progress card
@param {number} total Total value

@example

```svelte
<Progress colour={{ dark: 'bg-amber-400', light: 'bg-amber-200' }} complete={0} total={10} title="Progress" />
```
-->

<script lang="ts">
  import { clsx } from 'clsx';

  interface Colour {
    dark: string;
    light: string;
  }

  interface Props {
    adornment?: string;
    colour?: Colour;
    complete: number;
    title: string;
    total: number;
  }

  let { adornment, colour = { dark: 'bg-primary-400', light: 'bg-primary-200' }, complete, title, total }: Props = $props();

  const incomplete = $derived(total - complete);
  const percentage = $derived(((complete / total) * 100).toFixed(2));
</script>

<div class="flex flex-col gap-2 p-4 rounded-md shadow-elevation bg-white dark:bg-background-700">
  <div class="grid grid-cols-3 text-xl">
    <span class="text-start">{title}</span>
    <span class="text-center">{adornment}</span>
    <span class="text-end">{`${percentage}%`}</span>
  </div>

  <div class="flex flex-col">
    <div class="grid grid-cols-3 gap-0.5 text-center text-lg">
      <span
        aria-label="complete"
        class="rounded-tl-sm text-green-600 bg-background-100 dark:text-green-400 dark:bg-background-900">{complete}</span
      >
      <span
        aria-label="total"
        class="bg-background-100 dark:bg-background-900">{total}</span
      >
      <span
        aria-label="incomplete"
        class="rounded-tr-sm text-red-600 bg-background-100 dark:text-red-400 dark:bg-background-900">{incomplete}</span
      >
    </div>

    <span
      class={clsx('relative h-2 overflow-hidden rounded-b-sm', colour.light)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuenow={parseInt(percentage)}
      aria-valuemax={100}
    >
      <span
        class={clsx('absolute top-0 left-0 h-full transition-all duration-400', colour.dark)}
        style={`width: ${percentage}%`}
      ></span>
    </span>
  </div>
</div>
