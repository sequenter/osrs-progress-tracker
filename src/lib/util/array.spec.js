import { bifilter } from './array';

describe('array utilities', () => {
  describe(bifilter, () => {
    it('filters an array with a given comparator', () => {
      const [a, b] = bifilter([1, 2, 3, 4], (value) => value > 2);

      expect(a).toStrictEqual([1, 2]);
      expect(b).toStrictEqual([3, 4]);
    });
  });
});
