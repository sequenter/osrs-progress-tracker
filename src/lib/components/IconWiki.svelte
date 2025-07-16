<!--
@component

#### IconWiki
A component utilised to display an icon from the wiki, which defaults to an error icon onerror.

@param {string} icon The name of the item to get from the wiki

@example

```svelte
<IconWiki icon="..." />
```
-->

<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { WIKI_IMAGES_ERROR, WIKI_IMAGES_URL } from '$lib/constants';

  interface Props {
    icon: string;
  }

  const { icon }: Props = $props();

  let iconSrc = $state(`${WIKI_IMAGES_URL}${icon.replaceAll(' ', '_')}.png`);
  let title = $state(icon);

  /**
   * On wiki icon error, set to the bank filler icon.
   */
  const handleError = () => {
    iconSrc = WIKI_IMAGES_ERROR;
    title = `${icon} not found`;
  };
</script>

<Icon
  src={iconSrc}
  size="max-h-6 max-w-6"
  onerror={handleError}
  {title}
  ignoreAspect
/>
