import { bifilter } from '$lib/util/array';
import { getJSONObject, setJSONObject } from '$lib/util/localStorage';

/**
 * Generic reactive store for JSON data, updating localStorage on change.  Obtains data from localStorage, or defaults to the given JSON
 * applying a default of 'false' for 'isComplete'.
 * @param key {string} localStorage key
 * @param mapId {string} ID to utilise for lookup map and when setting 'isComplete'
 * @param defaultValue {Array<T>} JSON object corresponding to the given schema to base the store on
 * @returns Store accessors
 */
export const createStore = <T extends { isComplete: boolean }>(key: string, mapId: string, defaultValue: Array<T>) => {
  const value: Array<T> = $state(getJSONObject(key) ?? defaultValue);

  // Split the store into complete and incomplete arrays
  const [incomplete, complete] = $derived(bifilter(value, ({ isComplete }) => isComplete));

  // Total amount of complete items
  const totalComplete = $derived(complete.length);

  // Map the store to id/index pairs for quicker lookup
  const map = value.reduce(
    (acc, item, index) => ({ ...acc, ...(mapId in item && { [item[mapId as keyof typeof item] as string]: index }) }),
    {} as Record<string, number>
  );

  /**
   * Set the given localStorage key with the store value.
   */
  const storeValue = () => setJSONObject(key, value);

  /**
   * Sets the complete state of an item - corresponding to the given id - within the store.
   * @param id ID of the object to update within the store
   * @param isComplete Whether or not the item is complete
   */
  const setComplete = (id: string, isComplete: boolean) => {
    if (id in map) {
      value[map[id]].isComplete = isComplete;
      storeValue();
    }
  };

  return {
    get complete() {
      return complete;
    },
    get incomplete() {
      return incomplete;
    },
    get map() {
      return map;
    },
    get total() {
      return value.length;
    },
    get totalComplete() {
      return totalComplete;
    },
    value,
    get setComplete() {
      return setComplete;
    },
    get storeValue() {
      return storeValue;
    }
  };
};
