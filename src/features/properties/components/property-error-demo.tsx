"use client";

import { useSearchParams } from "next/navigation";

export function PropertyErrorDemo() {
  const searchParams = useSearchParams();

  if (searchParams.get("_demo") === "error") {
    throw new Error("Injected property detail error for interface review.");
  }

  return null;
}
