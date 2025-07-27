import { createStore } from './data.store.svelte';

import { default as skillsJson } from '$assets/json/skills.json';

import { userStore } from '$lib/stores/user.store.svelte';
import type { Skill, SkillLiteral, SkillsLevel } from '$lib/types';
import { SKILL } from '$lib/util/schema';

/**
 * Skill store, wraps data.store
 * @returns Skill store accessors
 */
const createSkillStore = () => {
  const { currentUser } = $derived(userStore);

  const store = $derived(
    createStore<Skill>(
      `${currentUser ? `${currentUser}:` : ''}data/skills`,
      SKILL,
      skillsJson,
      ({ currentLevel, isComplete, isUnlocked }, parsedSkill) => ({
        ...parsedSkill,
        currentLevel,
        isComplete: !!isComplete,
        isUnlocked: !!isUnlocked
      }),
      (parsedSkill) => ({ ...parsedSkill, currentLevel: parsedSkill.minLevel, isComplete: false, isUnlocked: false })
    )
  );

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

  // Current combat level
  // https://oldschool.runescape.wiki/w/Combat_level
  const combatLevel = $derived(
    (({ Attack, Defence, Hitpoints, Magic, Prayer, Ranged, Strength }) =>
      Math.floor(
        (Defence + Hitpoints + Math.floor(Prayer * 0.5)) * 0.25 +
          Math.max((Attack + Strength) * 0.325, Ranged * 1.5 * 0.325, Magic * 1.5 * 0.325)
      ))(store.value.reduce((acc, { currentLevel, name }) => ({ ...acc, [name]: currentLevel }), {} as Record<SkillLiteral, number>))
  );

  // Current total level
  const totalLevel = $derived(Object.values(unlockedSkills).reduce((acc, level) => acc + level, 0));

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
    get combatLevel() {
      return combatLevel;
    },
    get skills() {
      return store.value;
    },
    get totalLevel() {
      return totalLevel;
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
