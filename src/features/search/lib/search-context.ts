import { format, isAfter, isValid, parseISO } from "date-fns";

export type SearchParamValue = string | string[] | undefined;

export interface SearchContext {
  destination: string;
  dates: string;
  guests: string;
}

const defaultDestination = "Across the LumaStay world";

function getSingleValue(value: SearchParamValue) {
  return Array.isArray(value) ? value[0] : value;
}

function getBoundedInteger(
  value: SearchParamValue,
  minimum: number,
  maximum: number,
  fallback: number,
) {
  const integerString = getSingleValue(value);

  if (!integerString || !/^-?\d+$/.test(integerString)) {
    return fallback;
  }

  const parsed = Number.parseInt(integerString, 10);

  return Number.isInteger(parsed) && parsed >= minimum && parsed <= maximum
    ? parsed
    : fallback;
}

function getDate(value: SearchParamValue) {
  const dateString = getSingleValue(value);

  if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return null;
  }

  const date = parseISO(dateString);

  return isValid(date) && format(date, "yyyy-MM-dd") === dateString
    ? date
    : null;
}

function formatDateRange(checkIn: SearchParamValue, checkOut: SearchParamValue) {
  const start = getDate(checkIn);
  const end = getDate(checkOut);

  if (!start || !end || !isAfter(end, start)) {
    return "Any dates";
  }

  if (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth()
  ) {
    return `${format(start, "dd")}–${format(end, "dd MMM yyyy")}`;
  }

  if (start.getFullYear() === end.getFullYear()) {
    return `${format(start, "dd MMM")}–${format(end, "dd MMM yyyy")}`;
  }

  return `${format(start, "dd MMM yyyy")}–${format(end, "dd MMM yyyy")}`;
}

export function getSearchContext(
  params: Record<string, SearchParamValue>,
): SearchContext {
  const destinationValue = getSingleValue(params.destination);
  const destination =
    destinationValue?.trim().replace(/\s+/g, " ").slice(0, 80) ||
    defaultDestination;
  const adults = getBoundedInteger(params.adults, 1, 8, 2);
  const children = getBoundedInteger(params.children, 0, 6, 0);
  const rooms = getBoundedInteger(params.rooms, 1, 8, 1);
  const guestCount = adults + children;

  return {
    destination,
    dates: formatDateRange(params.checkIn, params.checkOut),
    guests: `${guestCount} ${guestCount === 1 ? "guest" : "guests"} · ${rooms} ${
      rooms === 1 ? "room" : "rooms"
    }`,
  };
}
