import { getJSONObject, setJSONObject } from './localStorage';

const exampleObject = {
  foo: 'bar',
  fizz: 2,
  bang: true
};

const exampleKey = 'test/key';

describe('localStorage utilities', () => {
  afterEach(() => {
    localStorage.clear();
  });

  describe('storeJSONObject', () => {
    it('Stores an object on localStorage', () => {
      setJSONObject(exampleKey, exampleObject);
      expect(JSON.parse(localStorage.getItem(exampleKey) || "''")).toStrictEqual(exampleObject);
    });
  });

  describe('retrieveJSONObject', () => {
    it('returns null if localStorage does not contain the given key', () => {
      expect(getJSONObject(exampleKey)).toBeNull();
    });

    it('returns an object from localStorage', () => {
      localStorage.setItem(exampleKey, JSON.stringify(exampleObject));
      expect(getJSONObject(exampleKey)).toStrictEqual(exampleObject);
    });
  });
});
