"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useStore } from "zustand";

import {
  createSavedStaysStore,
  type SavedStaysStore,
  type SavedStaysStoreApi,
} from "@/stores/saved-stays-store";

const SavedStaysStoreContext =
  createContext<SavedStaysStoreApi | null>(null);

export function SavedStaysStoreProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [store] = useState(() => createSavedStaysStore());

  useEffect(() => {
    let isActive = true;

    void Promise.resolve()
      .then(() => store.persist.rehydrate())
      .catch(() => undefined)
      .finally(() => {
        if (isActive) {
          store.getState().finishHydration();
        }
      });

    return () => {
      isActive = false;
    };
  }, [store]);

  return (
    <SavedStaysStoreContext.Provider value={store}>
      {children}
    </SavedStaysStoreContext.Provider>
  );
}

export function useSavedStaysStore<T>(
  selector: (store: SavedStaysStore) => T,
): T {
  const store = useContext(SavedStaysStoreContext);

  if (!store) {
    throw new Error(
      "useSavedStaysStore must be used within SavedStaysStoreProvider",
    );
  }

  return useStore(store, selector);
}
