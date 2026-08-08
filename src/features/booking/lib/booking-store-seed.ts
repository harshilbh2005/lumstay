import {
  getSearchFormValues,
  type SearchFormValues,
} from "@/features/search/lib/search-context";
import { mockBookingPricingPolicy } from "@/data/mock/booking-pricing";
import type {
  BookingProperty,
  BookingRoom,
  BookingStoreSeed,
} from "@/stores/booking-store";
import type { PropertySummary, Room } from "@/types/domain";

type SearchParamsReader = {
  get: (name: string) => string | null;
};

export function toBookingProperty(
  property: PropertySummary,
): BookingProperty {
  return {
    id: property.id,
    slug: property.slug,
    name: property.name,
    mediaId: property.mediaId,
    location: {
      city: property.location.city,
      country: property.location.country,
      ...(property.location.region
        ? { region: property.location.region }
        : {}),
    },
    pricingPolicy: {
      estimatedTax: { ...mockBookingPricingPolicy.estimatedTax },
      serviceFee: {
        ...mockBookingPricingPolicy.serviceFee,
        amountPerRoom: {
          ...mockBookingPricingPolicy.serviceFee.amountPerRoom,
        },
      },
    },
  };
}

export function toBookingRoom(room: Room): BookingRoom {
  return {
    id: room.id,
    propertyId: room.propertyId,
    name: room.name,
    mediaId: room.mediaIds[0] ?? null,
    maxGuests: room.maxGuests,
    bedConfiguration: room.bedConfiguration,
    sizeSquareMetres: room.sizeSquareMetres,
    nightlyPrice: { ...room.nightlyPrice },
    breakfastIncluded: room.breakfastIncluded,
    cancellationPolicy: {
      label: room.cancellationPolicy.label,
      summary: room.cancellationPolicy.summary,
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

export function getBookingSearchValues(
  searchParams: SearchParamsReader,
): SearchFormValues {
  return getSearchFormValues({
    destination: searchParams.get("destination") ?? undefined,
    checkIn: searchParams.get("checkIn") ?? undefined,
    checkOut: searchParams.get("checkOut") ?? undefined,
    adults: searchParams.get("adults") ?? undefined,
    children: searchParams.get("children") ?? undefined,
    rooms: searchParams.get("rooms") ?? undefined,
  });
}

export function createBookingStoreSeed(
  property: BookingProperty,
  searchValues: SearchFormValues,
): BookingStoreSeed {
  const dates = {
    checkIn: searchValues.checkIn || null,
    checkOut: searchValues.checkOut || null,
  };
  const guests = {
    adults: searchValues.adults,
    children: searchValues.children,
    rooms: searchValues.rooms,
  };

  return {
    initializationKey: [
      property.id,
      dates.checkIn ?? "any",
      dates.checkOut ?? "any",
      guests.adults,
      guests.children,
      guests.rooms,
    ].join("|"),
    dates,
    guests,
    property,
  };
}
