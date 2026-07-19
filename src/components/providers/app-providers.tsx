"use client";

import { MotionConfig } from "motion/react";
import { Toaster } from "sonner";

export function AppProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.24 }}>
      {children}
      <Toaster
        closeButton
        richColors
        position="bottom-right"
        toastOptions={{ className: "font-sans" }}
      />
    </MotionConfig>
  );
}
