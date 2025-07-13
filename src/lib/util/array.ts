import type { Requirements, Skill, SkillLiteral, SkillsRequirements } from '$lib/types';

/**
 * Creates a multidimentional array of two indicies, containing items of a given array corresponding to the result of a boolean comparator.
 * @param arr The array to reduce into the result array
 * @param comparator A callback that returns a boolean to determine which index an item gets pushed to in the array
 * @returns {[Array<T>, Array<T>]} Filtered array
 */
export const bifilter = <T>(arr: Array<T>, comparator: (value: T) => boolean): [Array<T>, Array<T>] =>
  arr.reduce(
    (acc, item) => {
      acc[+comparator(item)].push(item);
      return acc;
    },
    [[] as Array<T>, [] as Array<T>]
  );

/**
 * Determines if 'all' required skills, and at least one of 'any' required skills are unlocked, and at the correct level.
 * @param unlockedSkills Skills that are unlocked
 * @param requirement Skill requirements
 * @returns {boolean} Whether or not skills requirements are fulfilled
 */
const isSkillsFulfilled = (unlockedSkills: Array<Skill>, requirement: SkillsRequirements): boolean => {
  return (
    (!requirement.all ||
      (Object.entries(requirement.all) as Array<[SkillLiteral, number]>).every(
        ([skill, level]) => (unlockedSkills.find(({ name }) => name === skill)?.currentLevel || 0) >= level
      )) &&
    (!requirement.any ||
      (Object.entries(requirement.any) as Array<[SkillLiteral, number]>).some(
        ([skill, level]) => (unlockedSkills.find(({ name }) => name === skill)?.currentLevel || 0) >= level
      ))
  );
};

export const isFulfilled = (requirements: Requirements, unlockedSkills: Array<Skill>) => {
  if (Object.keys(requirements).length) {
    const requirement = [...(requirements?.main ?? [])];

    return requirement.every(({ required }) => required.some((req) => !req.skills || isSkillsFulfilled(unlockedSkills, req.skills)));
  }

  return true;
};
