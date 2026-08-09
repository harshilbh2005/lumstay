import type {
  Booking,
  BookingPriceSnapshot,
  BookingPropertySnapshot,
  BookingRoomSnapshot,
  BookingStatus,
  Money,
  Room,
} from "@/types/domain";

import { mockBookingPricingPolicy } from "./booking-pricing";
import { mockProperties } from "./properties";
import { mockRooms } from "./rooms";

export const MOCK_BOOKING_HISTORY_REFERENCE_DATE = "2026-08-09";

const inr = (amount: number): Money => ({ amount, currency: "INR" });

function createPriceSnapshot(
  nightlyRateAmount: number,
  nightCount: number,
  roomCount: number,
): BookingPriceSnapshot {
  const accommodationSubtotal = nightlyRateAmount * nightCount * roomCount;
  const estimatedTax = Math.round(
    (accommodationSubtotal *
      mockBookingPricingPolicy.estimatedTax.rateBasisPoints) /
      10_000,
  );
  const serviceFee =
    mockBookingPricingPolicy.serviceFee.amountPerRoom.amount * roomCount;

  return {
    nightlyRate: inr(nightlyRateAmount),
    nightCount,
    roomCount,
    accommodationSubtotal: inr(accommodationSubtotal),
    estimatedTax: {
      label: mockBookingPricingPolicy.estimatedTax.label,
      rateBasisPoints:
        mockBookingPricingPolicy.estimatedTax.rateBasisPoints,
      amount: inr(estimatedTax),
    },
    serviceFee: {
      label: mockBookingPricingPolicy.serviceFee.label,
      amountPerRoom: mockBookingPricingPolicy.serviceFee.amountPerRoom,
      amount: inr(serviceFee),
    },
    total: inr(accommodationSubtotal + estimatedTax + serviceFee),
  };
}

function getPropertySnapshot(propertyId: string): BookingPropertySnapshot {
  const property = mockProperties.find(
    (candidate) => candidate.id === propertyId,
  );

  if (!property) {
    throw new Error(`Missing mock property for booking history: ${propertyId}`);
  }

  return {
    id: property.id,
    slug: property.slug,
    name: property.name,
    location: {
      city: property.location.city,
      country: property.location.country,
      ...(property.location.region ? { region: property.location.region } : {}),
    },
    mediaId: property.mediaId,
  };
}

function getCatalogRoomSnapshot(roomId: string): BookingRoomSnapshot {
  const room = mockRooms.find((candidate) => candidate.id === roomId);

  if (!room) {
    throw new Error(`Missing mock room for booking history: ${roomId}`);
  }

  return createRoomSnapshot(room, room.mediaIds[0]);
}

function createRoomSnapshot(room: Room, mediaId: string): BookingRoomSnapshot {
  return {
    id: room.id,
    name: room.name,
    mediaId,
    bedConfiguration: room.bedConfiguration,
    sizeSquareMetres: room.sizeSquareMetres,
    breakfastIncluded: room.breakfastIncluded,
    cancellationPolicy: {
      label: room.cancellationPolicy.label,
      summary: room.cancellationPolicy.summary,
    },
    ratePlan: {
      inclusions: room.ratePlan.inclusions,
      exclusions: room.ratePlan.exclusions,
    },
  };
}

const gardenRoom = getCatalogRoomSnapshot("room-casa-serein-garden");
const cancelledVelaHousePrice = createPriceSnapshot(48_700, 2, 1);

