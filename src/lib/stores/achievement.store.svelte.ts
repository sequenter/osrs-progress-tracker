import { default as achievementsJson } from '$assets/json/achievements.json';

import { createStore } from '$lib/stores/data.store.svelte';
import { questStore } from '$lib/stores/quest.store.svelte';
import { skillStore } from '$lib/stores/skill.store.svelte';
import { userStore } from '$lib/stores/user.store.svelte';
import type { Achievement } from '$lib/types';
import { bifilter, isFulfilled } from '$lib/util/array';
import { ACHIEVEMENT } from '$lib/util/schema';

/**
 * Achievement store, wraps data.store
 * @returns Achievement store accessors
 */
const createAchievementStore = () => {
  const { combatLevel, totalLevel, unlockedSkills } = $derived(skillStore);
  const { completeQuestsByName, currentQuestPoints } = $derived(questStore);
  const { combat, currentUser, ironman } = $derived(userStore);

  const store = $derived(createStore<Achievement>(`${currentUser}data/achievements`, ACHIEVEMENT, achievementsJson));

  // Locked and unlocked achievements
  const [lockedAchievements, unlockedAchievements] = $derived(
    bifilter(store.incomplete, ({ requirements }) =>
      isFulfilled(requirements, unlockedSkills, completeQuestsByName, currentQuestPoints, combatLevel, totalLevel, combat, ironman)
    )
  );

  return {
    get completeAchievements() {
      return store.complete;
    },
    get incompleteAchievements() {
      return store.incomplete;
    },
    get lockedAchievements() {
      return lockedAchievements;
    },
    get totalAchievements() {
      return store.total;
    },
    get totalAchievementsComplete() {
      return store.totalComplete;
    },
    get unlockedAchievements() {
      return unlockedAchievements;
    },
    get setAchievementComplete() {
      return store.setComplete;
    },
    get setAchievementOnHold() {
      return store.setOnHold;
    }
  };
};

export const achievementStore = createAchievementStore();
