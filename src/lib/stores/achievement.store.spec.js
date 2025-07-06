import { achievementStore } from './achievement.store.svelte';

import { default as achievementsJson } from '$assets/json/achievements.json';

const exampleTask = 'Go out fishing on the Fishing Trawler';

describe('achievement store', () => {
  let store = achievementStore;

  describe('achievements', () => {
    it('contains complete and incomplete achievements', () => {
      expect(store.completeAchievements).toHaveLength(0);
      expect(store.incompleteAchievements).toHaveLength(achievementsJson.length);
      expect(store.incompleteAchievements.find(({ task }) => task === exampleTask)).not.toBeUndefined();
    });
  });

  describe('setAchievementComplete', () => {
    it('updates the complete state of a task', () => {
      store.setAchievementComplete(exampleTask, true);
      expect(store.completeAchievements.find(({ task }) => task === exampleTask)).not.toBeUndefined();
      expect(store.incompleteAchievements.find(({ task }) => task === exampleTask)).toBeUndefined();
      expect(store.totalAchievementsComplete).toBe(1);

      store.setAchievementComplete(exampleTask, false);
      expect(store.completeAchievements.find(({ task }) => task === exampleTask)).toBeUndefined();
      expect(store.incompleteAchievements.find(({ task }) => task === exampleTask)).not.toBeUndefined();
      expect(store.totalAchievementsComplete).toBe(0);
    });
  });
});
