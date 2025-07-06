/**
 * Creates a multidimentional array of two indicies, containing items of a given array corresponding to the result of a boolean comparator.
 * @param arr The array to reduce into the result array
 * @param comparator A callback that returns a boolean to determine which index an item gets pushed to in the array
 * @returns {[Array<T>, Array<T>]} Filtered array
 */
export const bifilter = <T>(arr: Array<T>, comparator: (value: T) => boolean): [Array<T>, Array<T>] =>
  arr.reduce(
    (acc, item) => {
      acc[+comparator(item)].push(item);
      return acc;
    },
    [[] as Array<T>, [] as Array<T>]
  );
