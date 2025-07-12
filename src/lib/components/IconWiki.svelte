<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { WIKI_IMAGES_ERROR, WIKI_IMAGES_URL } from '$lib/constants';

  interface Props {
    icon: string;
  }

  const { icon }: Props = $props();

  let iconSrc = $state(`${WIKI_IMAGES_URL}${icon.replaceAll(' ', '_')}.png`);
</script>

<Icon
  src={iconSrc}
  size="w-4"
  title={icon}
  onerror={() => (iconSrc = WIKI_IMAGES_ERROR)}
  ignoreAspect
/>
