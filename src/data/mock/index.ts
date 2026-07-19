import type { Booking, PropertySummary, Room } from "@/types/domain";

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

export const mockProperties: PropertySummary[] = [];
export const mockRooms: Room[] = [];
export const mockBookings: Booking[] = [];
