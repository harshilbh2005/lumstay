import type { Booking, Room } from "@/types/domain";

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
export { mockProperties } from "./properties";

export const mockRooms: Room[] = [];
export const mockBookings: Booking[] = [];
