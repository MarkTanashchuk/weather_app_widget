import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

export const persistentStore = <T>(key: string, initialValue: T): Writable<T> => {
  const persistedValue: T | null = browser ? JSON.parse(localStorage.getItem(key) || 'null') : null;
  const store = writable(persistedValue || initialValue);

  if (!browser) {
    console.warn(`Persistent store(${key}) was initialized outside of the browser`);
  }

  store.subscribe((value) => {
    if (browser) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  });

  return store;
};
