import { createStore } from './data.store.svelte';

import { default as questsJson } from '$assets/json/quests.json';
import type { Quest } from '$lib/types';
import { QUEST, parseJSONArray } from '$lib/util/schema';

/**
 * Quest store, wraps data.store
 * @returns Quest store accessors
 */
const createQuestStore = () => {
  const store = createStore<Quest>(
    'data/quests',
    'name',
    parseJSONArray(QUEST, questsJson).map((quest) => ({ ...quest, isComplete: false }))
  );

  // Total amount of quest points from complete quests
  const currentQuestPoints = $derived(store.complete.reduce((acc, { rewards }) => (rewards?.QP ? acc + rewards.QP : acc), 0));

  // Total amount of quest points available from all quests
  const totalQuestPoints = store.value.reduce((acc, { rewards }) => (rewards?.QP ? acc + rewards.QP : acc), 0);

  /**
   * Sets the complete state of a quest.
   * @param name The name of the quest
   * @param isComplete Whether or not the quest is complete
   */
  const setComplete = (name: string, isComplete: boolean) => store.setComplete(name, isComplete);

  return {
    get completeQuests() {
      return store.complete;
    },
    get incompleteQuests() {
      return store.incomplete;
    },
    get currentQuestPoints() {
      return currentQuestPoints;
    },
    get totalQuestPoints() {
      return totalQuestPoints;
    },
    get totalQuests() {
      return store.total;
    },
    get totalQuestsComplete() {
      return store.totalComplete;
    },
    get setQuestComplete() {
      return setComplete;
    }
  };
};

export const questStore = createQuestStore();
