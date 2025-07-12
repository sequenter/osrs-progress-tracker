<script lang="ts">
  import type { Quest } from '$lib/types';

  interface Props {
    onUnlocked: (items: number) => void;
  }

  const { onUnlocked }: Props = $props();

  setTimeout(() => {
    onUnlocked(20);
  }, 2000);

  console.log('QUESTS');
</script>

test2
