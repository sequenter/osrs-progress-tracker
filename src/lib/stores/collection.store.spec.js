import { collectionStore } from './collection.store.svelte';

import { default as collectionsJson } from '$assets/json/collections.json';

const exampleCollectionName = 'Aerial Fishing';
const exampleItemName = 'Fish sack';

describe('collection store', () => {
  let store = collectionStore;

  describe('collections', () => {
    it('contains complete and incomplete collections', () => {
      expect(store.completeCollections).toHaveLength(0);
      expect(store.incompleteCollections).toHaveLength(collectionsJson.length);
      expect(store.incompleteCollections.find(({ name }) => name === exampleCollectionName)).not.toBeUndefined();
    });
  });

  describe('setCollectionComplete', () => {
    it('updates the complete state of a collection', () => {
      store.setCollectionComplete(exampleCollectionName, true);
      expect(store.completeCollections.find(({ name }) => name === exampleCollectionName)).not.toBeUndefined();
      expect(store.incompleteCollections.find(({ name }) => name === exampleCollectionName)).toBeUndefined();
      expect(store.totalCollectionsComplete).toBe(1);
      expect(store.completeCollections[0].items.every(({ isComplete }) => isComplete)).toBeTruthy();

      store.setCollectionComplete(exampleCollectionName, false);
      expect(store.completeCollections.find(({ name }) => name === exampleCollectionName)).toBeUndefined();
      expect(store.incompleteCollections.find(({ name }) => name === exampleCollectionName)).not.toBeUndefined();
      expect(store.totalCollectionsComplete).toBe(0);
      expect(store.incompleteCollections[0].items.every(({ isComplete }) => !isComplete)).toBeTruthy();
    });

    it('updates localStorage', () => {
      store.setCollectionComplete(exampleCollectionName, false);
      expect(
        JSON.parse(localStorage.getItem('data/collections')).find(({ name }) => name === exampleCollectionName)?.isComplete
      ).toBeFalsy();

      store.setCollectionComplete(exampleCollectionName, true);
      expect(
        JSON.parse(localStorage.getItem('data/collections')).find(({ name }) => name === exampleCollectionName)?.isComplete
      ).toBeTruthy();
    });
  });

  describe('setCollectionItemComplete', () => {
    it('updates the complete state of a collection item', () => {
      store.setCollectionItemComplete('Big Fish', 'Big bass', true);

      expect(store.incompleteCollections.find(({ name }) => name === 'Big Fish')?.isComplete).toBeFalsy();
      expect(
        store.incompleteCollections.find(({ name }) => name === 'Big Fish')?.items.find(({ name }) => name === 'Big bass')?.isComplete
      ).toBeTruthy();

      store.setCollectionItemComplete('Big Fish', 'Big shark', true);

      expect(store.incompleteCollections.find(({ name }) => name === 'Big Fish')?.isComplete).toBeFalsy();
      expect(
        store.incompleteCollections.find(({ name }) => name === 'Big Fish')?.items.find(({ name }) => name === 'Big shark')?.isComplete
      ).toBeTruthy();

      store.setCollectionItemComplete('Big Fish', 'Big swordfish', true);

      expect(store.incompleteCollections.find(({ name }) => name === 'Big Fish')).toBeUndefined();
      expect(store.completeCollections.find(({ name }) => name === 'Big Fish')?.isComplete).toBeTruthy();
      expect(
        store.completeCollections.find(({ name }) => name === 'Big Fish')?.items.find(({ name }) => name === 'Big swordfish')?.isComplete
      ).toBeTruthy();
    });

    it('updates localStorage', () => {
      store.setCollectionComplete(exampleCollectionName, false);
      expect(
        JSON.parse(localStorage.getItem('data/collections'))
          .find(({ name }) => name === exampleCollectionName)
          .items.find(({ name }) => name === exampleItemName)?.isComplete
      ).toBeFalsy();

      store.setCollectionItemComplete(exampleCollectionName, exampleItemName, true);
      expect(
        JSON.parse(localStorage.getItem('data/collections'))
          .find(({ name }) => name === exampleCollectionName)
          .items.find(({ name }) => name === exampleItemName)?.isComplete
      ).toBeTruthy();
    });
  });
});
