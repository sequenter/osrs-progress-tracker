import type { ZodObject } from 'zod/v4';

import { bifilter } from '$lib/util/array';
import { getJSONObject, setJSONObject } from '$lib/util/localStorage';
import { parseJSONArray } from '$lib/util/schema';

/**
 * Generic reactive store for JSON data, updating localStorage on change.  Obtains data from localStorage, or defaults to the given JSON
 * applying a default of 'false' for 'isComplete'.
 * @param key {string} localStorage key
 * @param schema {ZodObject} The schema to parse the JSON with
 * @param json {Array<object>} JSON object to parse
 * @param mapItems Optional callback to map the local and parsed items from localStorage/json
 * @returns Store accessors
 */
export const createStore = <T extends { name: string; isComplete: boolean; isOnHold: boolean }>(
  key: string,
  schema: ZodObject,
  json: Array<object>,
  getLocalMappedItem?: (localItem: T, parsedItem: T) => T,
  getMappedItem?: (parsedItem: T) => T
) => {
  const localItems = getJSONObject<Array<T>>(key);
  const parsedItems = parseJSONArray(schema, json) as Array<T>;

  const value = $state(
    parsedItems.map((item) => {
      const localItem = localItems?.find(({ name }) => name === item.name);

      if (localItem) {
        return getLocalMappedItem
          ? getLocalMappedItem(localItem, item)
          : { ...item, isComplete: !!localItem.isComplete, isOnHold: !!localItem.isOnHold };
      }

      return getMappedItem ? getMappedItem(item) : { ...item, isComplete: false, isOnHold: false };
    })
  );

  // Split the store into complete and incomplete arrays
  const [incomplete, complete] = $derived(bifilter(value, ({ isComplete }) => isComplete));

  // Total amount of complete items
  const totalComplete = $derived(complete.length);

  // Map the store to id/index pairs for quicker lookup
  const map = value.reduce((acc, item, index) => ({ ...acc, [item.name as string]: index }), {} as Record<string, number>);

  /**
   * Set the given localStorage key with the store value.
   */
  const storeValue = () => setJSONObject(key, value);

  /**
   * Sets the complete state of an item - corresponding to the given id - within the store.
   * @param name Name of the object to update within the store
   * @param isComplete Whether or not the item is complete
   */
  const setComplete = (name: string, isComplete: boolean) => {
    if (name in map) {
      value[map[name]].isComplete = isComplete;
      storeValue();
    }
  };

  const setOnHold = (name: string, isOnHold: boolean) => {
    if (name in map) {
      value[map[name]].isOnHold = isOnHold;
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
    get setOnHold() {
      return setOnHold;
    },
    get storeValue() {
      return storeValue;
    }
  };
};
