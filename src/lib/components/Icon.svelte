<!--
@component

#### Icon
An SVG component utilised to display an icon.

- Defaults to 24px by 24px

@param {string} path The SVG path
@param {string} [title=undefined] Optional title of the icon

@example

```svelte
<Icon path="..." />
```
-->

<script lang="ts">
  interface Props {
    path: string;
    title?: string;
  }

  let { path, title }: Props = $props();
</script>

<svg
  class="h-6 w-6"
  fill="currentColor"
  role="img"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  {#if title}
    <title>{title}</title>
  {/if}
  <path d={path}></path>
</svg>
