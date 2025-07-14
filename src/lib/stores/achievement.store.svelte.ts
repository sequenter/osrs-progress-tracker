import { default as achievementsJson } from '$assets/json/achievements.json';

import { createStore } from '$lib/stores/data.store.svelte';
import { questStore } from '$lib/stores/quest.store.svelte';
import { skillStore } from '$lib/stores/skill.store.svelte';
import { userStore } from '$lib/stores/user.store.svelte';
import type { Achievement } from '$lib/types';
import { bifilter, isFulfilled } from '$lib/util/array';
import { ACHIEVEMENT, parseJSONArray } from '$lib/util/schema';

/**
 * Achievement store, wraps data.store
 * @returns Achievement store accessors
 */
const createAchievementStore = () => {
  const store = createStore<Achievement>(
    'data/achievements',
    'task',
    parseJSONArray(ACHIEVEMENT, achievementsJson).map((achievement) => ({ ...achievement, id: achievement.task, isComplete: false }))
  );

  const { unlockedSkills } = $derived(skillStore);
  const { completeQuestsByName, currentQuestPoints } = $derived(questStore);
  const { combatLevel } = $derived(userStore);

  // Locked and unlocked achievements
  const [lockedAchievements, unlockedAchievements] = $derived(
    bifilter(store.incomplete, ({ requirements }) =>
      isFulfilled(requirements, unlockedSkills, completeQuestsByName, currentQuestPoints, combatLevel)
    )
  );

  /**
   * Sets the complete state of an achievement.
   * @param task The achievement task
   * @param isComplete Whether or not the achievement is complete
   */
  const setComplete = (task: string, isComplete: boolean) => store.setComplete(task, isComplete);

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
      return setComplete;
    }
  };
};

export const achievementStore = createAchievementStore();
