import type { QuestRewards, Requirements, SkillLiteral, SkillsLevel, SkillsRequirements } from '$lib/types';

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
 * Determines if 'all' required skills, and at least one of 'any' required skills are unlocked.
 * @param rewards Quest rewards
 * @param unlockedSkills Unlocked skills
 * @returns {boolean} Whether or not the requirements of the rewards object is fulfilled
 */
export const isRewardsFulfilled = (rewards: QuestRewards, unlockedSkills: Array<SkillLiteral>): boolean => {
  return (
    !rewards.skills ||
    ((!rewards.skills.all || rewards.skills.all.every((skill) => unlockedSkills.includes(skill))) &&
      (!rewards.skills.any || rewards.skills.any.some((skill) => unlockedSkills.includes(skill))))
  );
};

/**
 * Determines if 'all' required skills, and at least one of 'any' required skills are unlocked, and at the correct level.
 * @param {Array<Skill>} unlockedSkills Skills that are unlocked
 * @param {SkillsRequirements} requirement Skill requirements
 * @returns {boolean} Whether or not skills requirements are fulfilled
 */
const isSkillsFulfilled = (unlockedSkills: SkillsLevel, requirement: SkillsRequirements): boolean => {
  return (
    (!requirement.all ||
      (Object.entries(requirement.all) as Array<[SkillLiteral, number]>).every(
        ([skill, level]) => unlockedSkills[skill] && unlockedSkills[skill] >= level
      )) &&
    (!requirement.any ||
      (Object.entries(requirement.any) as Array<[SkillLiteral, number]>).some(
        ([skill, level]) => unlockedSkills[skill] && unlockedSkills[skill] >= level
      ))
  );
};

/**
 * Determines if a requirements object is fulfilled by checking if they are met.
 * @param {Requirements} requirements The requirements to check
 * @param {SkillsLevel} unlockedSkills Unlocked skills
 * @param {Array<stirng>} completeQuests Completed quests by quest name
 * @param {number} questPoints Amount of current quest points
 * @returns
 */
export const isFulfilled = (
  requirements: Requirements,
  unlockedSkills: SkillsLevel,
  completeQuests: Array<string>,
  questPoints: number,
  combatLevel: number
) => {
  if (Object.keys(requirements).length) {
    const requirement = [...(requirements?.main ?? [])];

    return requirement.every(({ required }) =>
      required.some(
        (req) =>
          (!req.combat || false) &&
          (!req.combatLevel || combatLevel >= req.combatLevel) &&
          (!req.QP || questPoints >= req.QP) &&
          (!req.skills || isSkillsFulfilled(unlockedSkills, req.skills)) &&
          (!req.quests || req.quests.every((quest) => completeQuests.includes(quest)))
      )
    );
  }

  return true;
};
