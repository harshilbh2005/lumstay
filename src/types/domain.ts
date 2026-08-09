export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP";

export interface Money {
  amount: number;
  currency: CurrencyCode;
}

export interface BookingPricingPolicy {
  estimatedTax: {
    label: string;
    rateBasisPoints: number;
    description: string;
  };
  serviceFee: {
    label: string;
    amountPerRoom: Money;
    description: string;
  };
}

export interface CancellationChargeRule {
  timing: string;
  chargeBasisPoints: number;
}

export interface Location {
  city: string;
  country: string;
  region?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export type PropertyType =
  | "boutique-hotel"
  | "private-cabin"
  | "desert-lodge"
  | "heritage-stay"
  | "wellness-retreat";

export type PropertyFacility =
  | "pool"
  | "wellness"
  | "breakfast"
  | "destination-dining"
  | "private-transfers";

export type PropertyAtmosphere =
  | "quiet"
  | "design-led"
  | "remote"
  | "nature-led"
  | "heritage";

export interface PropertySummary {
  id: string;
  slug: string;
  name: string;
  propertyType: PropertyType;
  location: Location;
  description: string;
  mediaId: string;
  rating: number;
  reviewCount: number;
  priceFrom: Money;
  atmosphere: string[];
  atmosphereTags: PropertyAtmosphere[];
  facilities: string[];
  facilityTags: PropertyFacility[];
  isLumaPick?: boolean;
  isNew?: boolean;
}

export interface PropertyDetail {
  summary: PropertySummary;
  editorial: {
    folio: string;
    statement: string;
    note: string;
  };
  galleryMediaIds: string[];
  facilityDetails: {
    name: string;
    description: string;
    availability: string;
  }[];
  policies: {
    label: string;
    value: string;
  }[];
  practicalDetails: {
    label: string;
    value: string;
  }[];
  locationDetails: {
    elevation: string;
    overview: string;
    nearby: {
      name: string;
      context: string;
    }[];
  };
}

export interface DestinationSummary {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: string;
  character: string;
  description: string;
  mediaId: string;
  bestSeason: string;
  pace: string;
}

export type EditorialDepartment = "Places" | "Rooms" | "Tables" | "Rituals";

export interface EditorialStory {
  id: string;
  slug: string;
  title: string;
  deck: string;
  department: EditorialDepartment;
  author: string;
  readingTime: string;
  mediaId: string;
  relatedHref: string;
  relatedLabel: string;
}

export interface Room {
  id: string;
  propertyId: string;
  name: string;
  description: string;
  mediaIds: string[];
  maxGuests: number;
  bedConfiguration: string;
  sizeSquareMetres: number;
  facilities: string[];
  nightlyPrice: Money;
  cancellationPolicy: {
    label: string;
    summary: string;
    terms: string[];
    chargeSchedule: CancellationChargeRule[];
  };
  ratePlan: {
    inclusions: string[];
    exclusions: string[];
  };
  breakfastIncluded: boolean;
  availability:
    | {
        status: "available";
      }
    | {
        status: "unavailable";
        note: string;
      };
}

export type BookingStatus = "upcoming" | "completed" | "cancelled" | "payment-failed";

export interface BookingPropertySnapshot {
  id: string;
  slug: string;
  name: string;
  location: {
    city: string;
    country: string;
    region?: string;
  };
  mediaId: string;
}

export interface BookingRoomSnapshot {
  id: string;
  name: string;
  mediaId: string;
  bedConfiguration: string;
  sizeSquareMetres: number;
  breakfastIncluded: boolean;
  cancellationPolicy: {
    label: string;
    summary: string;
  };
  ratePlan: {
    inclusions: readonly string[];
    exclusions: readonly string[];
  };
}

export interface BookingGuestParty {
  adults: number;
  children: number;
  rooms: number;
}

export interface BookingPriceSnapshot {
  nightlyRate: Money;
  nightCount: number;
  roomCount: number;
  accommodationSubtotal: Money;
  estimatedTax: {
    label: string;
    rateBasisPoints: number;
    amount: Money;
  };
  serviceFee: {
    label: string;
    amountPerRoom: Money;
    amount: Money;
  };
  total: Money;
}

export interface BookingHistoryBase {
  id: string;
  createdAt: string;
  property: BookingPropertySnapshot;
  room: BookingRoomSnapshot;
  checkIn: string;
  checkOut: string;
  guests: BookingGuestParty;
  leadGuestName: string;
  price: BookingPriceSnapshot;
}

export interface ConfirmedBooking extends BookingHistoryBase {
  status: "upcoming" | "completed";
  reference: string;
  payment: {
    status: "paid";
    paidAt: string;
    lastFour: string;
  };
}

export interface CancelledBooking extends BookingHistoryBase {
  status: "cancelled";
  reference: string;
  cancellation: {
    cancelledAt: string;
    reason: string;
    fee: Money;
  };
  payment: {
    status: "refunded";
    paidAt: string;
    refundedAt: string;
    lastFour: string;
    refundAmount: Money;
  };
}

export type MockPaymentFailureReason = "card-declined" | "connection-interrupted";

export interface PaymentFailedBooking extends BookingHistoryBase {
  status: "payment-failed";
  reference: null;
  attemptReference: string;
  payment: {
    status: "failed";
    failedAt: string;
    lastFour: string;
    failureReason: MockPaymentFailureReason;
    retryable: boolean;
  };
}

export type Booking = ConfirmedBooking | CancelledBooking | PaymentFailedBooking;
