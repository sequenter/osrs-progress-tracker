import { skillStore } from './skill.store.svelte';

import { default as skillsJson } from '$assets/json/skills.json';

const exampleName = 'Agility';

describe('skill store', () => {
  let store = skillStore;

  describe('skills', () => {
    it('contains skills', () => {
      expect(store.skills).toHaveLength(skillsJson.length);
      expect(store.skills.find(({ name }) => name === exampleName)).not.toBeUndefined();
    });
  });

  describe('setSkillUnlocked', () => {
    it('updates the unlocked state of a skill', () => {
      store.setSkillUnlocked(exampleName, true);
      expect(store.skills.find(({ name }) => name === exampleName)?.isUnlocked).toBeTruthy();

      store.setSkillUnlocked(exampleName, false);
      expect(store.skills.find(({ name }) => name === exampleName)?.isUnlocked).toBeFalsy();
    });
  });

  describe('increment and decrement skill', () => {
    it('increments the skills current level', () => {
      store.incrementSkill(exampleName);
      expect(store.skills.find(({ name }) => name === exampleName)?.currentLevel).toBe(2);
    });

    it('decrements the skills current level', () => {
      store.decrementSkill(exampleName);
      expect(store.skills.find(({ name }) => name === exampleName)?.currentLevel).toBe(1);
    });

    it('does not exceed the max level', () => {
      for (let i = 0; i < 100; i++) {
        store.incrementSkill(exampleName);
      }

      expect(store.skills.find(({ name }) => name === exampleName)?.currentLevel).toBe(99);
      expect(store.skills.find(({ name }) => name === exampleName)?.isComplete).toBeTruthy();
    });

    it('does not exceed the min level', () => {
      for (let i = 0; i < 100; i++) {
        store.decrementSkill(exampleName);
      }

      expect(store.skills.find(({ name }) => name === exampleName)?.currentLevel).toBe(1);
      expect(store.skills.find(({ name }) => name === exampleName)?.isComplete).toBeFalsy();
    });
  });
});
