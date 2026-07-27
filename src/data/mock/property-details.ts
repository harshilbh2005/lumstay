import type { PropertyDetail } from "@/types/domain";

import { mockProperties } from "./properties";

export const mockPropertyDetails = [
  {
    summary: mockProperties[0],
    editorial: {
      folio: "Property profile / 01",
      statement:
        "Twelve rooms, one narrow pool, and the slow cadence of a house that follows the Ravello hillside.",
      note:
        "Casa Serein is less a grand hotel than a sequence of quiet thresholds. Limewashed rooms open to citrus terraces, the garden restaurant keeps pace with the season, and the sea is rarely out of view. Come for the architecture; stay for mornings that seem to have nowhere else to be.",
    },
    galleryMediaIds: ["casa-serein-exterior"],
  },
] satisfies PropertyDetail[];

export function getPropertyDetailBySlug(slug: string) {
  return mockPropertyDetails.find((property) => property.summary.slug === slug);
}
