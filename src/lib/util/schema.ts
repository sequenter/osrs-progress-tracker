import * as z from 'zod/v4';

import { ACHIEVEMENT_DIARIES, ACHIEVEMENT_DIFFICULTY, QUEST_DIFFICULTY, QUEST_LENGTH, SKILLS } from '$lib/constants';

/* UTILS */

/**
 * Parse a JSON object against a given schema.
 * @param schema The schema to verify JSON against
 * @param json The JSON to parse
 * @returns The parsed JSON object
 */
export const parseJSONArray = <T extends z.ZodObject>(schema: T, json: unknown) => {
  try {
    return z.array(schema).parse(json) as Array<z.infer<T>>;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.warn(error.issues);
    }
  }

  return [];
};

/* SKILL */

/**
 * An object containing skill details.
 * isCombat: Whether or not the skill contributes to combat level
 * name: The name of the skill
 * minLevel: The minimum level
 * maxLevel: The maximum level
 */
export const SKILL = z.object({
  isCombat: z.boolean(),
  name: z.literal(SKILLS),
  minLevel: z.number(),
  maxLevel: z.number()
});

/* COMMON SCHEMAS */

/**
 * A record containing skills and their corresponding required level.
 * @example { "Agility": 15 }
 */
const SKILL_LEVEL = z.partialRecord(z.literal(SKILLS), z.number()).optional();

/**
 * An object containing records of 'all' and 'any' skills requirements.
 * all: Every {@link SKILL_LEVEL} must be fulfilled
 * any: At least one {@link SKILL_LEVEL} must be fulfilled
 * @example { "all": {...}, "any": {...} }
 */
export const SKILLS_REQUIREMENT = z.object({
  all: SKILL_LEVEL.optional(),
  any: SKILL_LEVEL.optional()
});

/**
 * An object containing requirement details.
 * combat: Whether or not combat is required, such as having to defeat enemies
 * combatLevel: Combat level required
 * QP: Quest points required
 * quests: A list of quests that need to be completed, by quest name
 * skills: A record containing {@link SKILLS_REQUIREMENT}
 * @example
 * {
 *   "combat": true,
 *   "combatLevel": 40,
 *   "QP": 12,
 *   "quests": ["Demon Slayer"],
 *   "skills": {...}
 * }
 */
const ANY_REQUIREMENT = z.object({
  combat: z.boolean().optional(),
  combatLevel: z.number().optional(),
  QP: z.number().optional(),
  quests: z.array(z.string()).optional(),
  skills: SKILLS_REQUIREMENT.optional(),
  totalLevel: z.number().optional()
});

/**
 * An object containing requirements and a description.
 * description: The description of the requirement
 * required: An array of {@link ANY_REQUIREMENT}, where at least one must be fulfilled
 * @example
 * {
 *   "description": "Partial completion of 'Ratcatchers'",
 *   "required": [...]
 * }
 */
export const ALL_REQUIREMENT = z.object({
  description: z.string().optional(),
  required: z.array(ANY_REQUIREMENT)
});

/**
 * An object containing either main or ironman requirements, all of which need to be filfilled.
 * main: {@link ALL_REQUIREMENT} that need to be fulfilled regardless of account type
 * ironman: {@link ALL_REQUIREMENT} that are specific to ironmen
 * @example
 * {
 *   main: [...],
 *   ironman: [...]
 * }
 */
export const REQUIREMENTS = z.object({
  main: z.array(ALL_REQUIREMENT).optional(),
  ironman: z.array(ALL_REQUIREMENT).optional()
});

/* ACHIEVEMENT */

/**
 * An object detailing an achievement.
 * diary: The name of the {@link ACHIEVEMENT_DIARIES}
 * difficulty: The {@link ACHIEVEMENT_DIFFICULTY} of the achievement
 * icon: The name of the icon from the wiki
 * name: The task to complete for the achievement
 * requirements: A record of {@link REQUIREMENTS}
 * @example
 * {
 *   "diary": "Ardougne",
 *   "difficulty": "Medium",
 *   "icon": "Banner (Kandarin)"
 *   "name": "Cast the Ardougne Teleport spell",
 *   "requirements": {...}
 * }
 */
export const ACHIEVEMENT = z.object({
  diary: z.literal(ACHIEVEMENT_DIARIES),
  difficulty: z.literal(ACHIEVEMENT_DIFFICULTY),
  icon: z.string(),
  name: z.string(),
  requirements: REQUIREMENTS
});

/* QUEST */

/**
 * An object containing records of 'all' and 'any' skill rewards.
 * all: A list of skills that will always be rewarded with xp
 * any: A list of skills that can potentially be rewarded with xp
 * @example { "all": {...}, "any": {...} }
 */
const SKILL_REWARDS = z.object({
  all: z.array(z.literal(SKILLS)).optional(),
  any: z.array(z.literal(SKILLS)).optional()
});

/**
 * An object containing quest rewards.
 * QP: The amount of quest points rewarded
 * skills: {@link SKILL_REWARDS}
 * @example { "QP": 2, "skills": {...} }
 */
export const REWARDS = z.object({
  QP: z.number().optional(),
  skills: SKILL_REWARDS.optional()
});

/**
 * An object detailing a quest.
 * difficulty: The {@link QUEST_DIFFICULTY} of the quest
 * icon: The name of the icon from the wiki
 * length: The {@link QUEST_LENGTH} of the quest
 * name: The name of the quest
 * release: The date of release of the quest
 * requirements: A record of {@link REQUIREMENTS}
 * rewards: A record of {@link REWARDS}
 * @example
 * {
 *   "difficulty": "Master",
 *   "icon": "Scythe of vitur",
 *   "length": "Medium",
 *   "name": "A Night at the Theatre",
 *   "release": "3 June 2021",
 *   "requirements": {...},
 *   "rewards": {...}
 * }
 */
export const QUEST = z.object({
  difficulty: z.literal(QUEST_DIFFICULTY),
  icon: z.string(),
  length: z.literal(QUEST_LENGTH),
  name: z.string(),
  release: z.string(),
  requirements: REQUIREMENTS,
  rewards: REWARDS
});

/* PET */

/**
 * An object detailing a pet.
 * icon: The name of the icon from the wiki
 * name: The name of the pet
 * requirements: A record of {@link REQUIREMENTS}
 * @example
 * {
 *   "icon": "Youngllef",
 *   "name": "Youngllef",
 *   "requirements": {...}
 * }
 */
export const PET = z.object({
  icon: z.string().optional(),
  name: z.string(),
  requirements: REQUIREMENTS
});

/* COLLECTION */

/**
 * An object containing the icon and name of a collection item.
 * icon: The name of the icon from the wiki
 * name: The name of the collection item
 * shared: Other collections the item is shared with
 * @example { "icon": "Graceful boots (Agility Arena)", "name": "Graceful boots" }
 */
export const ITEM = z.object({
  icon: z.string().optional(),
  name: z.string(),
  shared: z.array(z.string()).optional()
});

/**
 * An object containing a collection.
 * icon: The name of the icon from the wiki
 * items: An array of {@link ITEM}
 * name: The name of the collection
 * requirements: A record of {@link REQUIREMENTS}
 */
export const COLLECTION = z.object({
  collection: z.string().optional(),
  icon: z.string(),
  items: z.array(ITEM),
  name: z.string(),
  requirements: REQUIREMENTS
});
