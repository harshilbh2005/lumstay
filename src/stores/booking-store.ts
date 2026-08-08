import {
  differenceInCalendarDays,
  format,
  isAfter,
  isValid,
  parseISO,
} from "date-fns";
import { createStore } from "zustand/vanilla";

import type { Money } from "@/types/domain";

export interface BookingDateRange {
  checkIn: string | null;
  checkOut: string | null;
}

export interface BookingGuests {
  adults: number;
  children: number;
  rooms: number;
}

export interface BookingGuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface BookingProperty {
  id: string;
  slug: string;
  name: string;
  mediaId: string;
  location: {
    city: string;
    country: string;
    region?: string;
  };
}

export interface BookingRoom {
  id: string;
  propertyId: string;
  name: string;
  mediaId: string | null;
  maxGuests: number;
  bedConfiguration: string;
  sizeSquareMetres: number;
  nightlyPrice: Money;
  breakfastIncluded: boolean;
  cancellationPolicy: {
    label: string;
    summary: string;
  };
}

export interface BookingPriceSummary {
  nightlyRate: Money | null;
  nightCount: number | null;
  roomCount: number;
  accommodationSubtotal: Money | null;
}

export interface BookingStoreSeed {
  initializationKey: string;
  dates: BookingDateRange;
  guests: BookingGuests;
  property: BookingProperty;
}

export interface BookingStoreState {
  hydrationStatus: "idle" | "hydrated";
  initializationKey: string | null;
  dates: BookingDateRange;
  guests: BookingGuests;
  property: BookingProperty | null;
  room: BookingRoom | null;
  guestDetails: BookingGuestDetails;
  priceSummary: BookingPriceSummary;
}

export interface BookingStoreActions {
  initializeBooking: (seed: BookingStoreSeed) => void;
  setDates: (dates: BookingDateRange) => void;
  setGuests: (guests: BookingGuests) => void;
  setProperty: (property: BookingProperty | null) => void;
  setRoom: (room: BookingRoom | null) => void;
  setGuestDetails: (guestDetails: BookingGuestDetails) => void;
  resetBooking: () => void;
}

export type BookingStore = BookingStoreState & BookingStoreActions;
export type BookingStoreApi = ReturnType<typeof createBookingStore>;

const defaultGuests: BookingGuests = {
  adults: 2,
  children: 0,
  rooms: 1,
};

const defaultGuestDetails: BookingGuestDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

function getCanonicalDate(value: string | null) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const date = parseISO(value);

  return isValid(date) && format(date, "yyyy-MM-dd") === value ? date : null;
}

function normalizeDates(dates: BookingDateRange): BookingDateRange {
  const checkIn = getCanonicalDate(dates.checkIn);
  const checkOut = getCanonicalDate(dates.checkOut);

  if (!checkIn || !checkOut || !isAfter(checkOut, checkIn)) {
    return { checkIn: null, checkOut: null };
  }

  return {
    checkIn: format(checkIn, "yyyy-MM-dd"),
    checkOut: format(checkOut, "yyyy-MM-dd"),
  };
}

function getBoundedInteger(
  value: number,
  minimum: number,
  maximum: number,
) {
  if (!Number.isFinite(value)) {
    return minimum;
  }

  return Math.min(maximum, Math.max(minimum, Math.trunc(value)));
}

function normalizeGuests(guests: BookingGuests): BookingGuests {
  return {
    adults: getBoundedInteger(guests.adults, 1, 8),
    children: getBoundedInteger(guests.children, 0, 6),
    rooms: getBoundedInteger(guests.rooms, 1, 8),
  };
}

function normalizeGuestDetail(value: string, maximumLength: number) {
  return value.trim().slice(0, maximumLength);
}

