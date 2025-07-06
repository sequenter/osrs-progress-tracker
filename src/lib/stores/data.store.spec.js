import { createStore } from './data.store.svelte';

const exampleKey = 'foo';

const exampleMapId = 'bar';

const exampleJson = [
  {
    bar: 'baz'
  }
];

const exampleObject = [
  {
    bar: 'fizzbuzz',
    isComplete: false
  }
];

describe('generic store', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('store', () => {
    it('creates a default store', () => {
      let store = createStore(
        exampleKey,
        exampleMapId,
        exampleJson.map((example) => ({ ...example, isComplete: false }))
      );

      expect(store.value).toHaveLength(1);
      expect(store.value[0].bar).toBe('baz');
      expect(store.value[0].isComplete).not.toBeUndefined();
    });

    it('gets the store from localStorage', () => {
      localStorage.setItem(exampleKey, JSON.stringify(exampleObject));

      let store = createStore(exampleKey, exampleMapId, exampleJson);

      expect(store.value).toHaveLength(1);
      expect(store.value[0].bar).toBe('fizzbuzz');
    });
  });

  describe('setComplete', () => {
    it('updates the complete state', () => {
      localStorage.setItem(exampleKey, JSON.stringify(exampleObject));

      let store = createStore(exampleKey, exampleMapId);

      expect(store.value[0].isComplete).toBeFalsy();

      store.setComplete('fizzbuzz', true);
      expect(store.value[0].isComplete).toBeTruthy();
    });
  });

  describe('total and incomplete', () => {
    localStorage.setItem(exampleKey, JSON.stringify(exampleObject));
    let store = createStore(exampleKey, exampleMapId);

    it('splits the store into complete and incomplete arrays', () => {
      expect(store.complete).toHaveLength(0);
      expect(store.incomplete).toHaveLength(1);
    });

    it('updates the complete and incomplete arrays', () => {
      store.setComplete('fizzbuzz', true);

      expect(store.complete).toHaveLength(1);
      expect(store.incomplete).toHaveLength(0);
    });
  });

  describe('total', () => {
    localStorage.setItem(exampleKey, JSON.stringify(exampleObject));
    let store = createStore(exampleKey, exampleMapId);

    it('totals are as expected', () => {
      expect(store.total).toBe(1);
      expect(store.totalComplete).toBe(0);
    });

    it('updates the totals', () => {
      store.setComplete('fizzbuzz', true);

      expect(store.totalComplete).toBe(1);
    });
  });

  describe('storeValue', () => {
    localStorage.setItem(exampleKey, JSON.stringify(exampleObject));
    let store = createStore(exampleKey, exampleMapId);

    it('stores the value', () => {
      store.setComplete('fizzbuzz', false);
      expect(JSON.parse(localStorage.getItem(exampleKey)).find(({ bar }) => bar === 'fizzbuzz')?.isComplete).toBeFalsy();

      store.setComplete('fizzbuzz', true);
      expect(JSON.parse(localStorage.getItem(exampleKey)).find(({ bar }) => bar === 'fizzbuzz')?.isComplete).toBeTruthy();
    });
  });
});
