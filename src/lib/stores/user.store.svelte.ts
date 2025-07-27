import { getJSONObject, setJSONObject } from '$lib/util/localStorage';

interface UserStore {
  combat: boolean;
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
    get darkMode() {
      return store.darkMode;
    },
    get ironman() {
      return store.ironman;
    },
    get setCombat() {
      return setCombat;
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
