import { mockBookings } from "@/data/mock";
import type { Booking } from "@/types/domain";

export type TripsHistorySearchParamValue = string | string[] | undefined;

export type TripsHistoryDataResult =
  | {
      status: "ready";
      bookings: readonly Booking[];
    }
  | {
      status: "loading";
    }
  | {
      status: "error";
    };

function getSingleValue(value: TripsHistorySearchParamValue) {
  return Array.isArray(value) ? value[0] : value;
}

export function getTripsHistoryData(
  params: Record<string, TripsHistorySearchParamValue>,
): TripsHistoryDataResult {
  const demoState = getSingleValue(params._demo);

  if (demoState === "unexpected-error") {
    throw new Error("Trips history unexpected-error review fixture");
  }

  if (demoState === "error") {
    return { status: "error" };
  }

  if (demoState === "loading") {
    return { status: "loading" };
  }

  return {
    status: "ready",
    bookings: demoState === "empty" ? [] : mockBookings,
  };
}
