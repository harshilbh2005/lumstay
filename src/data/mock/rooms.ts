import type { Room } from "@/types/domain";

export const mockRooms = [
  {
    id: "room-casa-serein-garden",
    propertyId: "property-casa-serein",
    name: "Garden Room",
    description:
      "A quiet double room opening to a small furnished garden terrace.",
    mediaIds: [
      "casa-serein-garden-room",
      "casa-serein-garden-room-detail",
    ],
    maxGuests: 2,
    bedConfiguration: "One king bed or two twin beds",
    sizeSquareMetres: 35,
    facilities: [
      "Furnished garden terrace",
      "Marble bathroom with walk-in shower",
      "Air conditioning",
      "In-room bar",
      "Complimentary WiFi",
    ],
    nightlyPrice: {
      amount: 38200,
      currency: "INR",
    },
    cancellationPolicy: {
      label: "Flexible",
      summary: "Free cancellation until 7 days before arrival.",
      terms: [
        "Within 7 days of arrival: 50% of the stay",
        "Arrival day, no-show, or early departure: 100% of the stay",
      ],
      chargeSchedule: [
        {
          timing: "7 or more days before arrival",
          chargeBasisPoints: 0,
        },
        {
          timing: "Fewer than 7 days before arrival",
          chargeBasisPoints: 5000,
        },
        {
          timing: "Arrival day, no-show, or early departure",
          chargeBasisPoints: 10000,
        },
      ],
    },
    ratePlan: {
      inclusions: [
        "Accommodation for registered guests",
        "Complimentary WiFi",
      ],
      exclusions: ["Breakfast is available separately."],
    },
    breakfastIncluded: false,
    availability: {
      status: "available",
    },
  },
  {
    id: "room-casa-serein-sea-terrace",
    propertyId: "property-casa-serein",
    name: "Sea Terrace Room",
    description:
      "A sea-facing room with a furnished terrace and space for an extra bed.",
    mediaIds: [
      "casa-serein-sea-room",
      "casa-serein-sea-terrace-balcony",
    ],
    maxGuests: 3,
    bedConfiguration: "One king bed or two twin beds",
    sizeSquareMetres: 45,
    facilities: [
      "Furnished sea-view terrace",
      "Marble bathroom with bath and walk-in shower",
      "Sitting area",
      "Air conditioning",
      "In-room bar",
      "Complimentary WiFi",
    ],
    nightlyPrice: {
      amount: 46800,
      currency: "INR",
    },
    cancellationPolicy: {
      label: "Seasonal",
      summary: "Cancellation charges increase closer to arrival.",
      terms: [
        "14–7 days before arrival: 50% of the stay",
        "6–1 days before arrival: 75% of the stay",
        "Arrival day, no-show, or early departure: 100% of the stay",
      ],
      chargeSchedule: [
        {
          timing: "15 or more days before arrival",
          chargeBasisPoints: 0,
        },
        {
          timing: "14–7 days before arrival",
          chargeBasisPoints: 5000,
        },
        {
          timing: "6–1 days before arrival",
          chargeBasisPoints: 7500,
        },
        {
          timing: "Arrival day, no-show, or early departure",
          chargeBasisPoints: 10000,
        },
      ],
    },
    ratePlan: {
      inclusions: [
        "Accommodation for registered guests",
        "Daily breakfast for registered guests",
        "Complimentary WiFi",
      ],
      exclusions: [],
    },
    breakfastIncluded: true,
    availability: {
      status: "available",
    },
  },
  {
    id: "room-casa-serein-suite",
    propertyId: "property-casa-serein",
    name: "Serein Suite",
    description:
      "A generous bedroom and separate living area with a furnished sea-view terrace.",
    mediaIds: [
      "casa-serein-suite-bedroom",
      "casa-serein-suite-twin-room",
    ],
    maxGuests: 3,
    bedConfiguration: "One king bed or two twin beds, plus one extra bed",
    sizeSquareMetres: 60,
    facilities: [
      "Separate living area",
      "Furnished sea-view terrace",
      "Marble bathroom with bath and walk-in shower",
      "Twice-daily housekeeping",
      "Air conditioning",
      "In-room bar",
      "Complimentary WiFi",
    ],
    nightlyPrice: {
      amount: 62400,
      currency: "INR",
    },
    cancellationPolicy: {
      label: "Advance purchase",
      summary: "Full prepayment is required when booking.",
      terms: [
        "Changes and cancellations are non-refundable",
        "No-show or early departure: 100% of the stay",
      ],
      chargeSchedule: [
        {
          timing: "After the mock booking is prepared",
          chargeBasisPoints: 10000,
        },
      ],
    },
    ratePlan: {
      inclusions: [
        "Accommodation for registered guests",
        "Daily breakfast for registered guests",
        "Complimentary WiFi",
      ],
      exclusions: [],
    },
    breakfastIncluded: true,
    availability: {
      status: "unavailable",
      note: "Held back in this interface preview; choose another room to continue.",
    },
  },
] satisfies Room[];

export function getRoomsByPropertyId(propertyId: string) {
  return mockRooms.filter((room) => room.propertyId === propertyId);
}
