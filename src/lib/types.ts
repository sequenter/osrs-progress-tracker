import type { z } from 'zod/v4';

import type { SKILLS } from '$lib/constants';
import type {
  ACHIEVEMENT,
  ALL_REQUIREMENT,
  COLLECTION,
  PET,
  QUEST,
  REQUIREMENTS,
  REWARDS,
  SKILL,
  SKILLS_REQUIREMENT
} from '$lib/util/schema';

/* COMMON */

export type ItemState = 'complete' | 'locked' | 'unlocked';

export type Requirements = z.infer<typeof REQUIREMENTS>;

export type Requirement = z.infer<typeof ALL_REQUIREMENT>;

/* SKILLS */

export type Skill = z.infer<typeof SKILL> & { currentLevel: number; isComplete: boolean; isUnlocked: boolean };

export type SkillLiteral = (typeof SKILLS)[number];

export type SkillsRequirements = z.infer<typeof SKILLS_REQUIREMENT>;

export type SkillsLevel = Partial<Record<SkillLiteral, number>>;

/* ACHIEVEMENTS */

export type Achievement = z.infer<typeof ACHIEVEMENT> & { isComplete: boolean };

/* COLLECTIONS */

interface CollectionItem {
  icon: string;
  isComplete: boolean;
  name: string;
}

export type Collection = { items: Array<CollectionItem> } & Omit<z.infer<typeof COLLECTION>, 'items'> & { isComplete: boolean };

/* PETS */

export type Pet = z.infer<typeof PET> & { isComplete: boolean };

/* QUESTS */

export type Quest = z.infer<typeof QUEST> & { isComplete: boolean };

export type QuestRewards = z.infer<typeof REWARDS>;
