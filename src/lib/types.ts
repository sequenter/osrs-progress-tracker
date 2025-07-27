import type { z } from 'zod/v4';

import type { SKILLS } from '$lib/constants';
import type {
  ACHIEVEMENT,
  ALL_REQUIREMENT,
  COLLECTION,
  ITEM,
  PET,
  QUEST,
  REQUIREMENTS,
  REWARDS,
  SKILL,
  SKILLS_REQUIREMENT
} from '$lib/util/schema';

/* COMMON */

type ItemStates = { isComplete: boolean; isOnHold: boolean };

export type ItemState = 'complete' | 'locked' | 'unlocked';

export type Requirements = z.infer<typeof REQUIREMENTS>;

export type Requirement = z.infer<typeof ALL_REQUIREMENT>;

/* SKILLS */

export type Skill = z.infer<typeof SKILL> & ItemStates & { currentLevel: number; isUnlocked: boolean };

export type SkillLiteral = (typeof SKILLS)[number];

export type SkillsRequirements = z.infer<typeof SKILLS_REQUIREMENT>;

export type SkillsLevel = Partial<Record<SkillLiteral, number>>;

/* ACHIEVEMENTS */

export type Achievement = z.infer<typeof ACHIEVEMENT> & ItemStates;

/* COLLECTIONS */

export type CollectionItem = z.infer<typeof ITEM> & { isComplete: boolean };

export type Collection = { items: Array<CollectionItem> } & Omit<z.infer<typeof COLLECTION>, 'items'> & ItemStates;

/* PETS */

export type Pet = z.infer<typeof PET> & ItemStates;

/* QUESTS */

export type Quest = z.infer<typeof QUEST> & ItemStates;

export type QuestRewards = z.infer<typeof REWARDS>;
