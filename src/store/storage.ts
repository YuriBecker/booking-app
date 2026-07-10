const runStorageOperation = <T>(operation: () => T): Promise<T> =>
  new Promise((resolve) => resolve(operation()));

const storage = {
  getItem(key: string) {
    return runStorageOperation(() => window.localStorage.getItem(key));
  },
  setItem(key: string, value: string) {
    return runStorageOperation(() => window.localStorage.setItem(key, value));
  },
  removeItem(key: string) {
    return runStorageOperation(() => window.localStorage.removeItem(key));
  },
};

export default storage;
