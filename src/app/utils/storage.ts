export const isBrowser = typeof window !== "undefined";

export const storage = {
  /**
   * Retrieves an item from the session storage.
   * If the item does not exist, it returns the defaultValue.
   * If not in a browser environment, it returns the defaultValue.
   * @template T
   * @param {string} key
   * @param {T | null} [defaultValue=null]
   * @returns {T | null}
   */
  getItem: <T = string>(
    key: string,
    defaultValue: T | null = null
  ): T | null => {
    if (isBrowser) {
      const item = sessionStorage.getItem(key);
      if (item !== null) {
        try {
          return JSON.parse(item) as T;
        } catch {
          return item as T;
        }
      }
    }
    return defaultValue;
  },

  /**
   * Stores an item in the session storage.
   * If not in a browser environment, this is a no-op.
   * @param {string} key
   * @param {unknown} value
   */
  setItem: (key: string, value: unknown): void => {
    if (isBrowser) {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  },

  /**
   * Removes an item from the session storage.
   * If not in a browser environment, this is a no-op.
   * @param {string} key
   */
  removeItem: (key: string): void => {
    if (isBrowser) {
      sessionStorage.removeItem(key);
    }
  },

  clear: (): void => {
    if (isBrowser) {
      sessionStorage.clear();
    }
  },
};
