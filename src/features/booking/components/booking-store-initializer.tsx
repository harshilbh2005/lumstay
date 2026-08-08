"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { useBookingStore } from "@/components/providers/booking-store-provider";
import {
  createBookingStoreSeed,
  getBookingSearchValues,
} from "@/features/booking/lib/booking-store-seed";
import type { BookingProperty } from "@/stores/booking-store";

export function BookingStoreInitializer({
  property,
}: {
  property: BookingProperty;
}) {
  const searchParams = useSearchParams();
  const initializeBooking = useBookingStore(
    (state) => state.initializeBooking,
  );
  const seed = useMemo(
    () =>
      createBookingStoreSeed(
        property,
        getBookingSearchValues(searchParams),
      ),
    [property, searchParams],
  );

  useEffect(() => {
    initializeBooking(seed);
  }, [initializeBooking, seed]);

  return null;
}
