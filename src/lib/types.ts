import type { z } from 'zod/v4';

import type { SKILLS } from '$lib/constants';
import type { ACHIEVEMENT, COLLECTION, PET, QUEST, SKILL } from '$lib/util/schema';

/* SKILLS */

export type Skill = z.infer<typeof SKILL> & { currentLevel: number; isComplete: boolean; isUnlocked: boolean };

export type SkillLiteral = (typeof SKILLS)[number];

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
