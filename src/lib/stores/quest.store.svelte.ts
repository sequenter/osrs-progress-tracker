import { default as questsJson } from '$assets/json/quests.json';

import { createStore } from '$lib/stores/data.store.svelte';
import { skillStore } from '$lib/stores/skill.store.svelte';
import { userStore } from '$lib/stores/user.store.svelte';
import type { Quest } from '$lib/types';
import { bifilter, isFulfilled, isRewardsFulfilled } from '$lib/util/array';
import { QUEST } from '$lib/util/schema';

/**
 * Quest store, wraps data.store
 * @returns Quest store accessors
 */
const createQuestStore = () => {
  const store = createStore<Quest>('data/quests', QUEST, questsJson);

  const { unlockedSkills, unlockedSkillsByName } = $derived(skillStore);
  const { combat, combatLevel, ironman } = $derived(userStore);

  // Completed quests by quest name
  const completeQuestsByName = $derived(store.complete.map(({ name }) => name));

  // Total amount of quest points from complete quests
  const currentQuestPoints = $derived(store.complete.reduce((acc, { rewards }) => (rewards?.QP ? acc + rewards.QP : acc), 0));

  // Total amount of quest points available from all quests
  const totalQuestPoints = store.value.reduce((acc, { rewards }) => (rewards?.QP ? acc + rewards.QP : acc), 0);

  // Locked and unlocked quests
  const [lockedQuests, unlockedQuests] = $derived(
    bifilter(
      store.incomplete,
      ({ requirements, rewards }) =>
        isFulfilled(requirements, unlockedSkills, completeQuestsByName, currentQuestPoints, combatLevel, combat, ironman) &&
        isRewardsFulfilled(rewards, unlockedSkillsByName)
    )
  );

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
    get completeQuestsByName() {
      return completeQuestsByName;
    },
    get currentQuestPoints() {
      return currentQuestPoints;
    },
    get lockedQuests() {
      return lockedQuests;
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
    get unlockedQuests() {
      return unlockedQuests;
    },
    get setQuestComplete() {
      return setComplete;
    }
  };
};

export const questStore = createQuestStore();
