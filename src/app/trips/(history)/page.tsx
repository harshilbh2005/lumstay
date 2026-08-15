import { createPageMetadata } from "@/config/metadata";
import {
  TripsHistoryPage,
  TripsHistorySkeleton,
  TripsHistoryState,
} from "@/features/trips";
import {
  getTripsHistoryData,
  type TripsHistorySearchParamValue,
} from "@/features/trips/lib/trips-history-data";

export const metadata = createPageMetadata({
  title: "Trips",
  description:
    "Review LumaStay's deterministic prototype history of upcoming, completed, cancelled, and payment-failed stays.",
  path: "/trips",
  eyebrow: "Fixture trip history",
  detail: "Read-only fixtures · Not a user account",
  indexing: "noindex-nofollow",
});

export default async function TripsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, TripsHistorySearchParamValue>>;
}) {
  const resolvedSearchParams = await searchParams;
  const historyData = getTripsHistoryData(resolvedSearchParams);

  if (historyData.status === "error") {
    return <TripsHistoryState variant="error" />;
  }

  if (historyData.status === "loading") {
    return <TripsHistorySkeleton />;
  }

  if (historyData.bookings.length === 0) {
    return <TripsHistoryState variant="empty" />;
  }

  return <TripsHistoryPage bookings={historyData.bookings} />;
}
