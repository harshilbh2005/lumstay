import type { Booking } from "@/types/domain";

export { mockBookingPricingPolicy } from "./booking-pricing";
export {
  generatedMedia,
  getMediaById,
  lumstayMedia,
  stockMedia,
} from "./media";
export type {
  LumaStayMediaAsset,
  MediaKind,
  MediaOrigin,
  MediaSource,
} from "./media";
export { mockDestinations } from "./destinations";
export { mockEditorialStories } from "./editorial-stories";
export {
  getPropertyDetailBySlug,
  mockPropertyDetails,
} from "./property-details";
export { mockProperties } from "./properties";
export { getRoomsByPropertyId, mockRooms } from "./rooms";

export const mockBookings: Booking[] = [];
