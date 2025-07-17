import { createStore } from './data.store.svelte';
import { userStore } from './user.store.svelte';

import { default as skillsJson } from '$assets/json/skills.json';

import type { Skill, SkillLiteral, SkillsLevel } from '$lib/types';
import { SKILL } from '$lib/util/schema';

/**
 * Skill store, wraps data.store
 * @returns Skill store accessors
 */
const createSkillStore = () => {
  const store = createStore<Skill>('data/skills', SKILL, skillsJson, (localSkills, parsedSkills) =>
    parsedSkills.map(
      (parsedSkill) =>
        localSkills.find(({ name }) => name === parsedSkill.name) ?? {
          ...parsedSkill,
          currentLevel: parsedSkill.minLevel,
          isComplete: false,
          isUnlocked: false
        }
    )
  );

  const { setCombatLevel } = $derived(userStore);

  // Unlocked skills as an object
  const unlockedSkills: SkillsLevel = $derived(
    store.value.reduce((acc, { currentLevel, name, isUnlocked }) => (isUnlocked ? { ...acc, [name]: currentLevel } : acc), {})
  );

  // Unlocked skills that are combat skills
  const unlockedSkillsByCombat: SkillsLevel = $derived(
    store.value.reduce(
      (acc, { currentLevel, name, isCombat, isUnlocked }) => (isUnlocked && isCombat ? { ...acc, [name]: currentLevel } : acc),
      {}
    )
  );

  // Unlocked skills by skill name
  const unlockedSkillsByName = $derived(Object.keys(unlockedSkills) as Array<SkillLiteral>);

  /**
   * Increments a skill by a given increment value and updates the complete state if required.
   * @param name The name of the skill
   * @param increment The amount to increment the skill by
   */
  const handleIncrement = (name: SkillLiteral, increment: number) => {
    // Set unlocked state if level were to go below 1
    if (store.value[store.map[name]].currentLevel + increment === store.value[store.map[name]].minLevel - 1) {
      store.value[store.map[name]].isUnlocked = false;
    }

    // Clamp level to min and max
    store.value[store.map[name]].currentLevel = Math.min(
      Math.max(store.value[store.map[name]].currentLevel + increment, store.value[store.map[name]].minLevel),
      store.value[store.map[name]].maxLevel
    );

    // Update complete state
    store.value[store.map[name]].isComplete = store.value[store.map[name]].currentLevel === store.value[store.map[name]].maxLevel;

    // Update combat level
    if (store.value[store.map[name]].isCombat) {
      setCombatLevel(
        store.value[store.map['Attack']].currentLevel,
        store.value[store.map['Defence']].currentLevel,
        store.value[store.map['Hitpoints']].currentLevel,
        store.value[store.map['Magic']].currentLevel,
        store.value[store.map['Prayer']].currentLevel,
        store.value[store.map['Ranged']].currentLevel,
        store.value[store.map['Strength']].currentLevel
      );
    }

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
    get unlockedSkills() {
      return unlockedSkills;
    },
    get unlockedSkillsByCombat() {
      return unlockedSkillsByCombat;
    },
    get unlockedSkillsByName() {
      return unlockedSkillsByName;
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