function normalizeGuestDetails(
  guestDetails: BookingGuestDetails,
): BookingGuestDetails {
  return {
    firstName: normalizeGuestDetail(guestDetails.firstName, 80),
    lastName: normalizeGuestDetail(guestDetails.lastName, 80),
    email: normalizeGuestDetail(guestDetails.email, 254),
    phone: normalizeGuestDetail(guestDetails.phone, 32),
  };
}

function getNightCount(dates: BookingDateRange) {
  const checkIn = getCanonicalDate(dates.checkIn);
  const checkOut = getCanonicalDate(dates.checkOut);

  if (!checkIn || !checkOut || !isAfter(checkOut, checkIn)) {
    return null;
  }

  return differenceInCalendarDays(checkOut, checkIn);
}

export function getBookingPriceSummary({
  dates,
  guests,
  room,
}: Pick<BookingStoreState, "dates" | "guests" | "room">): BookingPriceSummary {
  const nightCount = getNightCount(dates);
  const nightlyRate = room ? { ...room.nightlyPrice } : null;
  const accommodationSubtotal =
    nightlyRate && nightCount
      ? {
          amount: nightlyRate.amount * nightCount * guests.rooms,
          currency: nightlyRate.currency,
        }
      : null;

  return {
    nightlyRate,
    nightCount,
    roomCount: guests.rooms,
    accommodationSubtotal,
  };
}

export function getDefaultBookingState(): BookingStoreState {
  const dates: BookingDateRange = { checkIn: null, checkOut: null };
  const guests = { ...defaultGuests };

  return {
    hydrationStatus: "idle",
    initializationKey: null,
    dates,
    guests,
    property: null,
    room: null,
    guestDetails: { ...defaultGuestDetails },
    priceSummary: getBookingPriceSummary({ dates, guests, room: null }),
  };
}

function getSeededBookingState(seed: BookingStoreSeed): BookingStoreState {
  const dates = normalizeDates(seed.dates);
  const guests = normalizeGuests(seed.guests);

  return {
    hydrationStatus: "hydrated",
    initializationKey: seed.initializationKey,
    dates,
    guests,
    property: seed.property,
    room: null,
    guestDetails: { ...defaultGuestDetails },
    priceSummary: getBookingPriceSummary({ dates, guests, room: null }),
  };
}

export function createBookingStore(
  initialState: BookingStoreState = getDefaultBookingState(),
) {
  return createStore<BookingStore>()((set) => ({
    ...initialState,
    initializeBooking: (seed) =>
      set((state) => {
        if (
          state.hydrationStatus === "hydrated" &&
          state.initializationKey === seed.initializationKey
        ) {
          return state;
        }

        return getSeededBookingState(seed);
      }),
    setDates: (nextDates) =>
      set((state) => {
        const dates = normalizeDates(nextDates);

        return {
          dates,
          priceSummary: getBookingPriceSummary({
            dates,
            guests: state.guests,
            room: state.room,
          }),
        };
      }),
    setGuests: (nextGuests) =>
      set((state) => {
        const guests = normalizeGuests(nextGuests);

        return {
          guests,
          priceSummary: getBookingPriceSummary({
            dates: state.dates,
            guests,
            room: state.room,
          }),
        };
      }),
    setProperty: (property) =>
      set((state) => {
        const room =
          property && state.room?.propertyId === property.id
            ? state.room
            : null;

        return {
          property,
          room,
          priceSummary: getBookingPriceSummary({
            dates: state.dates,
            guests: state.guests,
            room,
          }),
        };
      }),
    setRoom: (room) =>
      set((state) => {
        if (room && (!state.property || room.propertyId !== state.property.id)) {
          return state;
        }

        return {
          room,
          priceSummary: getBookingPriceSummary({
            dates: state.dates,
            guests: state.guests,
            room,
          }),
        };
      }),
    setGuestDetails: (guestDetails) =>
      set({ guestDetails: normalizeGuestDetails(guestDetails) }),
    resetBooking: () => set(getDefaultBookingState()),
  }));
}
