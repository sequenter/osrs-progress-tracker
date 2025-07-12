import { createStore } from './data.store.svelte';

import { default as collectionsJson } from '$assets/json/collections.json';

import type { Collection } from '$lib/types';
import { COLLECTION, parseJSONArray } from '$lib/util/schema';

/**
 * Collection store, wraps data.store, implements its own complete state functions.
 * @returns Collection store accessors
 */
const createCollectionStore = () => {
  const store = createStore<Collection>(
    'data/collections',
    'name',
    parseJSONArray(COLLECTION, collectionsJson).map(({ items, ...rest }) => ({
      ...rest,
      items: items.map((item) => ({ ...item, isComplete: false })),
      id: rest.name,
      isComplete: false
    }))
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
  const setItemComplete = (collectionName: string, itemName: string, isComplete: boolean) => {
    if (collectionName in store.map) {
      const itemIndex = store.value[store.map[collectionName]].items.findIndex(({ name }) => name === itemName);

      if (itemIndex > -1) {
        // Set item complete state
        store.value[store.map[collectionName]].items[itemIndex].isComplete = isComplete;

        // Set collection complete state if all items are complete
        if (isComplete && store.value[store.map[collectionName]].items.every(({ isComplete }) => isComplete)) {
          store.value[store.map[collectionName]].isComplete = true;
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
    get totalCollections() {
      return store.total;
    },
    get totalCollectionsComplete() {
      return store.totalComplete;
    },
    get setCollectionComplete() {
      return setComplete;
    },
    get setCollectionItemComplete() {
      return setItemComplete;
    }
  };
};

export const collectionStore = createCollectionStore();
