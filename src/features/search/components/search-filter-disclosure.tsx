"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

export function SearchFilterDisclosure({
  activeCount,
  children,
}: {
  activeCount: number;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-brand-forest-deep/18 lg:border-0">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="search-filter-controls"
        onClick={() => setIsOpen((current) => !current)}
        className="flex min-h-14 w-full items-center justify-between gap-4 border-b border-brand-forest-deep/18 py-3 text-left font-sans text-base font-semibold text-brand-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset lg:hidden"
      >
        <span>
          Refine the edit
          <span className="ml-2 font-mono text-[0.625rem] font-normal tracking-[0.1em] text-brand-stone uppercase">
            {activeCount > 0 ? `${activeCount} selected` : "All stays"}
          </span>
        </span>
        <CaretDown
          aria-hidden="true"
          size={17}
          className={cn(
            "shrink-0 transition-transform duration-200 ease-luma",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <div
        id="search-filter-controls"
        className={cn("pt-6 lg:block lg:pt-0", isOpen ? "block" : "hidden")}
      >
        {children}
      </div>
    </div>
  );
}
