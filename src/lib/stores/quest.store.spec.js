import { questStore } from './quest.store.svelte';

import { default as questsJson } from '$assets/json/quests.json';

const exampleName = 'Fishing Contest';

describe('quest store', () => {
  let store = questStore;

  describe('quests', () => {
    it('contains complete and incomplete quests', () => {
      expect(store.completeQuests).toHaveLength(0);
      expect(store.incompleteQuests).toHaveLength(questsJson.length);
      expect(store.incompleteQuests.find(({ name }) => name === exampleName)).not.toBeUndefined();
    });
  });

  describe('setQuestComplete', () => {
    it('updates the complete state of a quest', () => {
      store.setQuestComplete(exampleName, true);
      expect(store.completeQuests.find(({ name }) => name === exampleName)).not.toBeUndefined();
      expect(store.incompleteQuests.find(({ name }) => name === exampleName)).toBeUndefined();
      expect(store.totalQuestsComplete).toBe(1);

      store.setQuestComplete(exampleName, false);
      expect(store.completeQuests.find(({ name }) => name === exampleName)).toBeUndefined();
      expect(store.incompleteQuests.find(({ name }) => name === exampleName)).not.toBeUndefined();
      expect(store.totalQuestsComplete).toBe(0);
    });
  });

  describe('quest points', () => {
    it('has the correct amount of quest points', () => {
      expect(store.totalQuestPoints).toBeGreaterThan(0);
      expect(store.totalQuestPoints).toBe(questsJson.reduce((acc, { rewards }) => (rewards?.QP ? acc + rewards.QP : acc), 0));
    });

    it('has the correct amount of current quest points', () => {
      store.setQuestComplete(exampleName, false);
      expect(store.currentQuestPoints).toBe(0);

      store.setQuestComplete(exampleName, true);
      expect(store.currentQuestPoints).toBe(1);
    });
  });
});
