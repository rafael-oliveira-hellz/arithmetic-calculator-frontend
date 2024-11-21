import { storage } from './storage';

describe('storage utility', () => {
  const mockSessionStorage = (() => {
    let store: Record<string, string> = {};

    return {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        store = {};
      })
    };
  })();

  beforeAll(() => {
    Object.defineProperty(window, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockSessionStorage.clear();
  });

  describe('non-browser environment', () => {
    it('should return defaultValue for getItem in non-browser environment', () => {
      const result = storage.getItem<string>('key', 'default');
      expect(result).toBe('default');
    });

    it('should not throw for setItem in non-browser environment', () => {
      expect(() => storage.setItem('key', 'value')).not.toThrow();
    });

    it('should not throw for removeItem in non-browser environment', () => {
      expect(() => storage.removeItem('key')).not.toThrow();
    });

    it('should not throw for clear in non-browser environment', () => {
      expect(() => storage.clear()).not.toThrow();
    });
  });

  describe('browser environment', () => {
    it('should store and retrieve items correctly', () => {
      const key = 'testKey';
      const value = { data: 'testValue' };

      storage.setItem(key, value);
      const retrievedValue = storage.getItem<typeof value>(key);

      expect(retrievedValue).toEqual(value);
      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        key,
        JSON.stringify(value)
      );
      expect(sessionStorage.getItem).toHaveBeenCalledWith(key);
    });

    it('should remove items correctly', () => {
      const key = 'testKey';
      storage.setItem(key, 'value');
      storage.removeItem(key);

      expect(sessionStorage.removeItem).toHaveBeenCalledWith(key);
      expect(sessionStorage.getItem(key)).toBeNull();
    });

    it('should clear all items correctly', () => {
      storage.setItem('key1', 'value1');
      storage.setItem('key2', 'value2');
      storage.clear();

      expect(sessionStorage.clear).toHaveBeenCalled();
      expect(sessionStorage.getItem('key1')).toBeNull();
      expect(sessionStorage.getItem('key2')).toBeNull();
    });
  });
});
