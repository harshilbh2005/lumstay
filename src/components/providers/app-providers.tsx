"use client";

import { MotionConfig } from "motion/react";
import { Toaster } from "sonner";

import { BookingStoreProvider } from "@/components/providers/booking-store-provider";
import { SavedStaysStoreProvider } from "@/components/providers/saved-stays-store-provider";

export function AppProviders({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.24 }}>
      <SavedStaysStoreProvider>
        <BookingStoreProvider>{children}</BookingStoreProvider>
      </SavedStaysStoreProvider>
      <Toaster
        className="luma-toaster"
        position="top-center"
        offset={{ top: "6.35rem" }}
        mobileOffset={{ top: "6.15rem" }}
        visibleToasts={1}
        gap={8}
        swipeDirections={["top", "left", "right"]}
        toastOptions={{ className: "font-sans", duration: 3200 }}
      />
    </MotionConfig>
  );
}
