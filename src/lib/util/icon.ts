import { default as AgilityIcon } from '$assets/icon/skills/agility.png';
import { default as AttackIcon } from '$assets/icon/skills/attack.png';
import { default as ConstructionIcon } from '$assets/icon/skills/construction.png';
import { default as CookingIcon } from '$assets/icon/skills/cooking.png';
import { default as CraftingIcon } from '$assets/icon/skills/crafting.png';
import { default as DefenceIcon } from '$assets/icon/skills/defence.png';
import { default as FarmingIcon } from '$assets/icon/skills/farming.png';
import { default as FiremakingIcon } from '$assets/icon/skills/firemaking.png';
import { default as FishingIcon } from '$assets/icon/skills/fishing.png';
import { default as FletchingIcon } from '$assets/icon/skills/fletching.png';
import { default as HerbloreIcon } from '$assets/icon/skills/herblore.png';
import { default as HitpointsIcon } from '$assets/icon/skills/hitpoints.png';
import { default as HunterIcon } from '$assets/icon/skills/hunter.png';
import { default as MagicIcon } from '$assets/icon/skills/magic.png';
import { default as MiningIcon } from '$assets/icon/skills/mining.png';
import { default as PrayerIcon } from '$assets/icon/skills/prayer.png';
import { default as RangedIcon } from '$assets/icon/skills/ranged.png';
import { default as RunecraftIcon } from '$assets/icon/skills/runecraft.png';
import { default as SlayerIcon } from '$assets/icon/skills/slayer.png';
import { default as SmithingIcon } from '$assets/icon/skills/smithing.png';
import { default as StrengthIcon } from '$assets/icon/skills/strength.png';
import { default as ThievingIcon } from '$assets/icon/skills/thieving.png';
import { default as WoodcuttingIcon } from '$assets/icon/skills/woodcutting.png';

import type { SkillLiteral } from '$lib/types';

export { default as progressIcon } from '$assets/icon/progress.png';
export { default as statsIcon } from '$assets/icon/stats.png';

export const skillIconMap: Record<SkillLiteral, string> = {
  Agility: AgilityIcon,
  Attack: AttackIcon,
  Construction: ConstructionIcon,
  Cooking: CookingIcon,
  Crafting: CraftingIcon,
  Defence: DefenceIcon,
  Farming: FarmingIcon,
  Firemaking: FiremakingIcon,
  Fishing: FishingIcon,
  Fletching: FletchingIcon,
  Herblore: HerbloreIcon,
  Hitpoints: HitpointsIcon,
  Hunter: HunterIcon,
  Magic: MagicIcon,
  Mining: MiningIcon,
  Prayer: PrayerIcon,
  Ranged: RangedIcon,
  Runecraft: RunecraftIcon,
  Slayer: SlayerIcon,
  Smithing: SmithingIcon,
  Strength: StrengthIcon,
  Thieving: ThievingIcon,
  Woodcutting: WoodcuttingIcon
};
