import { getJSONObject, setJSONObject } from '$lib/util/localStorage';

interface UserStore {
  combat: boolean;
  combatLevel: number;
  darkMode: boolean;
  ironman: boolean;
}

/**
 * User store
 * @returns User store accessors
 */
const createUserStore = () => {
  const store: UserStore = $state(
    getJSONObject('data/user') ?? {
      combat: false,
      combatLevel: 3,
      darkMode: !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
      ironman: false
    }
  );

  /**
   * Set the localStorage user store.
   */
  const storeValue = () => setJSONObject('data/user', store);

  /**
   * Set the combat state.
   * @param {boolean} value
   */
  const setCombat = (value: boolean) => {
    store.combat = value;

    storeValue();
  };

  /**
   * Set dark mode state.
   * @param value
   */
  const setDarkMode = (value: boolean) => {
    store.darkMode = value;

    storeValue();
  };

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

  /**
   * Set the ironman state.
   * @param {boolean} value
   */
  const setIronman = (value: boolean) => {
    store.ironman = value;

    storeValue();
  };

  return {
    get combat() {
      return store.combat;
    },
    get combatLevel() {
      return store.combatLevel;
    },
    get darkMode() {
      return store.darkMode;
    },
    get ironman() {
      return store.ironman;
    },
    get setCombat() {
      return setCombat;
    },
    get setCombatLevel() {
      return setCombatLevel;
    },
    get setDarkMode() {
      return setDarkMode;
    },
    get setIronman() {
      return setIronman;
    }
  };
};

export const userStore = createUserStore();
