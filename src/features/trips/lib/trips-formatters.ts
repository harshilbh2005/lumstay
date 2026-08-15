import type {
  BookingGuestParty,
  BookingHistoryBase,
  Money,
} from "@/types/domain";

const stayDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const moneyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatTripDate(date: string) {
  return stayDateFormatter.format(new Date(`${date}T00:00:00.000Z`));
}

export function formatTripEventDate(timestamp: string) {
  return stayDateFormatter.format(new Date(timestamp));
}

export function formatTripMoney(money: Money) {
  return moneyFormatter.format(money.amount);
}

export function getTripGuestLabel(guests: BookingGuestParty) {
  const guestCount = guests.adults + guests.children;

  return `${guestCount} ${guestCount === 1 ? "guest" : "guests"}`;
}

export function getTripRoomLabel(roomCount: number) {
  return `${roomCount} ${roomCount === 1 ? "room" : "rooms"}`;
}

export function getTripLocationLabel(booking: BookingHistoryBase) {
  const { city, country, region } = booking.property.location;

  return region ? `${region}, ${country}` : `${city}, ${country}`;
}

export function getRepeatSearchHref(booking: BookingHistoryBase) {
  const params = new URLSearchParams({
    destination: `${booking.property.location.city}, ${booking.property.location.country}`,
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    adults: String(booking.guests.adults),
    children: String(booking.guests.children),
    rooms: String(booking.guests.rooms),
  });

  return `/search?${params.toString()}`;
}
