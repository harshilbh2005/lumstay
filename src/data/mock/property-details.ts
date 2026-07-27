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
    galleryMediaIds: [
      "casa-serein-exterior",
      "casa-serein-lemon-terrace",
      "casa-serein-sea-room",
      "casa-serein-positano-terrace",
      "casa-serein-pool-at-dusk",
    ],
    facilityDetails: [
      {
        name: "Infinity pool",
        description:
          "A heated, open-air pool follows the horizon, with loungers set above the coast.",
        availability: "Open seasonally",
      },
      {
        name: "Garden restaurant",
        description:
          "Campanian cooking moves between the citrus garden and an open terrace, with breakfast, lunch, and dinner service.",
        availability: "Daily service",
      },
      {
        name: "Private transfers",
        description:
          "Road transfers can be arranged from Naples or Salerno, with onward connections between Ravello and Amalfi.",
        availability: "Advance request",
      },
    ],
    policies: [
      {
        label: "Arrival / departure",
        value: "Check-in from 14:00 · Check-out by 12:00",
      },
      {
        label: "Cancellation",
        value:
          "Seasonal terms apply; the selected rate’s deadline and charges are shown before confirmation.",
      },
      {
        label: "Children",
        value:
          "Cots and extra beds are available on request, subject to the selected room.",
      },
      {
        label: "Pets",
        value:
          "Small pets may stay in rooms; communal-area restrictions apply.",
      },
    ],
    practicalDetails: [
      {
        label: "Arriving",
        value:
          "Naples Airport or Salerno station, followed by a road transfer to Ravello.",
      },
      {
        label: "Getting around",
        value:
          "Ravello connects to Amalfi by taxi or SITA bus; coastal ferries depart from Amalfi.",
      },
      {
        label: "Parking",
        value:
          "Public parking is available near Piazza Duomo, with longer-stay parking by the Auditorium.",
      },
      {
        label: "Pool season",
        value:
          "The open-air pool operates seasonally and remains weather dependent.",
      },
    ],
    locationDetails: {
      elevation: "365 m",
      overview:
        "Ravello sits high above the Mediterranean, set back from the busier sea towns of Amalfi and Positano.",
      nearby: [
        {
          name: "Villa Rufolo",
          context: "Historic gardens in Ravello’s centre",
        },
        {
          name: "Amalfi",
          context: "7 km by road · ferry connections along the coast",
        },
        {
          name: "Salerno",
          context: "Rail gateway with onward sea and road connections",
        },
      ],
    },
  },
] satisfies PropertyDetail[];

export function getPropertyDetailBySlug(slug: string) {
  return mockPropertyDetails.find((property) => property.summary.slug === slug);
}
