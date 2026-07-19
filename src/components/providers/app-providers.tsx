"use client";

import { MotionConfig } from "motion/react";
import { Toaster } from "sonner";

export function AppProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.24 }}>
      {children}
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
