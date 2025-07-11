<!--
@component

#### Icon
A component utilised to display an icon through rendering either an SVG or an img tag.

- Renders an SVG if 'path' is provided
- Renders an img if 'src' is provided

@param {string} path The SVG path
@param {string} [src=undefined] Optional image source
@param {string} [title=undefined] Optional title of the icon

@example

```svelte
<Icon path="..." />
```
-->

<script lang="ts">
  interface Props {
    path?: string;
    src?: string;
    title: string;
  }

  let { path, src, title }: Props = $props();
</script>

{#if path}
  <svg
    class="h-6 w-6"
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
    alt={title}
    height="32"
    width="32"
    {src}
  />
{/if}
