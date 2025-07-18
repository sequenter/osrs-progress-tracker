import { default as petsJson } from '$assets/json/pets.json';

import { createStore } from '$lib/stores/data.store.svelte';
import { questStore } from '$lib/stores/quest.store.svelte';
import { skillStore } from '$lib/stores/skill.store.svelte';
import { userStore } from '$lib/stores/user.store.svelte';
import type { Pet } from '$lib/types';
import { bifilter, isFulfilled } from '$lib/util/array';
import { PET } from '$lib/util/schema';

/**
 * Pet store, wraps data.store
 * @returns Pet store accessors
 */
const createPetStore = () => {
  const store = createStore<Pet>('data/pets', PET, petsJson);

  const { unlockedSkills } = $derived(skillStore);
  const { completeQuestsByName, currentQuestPoints } = $derived(questStore);
  const { combat, combatLevel, ironman } = $derived(userStore);

  // Locked and unlocked pets
  const [lockedPets, unlockedPets] = $derived(
    bifilter(store.incomplete, ({ requirements }) =>
      isFulfilled(requirements, unlockedSkills, completeQuestsByName, currentQuestPoints, combatLevel, combat, ironman)
    )
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
    get lockedPets() {
      return lockedPets;
    },
    get totalPets() {
      return store.total;
    },
    get totalPetsComplete() {
      return store.totalComplete;
    },
    get unlockedPets() {
      return unlockedPets;
    },
    get setPetComplete() {
      return setComplete;
    }
  };
};

export const petStore = createPetStore();
