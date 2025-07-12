/* COMMON */

export const WIKI_IMAGES_URL = 'https://oldschool.runescape.wiki/images/';
export const WIKI_IMAGES_ERROR = 'https://oldschool.runescape.wiki/images/Bank_filler.png';

export const difficultyColourMap: Record<string, string> = {
  Easy: 'text-green-600 dark:text-green-400',
  Medium: 'text-teal-600 dark:text-teal-400',
  Hard: 'text-purple-600 dark:text-purple-500',
  Elite: 'text-amber-600 dark:text-amber-400'
};

/* ARRAYS */

export const ACHIEVEMENT_DIARIES = [
  'Ardougne',
  'Desert',
  'Falador',
  'Fremennik',
  'Kandarin',
  'Karamja',
  'Kourend & Kebos',
  'Lumbridge & Draynor',
  'Morytania',
  'Varrock',
  'Western Provinces',
  'Wilderness'
] as const;

export const ACHIEVEMENT_DIFFICULTY = ['Easy', 'Medium', 'Hard', 'Elite'] as const;

export const QUEST_DIFFICULTY = ['Novice', 'Intermediate', 'Experienced', 'Master', 'Grandmaster', 'Special'] as const;

export const QUEST_LENGTH = ['Very Short', 'Short', 'Medium', 'Long', 'Very Long'] as const;

export const SKILLS = [
  'Attack',
  'Strength',
  'Defence',
  'Ranged',
  'Prayer',
  'Magic',
  'Hitpoints',
  'Runecraft',
  'Construction',
  'Agility',
  'Herblore',
  'Thieving',
  'Crafting',
  'Fletching',
  'Slayer',
  'Hunter',
  'Mining',
  'Smithing',
  'Fishing',
  'Cooking',
  'Firemaking',
  'Woodcutting',
  'Farming'
] as const;
