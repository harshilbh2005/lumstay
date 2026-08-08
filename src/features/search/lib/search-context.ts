import { format, isAfter, isValid, parseISO } from "date-fns";

export type SearchParamValue = string | string[] | undefined;

export interface SearchContext {
  destination: string;
  dates: string;
  guests: string;
}

export interface SearchFormValues {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
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

function getDestination(value: SearchParamValue) {
  return getSingleValue(value)?.trim().replace(/\s+/g, " ").slice(0, 80) ?? "";
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
  const destination = getDestination(params.destination) || defaultDestination;
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

export function getSearchFormValues(
  params: Record<string, SearchParamValue>,
): SearchFormValues {
  const checkIn = getDate(params.checkIn);
  const checkOut = getDate(params.checkOut);
  const hasValidDateRange =
    checkIn !== null && checkOut !== null && isAfter(checkOut, checkIn);

  return {
    destination: getDestination(params.destination),
    checkIn: hasValidDateRange ? format(checkIn, "yyyy-MM-dd") : "",
    checkOut: hasValidDateRange ? format(checkOut, "yyyy-MM-dd") : "",
    adults: getBoundedInteger(params.adults, 1, 8, 2),
    children: getBoundedInteger(params.children, 0, 6, 0),
    rooms: getBoundedInteger(params.rooms, 1, 8, 1),
  };
}

export function getSearchIntentQueryString(values: SearchFormValues) {
  const params = new URLSearchParams();

  if (values.destination) {
    params.set("destination", values.destination);
  }

  if (values.checkIn && values.checkOut) {
    params.set("checkIn", values.checkIn);
    params.set("checkOut", values.checkOut);
  }

  params.set("adults", String(values.adults));
  params.set("children", String(values.children));
  params.set("rooms", String(values.rooms));

  return params.toString();
}
