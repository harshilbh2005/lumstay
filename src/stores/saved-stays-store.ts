import { createStore } from "zustand/vanilla";
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from "zustand/middleware";

export const SAVED_STAYS_STORAGE_KEY = "lumastay:saved-stays";
export const SAVED_STAYS_STORAGE_VERSION = 1;

const MAX_SAVED_STAYS = 100;
const MAX_PROPERTY_ID_LENGTH = 160;

export interface SavedStaysPersistedState {
  savedPropertyIds: string[];
}

export interface SavedStaysStoreState extends SavedStaysPersistedState {
  hydrationStatus: "pending" | "hydrated";
}

export interface SavedStaysStoreActions {
  saveStay: (propertyId: string) => void;
  removeSavedStay: (propertyId: string) => void;
  toggleSavedStay: (propertyId: string) => boolean;
  clearSavedStays: () => void;
  finishHydration: () => void;
}

export type SavedStaysStore = SavedStaysStoreState &
  SavedStaysStoreActions;
export type SavedStaysStoreApi = ReturnType<
  typeof createSavedStaysStore
>;

const browserStorage: StateStorage = {
  getItem: (name) => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      return window.localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(name, value);
    } catch {
      // Saving still works for the current browser session when storage is blocked.
    }
  },
  removeItem: (name) => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.removeItem(name);
    } catch {
      // Clearing the in-memory state remains useful when storage is blocked.
    }
  },
};

function normalizePropertyId(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const propertyId = value.trim();

  return propertyId && propertyId.length <= MAX_PROPERTY_ID_LENGTH
    ? propertyId
    : null;
}

function normalizeSavedPropertyIds(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  const normalizedIds: string[] = [];
  const seenIds = new Set<string>();

  for (const valueItem of value) {
    const propertyId = normalizePropertyId(valueItem);

    if (!propertyId || seenIds.has(propertyId)) {
      continue;
    }

    normalizedIds.push(propertyId);
    seenIds.add(propertyId);

    if (normalizedIds.length === MAX_SAVED_STAYS) {
      break;
    }
  }

  return normalizedIds;
}

function getPersistedState(value: unknown): SavedStaysPersistedState {
  if (!value || typeof value !== "object") {
    return { savedPropertyIds: [] };
  }

  return {
    savedPropertyIds: normalizeSavedPropertyIds(
      (value as Partial<SavedStaysPersistedState>).savedPropertyIds,
    ),
  };
}

export function getDefaultSavedStaysState(): SavedStaysStoreState {
  return {
    savedPropertyIds: [],
    hydrationStatus: "pending",
  };
}

export function createSavedStaysStore(
  initialState: SavedStaysStoreState = getDefaultSavedStaysState(),
) {
  return createStore<SavedStaysStore>()(
    persist(
      (set) => ({
        ...initialState,
        saveStay: (propertyIdValue) => {
          const propertyId = normalizePropertyId(propertyIdValue);

          if (!propertyId) {
            return;
          }

          set((state) => {
            if (state.savedPropertyIds.includes(propertyId)) {
              return state;
            }

            return {
              savedPropertyIds: [
                propertyId,
                ...state.savedPropertyIds,
              ].slice(0, MAX_SAVED_STAYS),
            };
          });
        },
        removeSavedStay: (propertyIdValue) => {
          const propertyId = normalizePropertyId(propertyIdValue);

          if (!propertyId) {
            return;
          }

          set((state) => ({
            savedPropertyIds: state.savedPropertyIds.filter(
              (savedPropertyId) => savedPropertyId !== propertyId,
            ),
          }));
        },
        toggleSavedStay: (propertyIdValue) => {
          const propertyId = normalizePropertyId(propertyIdValue);

          if (!propertyId) {
            return false;
          }

          let isSaved = false;

          set((state) => {
            isSaved = !state.savedPropertyIds.includes(propertyId);

            return {
              savedPropertyIds: isSaved
                ? [propertyId, ...state.savedPropertyIds].slice(
                    0,
                    MAX_SAVED_STAYS,
                  )
                : state.savedPropertyIds.filter(
                    (savedPropertyId) => savedPropertyId !== propertyId,
                  ),
            };
          });

          return isSaved;
        },
        clearSavedStays: () => set({ savedPropertyIds: [] }),
        finishHydration: () => set({ hydrationStatus: "hydrated" }),
      }),
      {
        name: SAVED_STAYS_STORAGE_KEY,
        version: SAVED_STAYS_STORAGE_VERSION,
        storage: createJSONStorage<SavedStaysPersistedState>(
          () => browserStorage,
        ),
        partialize: (state) => ({
          savedPropertyIds: state.savedPropertyIds,
        }),
        migrate: (persistedState) => getPersistedState(persistedState),
        merge: (persistedState, currentState) => ({
          ...currentState,
          ...getPersistedState(persistedState),
        }),
        skipHydration: true,
      },
    ),
  );
}
