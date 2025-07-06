import { petStore } from './pet.store.svelte';

import { default as petsJson } from '$assets/json/pets.json';

const exampleName = 'Heron';

describe('pet store', () => {
  let store = petStore;

  describe('pets', () => {
    it('contains complete and incomplete pets', () => {
      expect(store.completePets).toHaveLength(0);
      expect(store.incompletePets).toHaveLength(petsJson.length);
      expect(store.incompletePets.find(({ name }) => name === exampleName)).not.toBeUndefined();
    });
  });

  describe('setPetComplete', () => {
    it('updates the complete state of a pet', () => {
      store.setPetComplete(exampleName, true);
      expect(store.completePets.find(({ name }) => name === exampleName)).not.toBeUndefined();
      expect(store.incompletePets.find(({ name }) => name === exampleName)).toBeUndefined();
      expect(store.totalPetsComplete).toBe(1);

      store.setPetComplete(exampleName, false);
      expect(store.completePets.find(({ name }) => name === exampleName)).toBeUndefined();
      expect(store.incompletePets.find(({ name }) => name === exampleName)).not.toBeUndefined();
      expect(store.totalPetsComplete).toBe(0);
    });
  });
});
