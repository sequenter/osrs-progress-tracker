import { ACHIEVEMENT, COLLECTION, PET, QUEST, SKILL, parseJSONArray } from './schema';

import { default as achievementsJson } from '$assets/json/achievements.json';
import { default as collectionsJson } from '$assets/json/collections.json';
import { default as petsJson } from '$assets/json/pets.json';
import { default as questsJson } from '$assets/json/quests.json';
import { default as skillsJson } from '$assets/json/skills.json';

describe('schema utilities', () => {
  let consoleWarn;

  beforeEach(() => {
    consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  describe('achievevments JSON', () => {
    it('does not have any errors', () => {
      parseJSONArray(ACHIEVEMENT, achievementsJson);
      expect(consoleWarn).not.toHaveBeenCalled();
    });
  });

  describe('collections JSON', () => {
    it('does not have any errors', () => {
      parseJSONArray(COLLECTION, collectionsJson);
      expect(consoleWarn).not.toHaveBeenCalled();
    });
  });

  describe('pets JSON', () => {
    it('does not have any errors', () => {
      parseJSONArray(PET, petsJson);
      expect(consoleWarn).not.toHaveBeenCalled();
    });
  });

  describe('quests JSON', () => {
    it('does not have any errors', () => {
      parseJSONArray(QUEST, questsJson);
      expect(consoleWarn).not.toHaveBeenCalled();
    });
  });

  describe('skills JSON', () => {
    it('does not have any errors', () => {
      parseJSONArray(SKILL, skillsJson);
      expect(consoleWarn).not.toHaveBeenCalled();
    });
  });
});
