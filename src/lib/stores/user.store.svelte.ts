import { getJSONObject, removeJSONObject, setJSONObject } from '$lib/util/localStorage';

interface UserStore {
  combat: boolean;
  currentUser: string;
  darkMode: boolean;
  ironman: boolean;
  users: Array<string>;
  sections: Record<string, boolean>;
}

/**
 * User store
 * @returns User store accessors
 */
const createUserStore = () => {
  const localStore = getJSONObject<UserStore>('data/user');

  const store: UserStore = $state({
    combat: false,
    currentUser: '',
    darkMode: !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
    ironman: false,
    users: [],
    sections: {},
    ...localStore
  });

  /**
   * Set the localStorage user store.
   */
  const storeValue = () => setJSONObject('data/user', store);

  /**
   * Add a user to the user list.
   * @param {string} value
   */
  const addUser = (value: string) => {
    if (value && !store.users.includes(value)) {
      store.users = [...store.users, value];

      storeValue();
    }
  };

  /**
   * Whether or not a section is hidden
   * @param {string} key
   * @returns
   */
  const isSectionHidden = (key: string) => {
    return !!store.sections[key];
  };

  /**
   * Remove a user from the users list.
   * @param {string} value
   */
  const removeUser = (value: string) => {
    if (value && store.users.includes(value)) {
      store.users = store.users.filter((user) => user !== value);

      // Remove stores from localStorage
      ['data/achievements', 'data/collections', 'data/pets', 'data/quests', 'data/skills'].forEach((key) =>
        removeJSONObject(`${value}:${key}`)
      );

      storeValue();
    }
  };

  /**
   * Set the combat state.
   * @param {boolean} value
   */
  const setCombat = (value: boolean) => {
    store.combat = value;

    storeValue();
  };

  /**
   * Set the current user.
   * @param {string} value
   */
  const setCurrentUser = (value: string) => {
    store.currentUser = value === 'default' ? '' : value;

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

  /**
   * Set whether or not a section is hidden.
   * @param {string} key
   * @param {boolean} isHidden
   */
  const setIsSectionHidden = (key: string, isHidden: boolean) => {
    store.sections[key] = isHidden;

    storeValue();
  };

  return {
    get combat() {
      return store.combat;
    },
    get currentUser() {
      return store.currentUser;
    },
    get darkMode() {
      return store.darkMode;
    },
    get ironman() {
      return store.ironman;
    },
    get isSectionHidden() {
      return isSectionHidden;
    },
    get users() {
      return ['default', ...store.users];
    },
    get addUser() {
      return addUser;
    },
    get removeUser() {
      return removeUser;
    },
    get setCombat() {
      return setCombat;
    },
    get setCurrentUser() {
      return setCurrentUser;
    },
    get setDarkMode() {
      return setDarkMode;
    },
    get setIronman() {
      return setIronman;
    },
    get setIsSectionHidden() {
      return setIsSectionHidden;
    }
  };
};

export const userStore = createUserStore();
