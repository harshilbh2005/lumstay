import {
  differenceInCalendarDays,
  format,
  isAfter,
  isValid,
  parseISO,
} from "date-fns";
import { createStore } from "zustand/vanilla";

import type { BookingPricingPolicy, Money } from "@/types/domain";

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
  pricingPolicy: BookingPricingPolicy;
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
    terms: string[];
    chargeSchedule: {
      timing: string;
      chargeBasisPoints: number;
    }[];
  };
  ratePlan: {
    inclusions: string[];
    exclusions: string[];
  };
}

export interface BookingCancellationCharge {
  timing: string;
  chargeBasisPoints: number;
  amount: Money;
}

export interface BookingPriceSummary {
  nightlyRate: Money | null;
  nightCount: number | null;
  roomCount: number;
  accommodationSubtotal: Money | null;
  estimatedTaxAmount: Money | null;
  serviceFeeAmount: Money | null;
  totalPrice: Money | null;
  taxRateBasisPoints: number | null;
  serviceFeePerRoom: Money | null;
  cancellationCharges: BookingCancellationCharge[];
}

export interface CompleteBookingPriceSummary extends BookingPriceSummary {
  nightlyRate: Money;
  nightCount: number;
  accommodationSubtotal: Money;
  estimatedTaxAmount: Money;
  serviceFeeAmount: Money;
  totalPrice: Money;
  taxRateBasisPoints: number;
  serviceFeePerRoom: Money;
}

export interface BookingMaskedPayment {
  cardholderName: string;
  lastFour: string;
  expiry: string;
}

export interface BookingConfirmation {
  reference: string;
  property: BookingProperty;
  room: BookingRoom;
  dates: {
    checkIn: string;
    checkOut: string;
  };
  guests: BookingGuests;
  guestDetails: BookingGuestDetails;
  priceSummary: CompleteBookingPriceSummary;
  maskedPayment: BookingMaskedPayment;
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
  confirmation: BookingConfirmation | null;
}

export interface BookingStoreActions {
  initializeBooking: (seed: BookingStoreSeed) => void;
  setDates: (dates: BookingDateRange) => void;
  setGuests: (guests: BookingGuests) => void;
  setProperty: (property: BookingProperty | null) => void;
  setRoom: (room: BookingRoom | null) => void;
  setGuestDetails: (guestDetails: BookingGuestDetails) => void;
  createMockConfirmation: (maskedPayment: BookingMaskedPayment) => boolean;
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

function getReferenceCode(value: string, fallback: string) {
  const code = value
    .split(/[^a-z0-9]+/i)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return code || fallback;
}

export function getMockBookingReference({
  property,
  room,
  checkIn,
}: {
  property: BookingProperty;
  room: BookingRoom;
  checkIn: string;
}) {
  const stayCode = checkIn.replaceAll("-", "").slice(2);
  const propertyCode = getReferenceCode(property.name, "STY");
  const roomCode = getReferenceCode(room.name, "RM");

  return `LUMA-MOCK-${propertyCode}-${roomCode}-${stayCode}`;
}

function cloneBookingProperty(property: BookingProperty): BookingProperty {
  return {
    ...property,
    location: { ...property.location },
    pricingPolicy: {
      estimatedTax: { ...property.pricingPolicy.estimatedTax },
      serviceFee: {
        ...property.pricingPolicy.serviceFee,
        amountPerRoom: {
          ...property.pricingPolicy.serviceFee.amountPerRoom,
        },
      },
    },
  };
}

function cloneBookingRoom(room: BookingRoom): BookingRoom {
  return {
    ...room,
    nightlyPrice: { ...room.nightlyPrice },
    cancellationPolicy: {
      ...room.cancellationPolicy,
      terms: [...room.cancellationPolicy.terms],
      chargeSchedule: room.cancellationPolicy.chargeSchedule.map((rule) => ({
        ...rule,
      })),
    },
    ratePlan: {
      inclusions: [...room.ratePlan.inclusions],
      exclusions: [...room.ratePlan.exclusions],
    },
  };
}

function cloneCompletePriceSummary(
  priceSummary: CompleteBookingPriceSummary,
): CompleteBookingPriceSummary {
  return {
    ...priceSummary,
    nightlyRate: { ...priceSummary.nightlyRate },
    accommodationSubtotal: { ...priceSummary.accommodationSubtotal },
    estimatedTaxAmount: { ...priceSummary.estimatedTaxAmount },
    serviceFeeAmount: { ...priceSummary.serviceFeeAmount },
    totalPrice: { ...priceSummary.totalPrice },
    serviceFeePerRoom: { ...priceSummary.serviceFeePerRoom },
    cancellationCharges: priceSummary.cancellationCharges.map((charge) => ({
      ...charge,
      amount: { ...charge.amount },
    })),
  };
}

function normalizeMaskedPayment(
  maskedPayment: BookingMaskedPayment,
): BookingMaskedPayment | null {
  const cardholderName = normalizeGuestDetail(
    maskedPayment.cardholderName,
    80,
  );
  const lastFour = maskedPayment.lastFour.replace(/\D/g, "");
  const expiry = maskedPayment.expiry.replace(/\s/g, "");

  if (
    !cardholderName ||
    !/^\d{4}$/.test(lastFour) ||
    !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)
  ) {
    return null;
  }

