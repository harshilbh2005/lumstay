"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useStore } from "zustand";

import {
  createBookingStore,
  type BookingStore,
  type BookingStoreApi,
} from "@/stores/booking-store";

const BookingStoreContext = createContext<BookingStoreApi | null>(null);

export function BookingStoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => createBookingStore());

  return (
    <BookingStoreContext.Provider value={store}>
      {children}
    </BookingStoreContext.Provider>
  );
}

export function useBookingStore<T>(
  selector: (store: BookingStore) => T,
): T {
  const store = useContext(BookingStoreContext);

  if (!store) {
    throw new Error(
      "useBookingStore must be used within BookingStoreProvider",
    );
  }

  return useStore(store, selector);
}
