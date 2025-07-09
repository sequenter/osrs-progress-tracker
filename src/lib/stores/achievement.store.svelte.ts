import { createStore } from './data.store.svelte';

import { default as achievementsJson } from '$assets/json/achievements.json';

import type { Achievement } from '$lib/types';
import { ACHIEVEMENT, parseJSONArray } from '$lib/util/schema';

/**
 * Achievement store, wraps data.store
 * @returns Achievement store accessors
 */
const createAchievementStore = () => {
  const store = createStore<Achievement>(
    'data/achievements',
    'task',
    parseJSONArray(ACHIEVEMENT, achievementsJson).map((achievement) => ({ ...achievement, isComplete: false }))
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
    get totalAchievements() {
      return store.total;
    },
    get totalAchievementsComplete() {
      return store.totalComplete;
    },
    get setAchievementComplete() {
      return setComplete;
    }
  };
};

export const achievementStore = createAchievementStore();