  return { cardholderName, lastFour, expiry };
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
  property,
  room,
}: Pick<
  BookingStoreState,
  "dates" | "guests" | "property" | "room"
>): BookingPriceSummary {
  const nightCount = getNightCount(dates);
  const nightlyRate = room ? { ...room.nightlyPrice } : null;
  const accommodationSubtotal =
    nightlyRate && nightCount
      ? {
          amount: nightlyRate.amount * nightCount * guests.rooms,
          currency: nightlyRate.currency,
        }
      : null;
  const pricingPolicy = property?.pricingPolicy ?? null;
  const canApplyPricingPolicy =
    accommodationSubtotal &&
    pricingPolicy &&
    pricingPolicy.serviceFee.amountPerRoom.currency ===
      accommodationSubtotal.currency;
  const estimatedTaxAmount = canApplyPricingPolicy
    ? {
        amount: Math.round(
          (accommodationSubtotal.amount *
            pricingPolicy.estimatedTax.rateBasisPoints) /
            10000,
        ),
        currency: accommodationSubtotal.currency,
      }
    : null;
  const serviceFeeAmount = canApplyPricingPolicy
    ? {
        amount:
          pricingPolicy.serviceFee.amountPerRoom.amount * guests.rooms,
        currency: accommodationSubtotal.currency,
      }
    : null;
  const totalPrice =
    accommodationSubtotal && estimatedTaxAmount && serviceFeeAmount
      ? {
          amount:
            accommodationSubtotal.amount +
            estimatedTaxAmount.amount +
            serviceFeeAmount.amount,
          currency: accommodationSubtotal.currency,
        }
      : null;
  const cancellationCharges =
    accommodationSubtotal && room
      ? room.cancellationPolicy.chargeSchedule.map((rule) => ({
          timing: rule.timing,
          chargeBasisPoints: rule.chargeBasisPoints,
          amount: {
            amount: Math.round(
              (accommodationSubtotal.amount * rule.chargeBasisPoints) / 10000,
            ),
            currency: accommodationSubtotal.currency,
          },
        }))
      : [];

  return {
    nightlyRate,
    nightCount,
    roomCount: guests.rooms,
    accommodationSubtotal,
    estimatedTaxAmount,
    serviceFeeAmount,
    totalPrice,
    taxRateBasisPoints: pricingPolicy?.estimatedTax.rateBasisPoints ?? null,
    serviceFeePerRoom: pricingPolicy
      ? { ...pricingPolicy.serviceFee.amountPerRoom }
      : null,
    cancellationCharges,
  };
}

