import { default as collectionsJson } from '$assets/json/collections.json';

import { createStore } from '$lib/stores/data.store.svelte';
import { questStore } from '$lib/stores/quest.store.svelte';
import { skillStore } from '$lib/stores/skill.store.svelte';
import { userStore } from '$lib/stores/user.store.svelte';
import type { Collection } from '$lib/types';
import { bifilter, isFulfilled } from '$lib/util/array';
import { COLLECTION } from '$lib/util/schema';

/**
 * Collection store, wraps data.store, implements its own complete state functions.
 * @returns Collection store accessors
 */
const createCollectionStore = () => {
  const { combatLevel, totalLevel, unlockedSkills } = $derived(skillStore);
  const { completeQuestsByName, currentQuestPoints } = $derived(questStore);
  const { combat, currentUser, ironman } = $derived(userStore);

  const store = $derived(
    createStore<Collection>(
      `${currentUser ? `${currentUser}:` : ''}data/collections`,
      COLLECTION,
      collectionsJson,
      ({ items, isComplete, isOnHold }, parsedCollection) => ({
        ...parsedCollection,
        isComplete: !!isComplete,
        isOnHold: !!isOnHold,
        items: parsedCollection.items.map((item) => ({ ...item, isComplete: !!items.find(({ name }) => name === item.name)?.isComplete }))
      }),
      (parsedCollection) => ({
        ...parsedCollection,
        isComplete: false,
        isOnHold: false,
        items: parsedCollection.items.map((item) => ({ ...item, isComplete: false }))
      })
    )
  );

  // Locked and unlocked collections
  const [lockedCollections, unlockedCollections] = $derived(
    bifilter(store.incomplete, ({ requirements }) =>
      isFulfilled(requirements, unlockedSkills, completeQuestsByName, currentQuestPoints, combatLevel, totalLevel, combat, ironman)
    )
  );

  // Total amount of unique collections
  const totalCollections = (() => $state.snapshot([...new Set(store.value.map(({ collection, name }) => collection ?? name))].length))();

  // Total amount of unique items within collections
  const totalItems = (() => $state.snapshot([...new Set(store.value.map(({ items }) => items.map(({ name }) => name)).flat())].length))();

  // Total amount of complete unique items within collections
  const totalCompleteItems = $derived(
    [
      ...new Set(
        store.value
          .map(({ items }) => items.reduce((acc, { name, isComplete }) => (isComplete ? [...acc, name] : acc), [] as Array<string>))
          .flat()
      )
    ].length
  );

  /**
   * Updates the main complete state, and every item complete state.
   * @param name The name of the collection
   * @param isComplete Whether or not the collection is complete
   */
  const setComplete = (name: string, isComplete: boolean) => {
    if (name in store.map) {
      // Set collection complete state
      store.value[store.map[name]].isComplete = isComplete;

      // Set all items complete state
      store.value[store.map[name]].items = store.value[store.map[name]].items.map((item) => ({ ...item, isComplete }));

      store.storeValue();
    }
  };

  /**
   * Updates an individual item complete state, as well as the main complete state if all items are complete.
   * @param collectionName The name of the collection
   * @param itemName The name of the item
   * @param isComplete Whether or not the item is complete
   */
  const setItemComplete = (collectionName: string, itemName: string, isComplete: boolean, updateSharedCollection = true) => {
    if (collectionName in store.map) {
      const itemIndex = store.value[store.map[collectionName]].items.findIndex(({ name }) => name === itemName);

      if (itemIndex > -1) {
        // Set item complete state
        store.value[store.map[collectionName]].items[itemIndex].isComplete = isComplete;

        // Set collection complete state if all items are complete
        store.value[store.map[collectionName]].isComplete =
          isComplete && store.value[store.map[collectionName]].items.every(({ isComplete }) => isComplete);

        // Update shared collections
        if (updateSharedCollection) {
          store.value[store.map[collectionName]].items[itemIndex].shared?.forEach((sharedCollection) => {
            const sharedIndex = store.value.findIndex(
              ({ name, items }) =>
                name.startsWith(sharedCollection) && items.some(({ name: sharedItemName }) => sharedItemName === itemName)
            );

            if (sharedIndex > -1) {
              setItemComplete(store.value[sharedIndex].name, itemName, isComplete, false);
            }
          });
        }

        store.storeValue();
      }
    }
  };

  return {
    get completeCollections() {
      return store.complete;
    },
    get incompleteCollections() {
      return store.incomplete;
    },
    get lockedCollections() {
      return lockedCollections;
    },
    get totalCollections() {
      return totalCollections;
    },
    get totalCollectionsComplete() {
      return store.totalComplete;
    },
    get totalCompleteItems() {
      return totalCompleteItems;
    },
    get totalItems() {
      return totalItems;
    },
    get unlockedCollections() {
      return unlockedCollections;
    },
    get setCollectionComplete() {
      return setComplete;
    },
    get setCollectionItemComplete() {
      return setItemComplete;
    },
    get setCollectionOnHold() {
      return store.setOnHold;
    }
  };
};

export const collectionStore = createCollectionStore();
