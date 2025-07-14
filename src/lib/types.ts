import type { z } from 'zod/v4';

import type { SKILLS } from '$lib/constants';
import type { ACHIEVEMENT, COLLECTION, PET, QUEST, REQUIREMENTS, REWARDS, SKILL, SKILLS_REQUIREMENT } from '$lib/util/schema';

/* COMMON */

export type ItemState = 'complete' | 'locked' | 'unlocked';

export type Requirements = z.infer<typeof REQUIREMENTS>;

/* SKILLS */

export type Skill = z.infer<typeof SKILL> & { currentLevel: number; id: string; isComplete: boolean; isUnlocked: boolean };

export type SkillLiteral = (typeof SKILLS)[number];

export type SkillsRequirements = z.infer<typeof SKILLS_REQUIREMENT>;

export type SkillsLevel = Partial<Record<SkillLiteral, number>>;

/* ACHIEVEMENTS */

export type Achievement = z.infer<typeof ACHIEVEMENT> & { id: string; isComplete: boolean };

/* COLLECTIONS */

interface CollectionItem {
  icon: string;
  isComplete: boolean;
  name: string;
}

export type Collection = { items: Array<CollectionItem> } & Omit<z.infer<typeof COLLECTION>, 'items'> & { id: string; isComplete: boolean };

/* PETS */

export type Pet = z.infer<typeof PET> & { id: string; isComplete: boolean };

/* QUESTS */

export type Quest = z.infer<typeof QUEST> & { id: string; isComplete: boolean };

export type QuestRewards = z.infer<typeof REWARDS>;
