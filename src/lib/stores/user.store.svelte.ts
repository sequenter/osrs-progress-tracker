import { getJSONObject, setJSONObject } from '$lib/util/localStorage';

interface UserStore {
  combatLevel: number;
}

/**
 * User store
 * @returns User store accessors
 */
const createUserStore = () => {
  const store: UserStore = $state(
    getJSONObject('data/user') ?? {
      combatLevel: 3
    }
  );

  /**
   * Set the localStorage user store.
   */
  const storeValue = () => setJSONObject('data/user', store);

  /**
   * Calculate and update combat level - https://oldschool.runescape.wiki/w/Combat_level
   * @param attack
   * @param defence
   * @param hitpoints
   * @param magic
   * @param prayer
   * @param ranged
   * @param strength
   */
  const setCombatLevel = (
    attack: number,
    defence: number,
    hitpoints: number,
    magic: number,
    prayer: number,
    ranged: number,
    strength: number
  ) => {
    store.combatLevel = Math.floor(
      (defence + hitpoints + Math.floor(prayer * 0.5)) * 0.25 +
        Math.max((attack + strength) * 0.325, ranged * 1.5 * 0.325, magic * 1.5 * 0.325)
    );

    storeValue();
  };

  return {
    get combatLevel() {
      return store.combatLevel;
    },
    get setCombatLevel() {
      return setCombatLevel;
    }
  };
};

export const userStore = createUserStore();
