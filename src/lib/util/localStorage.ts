/**
 * Utilities related to any interactions with the browser's localStorage API.
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
 */

/**
 * Stores a stringified object within localStorage utilising a key.
 * @param key The key of the object to store
 * @param value The object to store
 */
export const setJSONObject = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Get an object from localStorage utilising a key, and parse it as JSON.
 * @param key The key of the object to get
 * @returns Parsed object from the store
 */
export const getJSONObject = <T>(key: string): T | null => {
  const value = localStorage.getItem(key);
  return value && JSON.parse(value);
};

/**
 * Remove a key from localStorage.
 * @param key The key of the object to remove
 */
export const removeJSONObject = (key: string) => {
  localStorage.removeItem(key);
};
