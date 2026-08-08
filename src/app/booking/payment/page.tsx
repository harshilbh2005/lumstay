import type { Metadata } from "next";

import { BookingPayment } from "@/features/booking";

export const metadata: Metadata = {
  title: "Payment details",
  description:
    "Prepare mock card details for a selected LumaStay stay without contacting a payment service or creating a reservation.",
};

export default function BookingPaymentPage() {
  return <BookingPayment />;
}
