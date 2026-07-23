export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP";

export interface Money {
  amount: number;
  currency: CurrencyCode;
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

export interface PropertySummary {
  id: string;
  slug: string;
  name: string;
  location: Location;
  description: string;
  mediaId: string;
  rating: number;
  reviewCount: number;
  priceFrom: Money;
  atmosphere: string[];
  facilities: string[];
  isLumaPick?: boolean;
  isNew?: boolean;
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
  images: string[];
  maxGuests: number;
  bedConfiguration: string;
  sizeSquareMetres: number;
  facilities: string[];
  nightlyPrice: Money;
  cancellationPolicy: string;
  breakfastIncluded: boolean;
}

export type BookingStatus = "upcoming" | "completed" | "cancelled" | "payment-failed";

export interface Booking {
  id: string;
  reference: string;
  propertyId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  total: Money;
  status: BookingStatus;
}