export function hasCompleteBookingPriceSummary(
  priceSummary: BookingPriceSummary,
): priceSummary is CompleteBookingPriceSummary {
  return Boolean(
    priceSummary.nightlyRate &&
      priceSummary.nightCount &&
      priceSummary.accommodationSubtotal &&
      priceSummary.estimatedTaxAmount &&
      priceSummary.serviceFeeAmount &&
      priceSummary.totalPrice &&
      priceSummary.taxRateBasisPoints !== null &&
      priceSummary.serviceFeePerRoom,
  );
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
    confirmation: null,
    priceSummary: getBookingPriceSummary({
      dates,
      guests,
      property: null,
      room: null,
    }),
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
    confirmation: null,
    priceSummary: getBookingPriceSummary({
      dates,
      guests,
      property: seed.property,
      room: null,
    }),
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

        const dates = normalizeDates(seed.dates);
        const guests = normalizeGuests(seed.guests);
        const isMatchingPropertyState =
          state.hydrationStatus === "hydrated" &&
          state.property?.id === seed.property.id &&
          state.dates.checkIn === dates.checkIn &&
          state.dates.checkOut === dates.checkOut &&
          state.guests.adults === guests.adults &&
          state.guests.children === guests.children &&
          state.guests.rooms === guests.rooms;

        if (isMatchingPropertyState) {
          return {
            ...state,
            initializationKey: seed.initializationKey,
            property: seed.property,
            priceSummary: getBookingPriceSummary({
              dates: state.dates,
              guests: state.guests,
              property: seed.property,
              room: state.room,
            }),
          };
        }

        return getSeededBookingState(seed);
      }),
    setDates: (nextDates) =>
      set((state) => {
        const dates = normalizeDates(nextDates);

        return {
          dates,
          confirmation: null,
          priceSummary: getBookingPriceSummary({
            dates,
            guests: state.guests,
            property: state.property,
            room: state.room,
          }),
        };
      }),
    setGuests: (nextGuests) =>
      set((state) => {
        const guests = normalizeGuests(nextGuests);

        return {
          guests,
          confirmation: null,
          priceSummary: getBookingPriceSummary({
            dates: state.dates,
            guests,
            property: state.property,
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
          confirmation: null,
          priceSummary: getBookingPriceSummary({
            dates: state.dates,
            guests: state.guests,
            property,
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
          confirmation: null,
          priceSummary: getBookingPriceSummary({
            dates: state.dates,
            guests: state.guests,
            property: state.property,
            room,
          }),
        };
      }),
    setGuestDetails: (guestDetails) =>
      set({
        guestDetails: normalizeGuestDetails(guestDetails),
        confirmation: null,
      }),
    createMockConfirmation: (maskedPayment) => {
      let didCreate = false;

      set((state) => {
        const normalizedPayment = normalizeMaskedPayment(maskedPayment);

        if (
          !normalizedPayment ||
          !state.property ||
          !state.room ||
          !state.dates.checkIn ||
          !state.dates.checkOut ||
          !Object.values(state.guestDetails).every(Boolean) ||
          !hasCompleteBookingPriceSummary(state.priceSummary)
        ) {
          return state;
        }

        didCreate = true;

        return {
          confirmation: {
            reference: getMockBookingReference({
              property: state.property,
              room: state.room,
              checkIn: state.dates.checkIn,
            }),
            property: cloneBookingProperty(state.property),
            room: cloneBookingRoom(state.room),
            dates: {
              checkIn: state.dates.checkIn,
              checkOut: state.dates.checkOut,
            },
            guests: { ...state.guests },
            guestDetails: { ...state.guestDetails },
            priceSummary: cloneCompletePriceSummary(state.priceSummary),
            maskedPayment: normalizedPayment,
          },
        };
      });

      return didCreate;
    },
    resetBooking: () => set(getDefaultBookingState()),
  }));
}
