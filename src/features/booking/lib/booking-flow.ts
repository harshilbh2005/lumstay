import { format, parseISO } from "date-fns";

import { getSearchIntentQueryString } from "@/features/search/lib/search-context";
import type {
  BookingDateRange,
  BookingGuestDetails,
  BookingGuests,
  BookingProperty,
} from "@/stores/booking-store";
import type { Money } from "@/types/domain";

export const roomSelectionSectionId = "casa-serein-room-selection";

export function formatMoney(money: Money) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: money.currency,
    maximumFractionDigits: 0,
  }).format(money.amount);
}

export function formatStayDate(date: string) {
  return format(parseISO(date), "EEE, dd MMM yyyy");
}

export function getGuestLabel(guests: BookingGuests) {
  const guestCount = guests.adults + guests.children;

  return `${guestCount} ${guestCount === 1 ? "guest" : "guests"}`;
}

export function getRoomLabel(roomCount: number) {
  return `${roomCount} ${roomCount === 1 ? "room" : "rooms"}`;
}

export function hasCompleteGuestDetails(
  guestDetails: BookingGuestDetails,
) {
  return Object.values(guestDetails).every(Boolean);
}

export function getStayQuery(
  property: BookingProperty | null,
  dates: BookingDateRange,
  guests: BookingGuests,
) {
  return getSearchIntentQueryString({
    destination: property
      ? `${property.location.city}, ${property.location.country}`
      : "",
    checkIn: dates.checkIn ?? "",
    checkOut: dates.checkOut ?? "",
    adults: guests.adults,
    children: guests.children,
    rooms: guests.rooms,
  });
}
