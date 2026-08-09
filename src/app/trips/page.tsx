import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { TripsHistoryPage } from "@/features/trips";

export const metadata: Metadata = {
  title: "Trips",
  description:
    "Review LumaStay's deterministic prototype history of upcoming, completed, cancelled, and payment-failed stays.",
};

export default function TripsPage() {
  return (
    <>
      <SiteHeader />
      <TripsHistoryPage />
      <SiteFooter />
    </>
  );
}