export const mockBookings: readonly Booking[] = [
  {
    id: "booking-upcoming-casa-serein",
    createdAt: "2026-07-18T08:42:00.000Z",
    status: "upcoming",
    reference: "LUMA-MOCK-CS-GR-260912",
    property: getPropertySnapshot("property-casa-serein"),
    room: gardenRoom,
    checkIn: "2026-09-12",
    checkOut: "2026-09-15",
    guests: { adults: 2, children: 0, rooms: 1 },
    leadGuestName: "Aarav Mehta",
    price: createPriceSnapshot(38_200, 3, 1),
    payment: {
      status: "paid",
      paidAt: "2026-07-18T08:44:00.000Z",
      lastFour: "4242",
    },
  },
  {
    id: "booking-upcoming-kiyo-machiya",
    createdAt: "2026-07-25T13:16:00.000Z",
    status: "upcoming",
    reference: "LUMA-MOCK-KM-GM-261203",
    property: getPropertySnapshot("property-kiyo-machiya"),
    room: {
      id: "room-kiyo-machiya-garden",
      name: "Garden Machiya",
      mediaId: "kiyo-machiya-room",
      bedConfiguration: "One queen bed and one Japanese futon",
      sizeSquareMetres: 42,
      breakfastIncluded: true,
      cancellationPolicy: {
        label: "Flexible",
        summary: "Free cancellation until 14 days before arrival.",
      },
      ratePlan: {
        inclusions: [
          "Daily local breakfast",
          "Tea service",
          "Complimentary WiFi",
        ],
        exclusions: ["Airport transfers are available separately."],
      },
    },
    checkIn: "2026-12-03",
    checkOut: "2026-12-07",
    guests: { adults: 2, children: 1, rooms: 1 },
    leadGuestName: "Aarav Mehta",
    price: createPriceSnapshot(33_700, 4, 1),
    payment: {
      status: "paid",
      paidAt: "2026-07-25T13:18:00.000Z",
      lastFour: "4242",
    },
  },
  {
    id: "booking-completed-nila-haveli",
    createdAt: "2026-01-11T09:05:00.000Z",
    status: "completed",
    reference: "LUMA-MOCK-NH-CR-260302",
    property: getPropertySnapshot("property-nila-haveli"),
    room: {
      id: "room-nila-haveli-courtyard",
      name: "Courtyard Room",
      mediaId: "nila-haveli-room",
      bedConfiguration: "One king bed or two twin beds",
      sizeSquareMetres: 32,
      breakfastIncluded: true,
      cancellationPolicy: {
        label: "Flexible",
        summary: "Free cancellation until 7 days before arrival.",
      },
      ratePlan: {
        inclusions: [
          "Daily breakfast",
          "Old-city walking map",
          "Complimentary WiFi",
        ],
        exclusions: ["Guided walks are available separately."],
      },
    },
    checkIn: "2026-03-02",
    checkOut: "2026-03-06",
    guests: { adults: 3, children: 1, rooms: 2 },
    leadGuestName: "Aarav Mehta",
    price: createPriceSnapshot(21_800, 4, 2),
    payment: {
      status: "paid",
      paidAt: "2026-01-11T09:07:00.000Z",
      lastFour: "4242",
    },
  },
  {
    id: "booking-completed-stillwater-cabin",
    createdAt: "2025-08-22T16:31:00.000Z",
    status: "completed",
    reference: "LUMA-MOCK-SC-LC-251118",
    property: getPropertySnapshot("property-stillwater-cabin"),
    room: {
      id: "room-stillwater-cabin-lake",
      name: "Lake Cabin",
      mediaId: "stillwater-cabin-exterior",
      bedConfiguration: "One king bed",
      sizeSquareMetres: 54,
      breakfastIncluded: true,
      cancellationPolicy: {
        label: "Seasonal",
        summary: "Free cancellation until 21 days before arrival.",
      },
      ratePlan: {
        inclusions: ["Breakfast pantry", "Private geothermal bath", "Firewood"],
        exclusions: ["Guided excursions are available separately."],
      },
    },
    checkIn: "2025-11-18",
    checkOut: "2025-11-21",
    guests: { adults: 2, children: 0, rooms: 1 },
    leadGuestName: "Aarav Mehta",
    price: createPriceSnapshot(44_600, 3, 1),
    payment: {
      status: "paid",
      paidAt: "2025-08-22T16:33:00.000Z",
      lastFour: "4242",
    },
  },
  {
    id: "booking-cancelled-vela-house",
    createdAt: "2026-07-19T07:52:00.000Z",
    status: "cancelled",
    reference: "LUMA-MOCK-VH-BR-260829",
    property: getPropertySnapshot("property-vela-house"),
    room: {
      id: "room-vela-house-bath",
      name: "Bath House Room",
      mediaId: "vela-alpine-bath",
      bedConfiguration: "One king bed",
      sizeSquareMetres: 46,
      breakfastIncluded: true,
      cancellationPolicy: {
        label: "Flexible",
        summary: "Free cancellation until 14 days before arrival.",
      },
      ratePlan: {
        inclusions: [
          "Daily mountain breakfast",
          "Thermal bath access",
          "Sauna access",
        ],
        exclusions: ["Private treatments are available separately."],
      },
    },
    checkIn: "2026-08-29",
    checkOut: "2026-08-31",
    guests: { adults: 1, children: 0, rooms: 1 },
    leadGuestName: "Aarav Mehta",
    price: cancelledVelaHousePrice,
    cancellation: {
      cancelledAt: "2026-08-01T10:12:00.000Z",
      reason: "Travel plans changed",
      fee: inr(0),
    },
    payment: {
      status: "refunded",
      paidAt: "2026-07-19T07:54:00.000Z",
      refundedAt: "2026-08-03T06:20:00.000Z",
      lastFour: "4242",
      refundAmount: cancelledVelaHousePrice.total,
    },
  },
  {
    id: "attempt-payment-failed-sahra-fold",
    createdAt: "2026-08-07T11:24:00.000Z",
    status: "payment-failed",
    reference: null,
    attemptReference: "LUMA-ATTEMPT-SF-CP-261021",
    property: getPropertySnapshot("property-sahra-fold"),
    room: {
      id: "room-sahra-fold-canyon",
      name: "Canyon Pavilion",
      mediaId: "sahra-fold-exterior",
      bedConfiguration: "One king bed",
      sizeSquareMetres: 58,
      breakfastIncluded: true,
      cancellationPolicy: {
        label: "Flexible",
        summary: "Free cancellation until 14 days before arrival.",
      },
      ratePlan: {
        inclusions: ["Daily breakfast", "Canyon transfer", "Evening tea"],
        exclusions: ["Private desert guiding is available separately."],
      },
    },
    checkIn: "2026-10-21",
    checkOut: "2026-10-24",
    guests: { adults: 2, children: 0, rooms: 1 },
    leadGuestName: "Aarav Mehta",
    price: createPriceSnapshot(51_900, 3, 1),
    payment: {
      status: "failed",
      failedAt: "2026-08-07T11:24:00.000Z",
      lastFour: "4242",
      failureReason: "card-declined",
      retryable: true,
    },
  },
];

export function getMockBookingById(id: string) {
  return mockBookings.find((booking) => booking.id === id);
}

export function getMockBookingsByStatus(status: BookingStatus) {
  return mockBookings.filter((booking) => booking.status === status);
}
