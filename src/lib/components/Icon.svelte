<!--
@component

#### Icon
A component utilised to display an icon through rendering either an SVG or an img tag.

- Renders an SVG if 'path' is provided
- Renders an img if 'src' is provided

@param {string} path The SVG path
@param {string} [src=undefined] Optional image source
@param {string} [size=undefined] Optional tailwind size
@param {string} [title=undefined] Optional title of the icon
@param {() => void} [onerror=undefined] Optional onerror callback

@example

```svelte
<Icon path="..." />
```
-->

<script lang="ts">
  import { clsx } from 'clsx';

  interface Props {
    ignoreAspect?: boolean;
    path?: string;
    src?: string;
    size?: string;
    title: string;
    onerror?: () => void;
  }

  let { ignoreAspect = false, path, src, size = 'h-6 w-6', title, onerror }: Props = $props();
</script>

{#if path}
  <svg
    class={clsx(size)}
    fill="currentColor"
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>
    <path d={path}></path>
  </svg>
{:else if src}
  <img
    class={clsx(size, !ignoreAspect && 'aspect-square')}
    alt={title}
    {onerror}
    {src}
  />
{/if}
