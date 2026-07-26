"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "@phosphor-icons/react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SearchFilterDisclosure({
  activeCount,
  children,
}: {
  activeCount: number;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="border-t border-brand-forest-deep/18 lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger
            render={
              <button
                type="button"
                className="flex min-h-14 w-full items-center justify-between gap-4 border-b border-brand-forest-deep/18 py-3 text-left font-sans text-base font-semibold text-brand-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
              />
            }
          >
            <span>
              Refine the edit
              <span className="ml-2 font-mono text-[0.625rem] font-normal tracking-[0.1em] text-brand-stone uppercase">
                {activeCount > 0 ? `${activeCount} selected` : "All stays"}
              </span>
            </span>
            <SlidersHorizontal
              aria-hidden="true"
              size={18}
              weight="duotone"
              className="shrink-0 text-brand-brass"
            />
          </SheetTrigger>

          <SheetContent
            side="bottom"
            showCloseButton={false}
            onSubmit={() => setIsOpen(false)}
            onClick={(event) => {
              if (
                event.target instanceof Element &&
                event.target.closest("a")
              ) {
                setIsOpen(false);
              }
            }}
            className="h-[calc(100dvh-0.75rem)] max-h-[calc(100dvh-0.75rem)] gap-0 overflow-hidden rounded-t-panel border-x border-t border-brand-forest-deep/18 bg-brand-paper p-0 shadow-float lg:hidden"
          >
            <header className="grid min-h-20 shrink-0 grid-cols-[1fr_auto] items-center gap-4 border-b border-brand-forest-deep/16 px-5">
              <div>
                <p className="font-mono text-[0.625rem] tracking-[0.14em] text-brand-brass uppercase">
                  Refine the edit
                </p>
                <SheetTitle className="mt-1 font-sans text-xl font-bold tracking-[-0.035em] text-brand-forest-deep">
                  Search filters
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Choose filters, apply them to the results, or reset the current
                  selections.
                </SheetDescription>
              </div>
              <SheetClose
                render={
                  <button
                    type="button"
                    aria-label="Close filters"
                    className="flex size-11 items-center justify-center border border-brand-forest-deep/20 text-brand-forest-deep transition-colors duration-200 hover:border-brand-forest-deep hover:bg-brand-linen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                }
              >
                <X aria-hidden="true" size={19} />
              </SheetClose>
            </header>

            <div className="min-h-0 flex-1 overscroll-contain overflow-y-auto px-5">
              {children}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block">{children}</div>
    </>
  );
}
