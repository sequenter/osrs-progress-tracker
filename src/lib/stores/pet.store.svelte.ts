import { createStore } from './data.store.svelte';

import { default as petsJson } from '$assets/json/pets.json';

import type { Pet } from '$lib/types';
import { PET, parseJSONArray } from '$lib/util/schema';

/**
 * Pet store, wraps data.store
 * @returns Pet store accessors
 */
const createPetStore = () => {
  const store = createStore<Pet>(
    'data/pets',
    'name',
    parseJSONArray(PET, petsJson).map((pet) => ({ ...pet, isComplete: false }))
  );

  /**
   * Sets the complete state of a pet.
   * @param name The name of the pet
   * @param isComplete Whether or not the pet is complete
   */
  const setComplete = (name: string, isComplete: boolean) => store.setComplete(name, isComplete);

  return {
    get completePets() {
      return store.complete;
    },
    get incompletePets() {
      return store.incomplete;
    },
    get totalPets() {
      return store.total;
    },
    get totalPetsComplete() {
      return store.totalComplete;
    },
    get setPetComplete() {
      return setComplete;
    }
  };
};

export const petStore = createPetStore();
