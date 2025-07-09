import { createStore } from './data.store.svelte';

import { default as skillsJson } from '$assets/json/skills.json';

import type { Skill, SkillLiteral } from '$lib/types';
import { SKILL, parseJSONArray } from '$lib/util/schema';

/**
 * Skill store, wraps data.store
 * @returns Skill store accessors
 */
const createSkillStore = () => {
  const store = createStore<Skill>(
    'data/skills',
    'name',
    parseJSONArray(SKILL, skillsJson).map((skill) => ({ ...skill, currentLevel: skill.minLevel, isComplete: false, isUnlocked: false }))
  );

  /**
   * Increments a skill by a given increment value and updates the complete state if required.
   * @param name The name of the skill
   * @param increment The amount to increment the skill by
   */
  const handleIncrement = (name: SkillLiteral, increment: number) => {
    // Set unlocked state if level were to go below 1
    if (store.value[store.map[name]].currentLevel + increment === 0) {
      store.value[store.map[name]].isUnlocked = false;
    }

    // Clamp level to min and max
    store.value[store.map[name]].currentLevel = Math.min(
      Math.max(store.value[store.map[name]].currentLevel + increment, store.value[store.map[name]].minLevel),
      store.value[store.map[name]].maxLevel
    );

    // Update complete state
    store.value[store.map[name]].isComplete = store.value[store.map[name]].currentLevel === store.value[store.map[name]].maxLevel;

    store.storeValue();
  };

  /**
   * Increments a skill by 1 level.
   * @param name The name of the skill
   */
  const decrement = (name: SkillLiteral) => {
    if (name in store.map) {
      handleIncrement(name, -1);
    }
  };

  /**
   * Decrements a skill by 1 level.
   * @param name The name of the skill
   */
  const increment = (name: SkillLiteral) => {
    if (name in store.map) {
      handleIncrement(name, 1);
    }
  };

  /**
   * Sets the unlocked state of a skill.
   * @param name The name of the skill
   * @param isUnlocked Whether or not the skill is unlocked
   */
  const setUnlocked = (name: SkillLiteral, isUnlocked: boolean) => {
    if (name in store.map) {
      // Set skill unlocked state
      store.value[store.map[name]].isUnlocked = isUnlocked;

      store.storeValue();
    }
  };

  return {
    get skills() {
      return store.value;
    },
    get totalSkills() {
      return store.total;
    },
    get totalSkillsComplete() {
      return store.totalComplete;
    },
    get decrementSkill() {
      return decrement;
    },
    get incrementSkill() {
      return increment;
    },
    get setSkillUnlocked() {
      return setUnlocked;
    }
  };
};

export const skillStore = createSkillStore();
