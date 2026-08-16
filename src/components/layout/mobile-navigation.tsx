"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Heart,
  List,
  SuitcaseRolling,
  X,
} from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";

export function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open navigation"
          />
        }
      >
        <List aria-hidden="true" size={21} weight="regular" />
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="!w-full !max-w-none gap-0 border-0 bg-brand-forest-deep p-0 text-brand-paper sm:!w-[28rem] sm:!max-w-[28rem]"
      >
        <SheetTitle className="sr-only">LumaStay navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Browse stays, destinations, saved properties, and trips.
        </SheetDescription>

        <div className="flex h-[5.5rem] items-center justify-between border-b border-white/14 px-5 sm:px-7">
          <Link
            href="/"
            prefetch={false}
            className="brand-wordmark-inverse inline-flex min-h-11 items-center font-sans text-[1.7rem] leading-none font-extrabold tracking-[-0.065em]"
          >
            LumaStay
          </Link>
          <SheetClose
            render={
              <Button
                variant="ghost"
                size="icon"
                className="text-brand-paper hover:bg-white/10 hover:text-brand-paper"
                aria-label="Close navigation"
              />
            }
          >
            <X aria-hidden="true" size={20} weight="regular" />
          </SheetClose>
        </div>

        <nav aria-label="Mobile navigation" className="px-5 pt-10 sm:px-7 sm:pt-12">
          <ol className="divide-y divide-white/14 border-y border-white/14">
            {siteConfig.navigation.map((item, index) => (
              <li key={item.href}>
                <SheetClose
                  render={
                    <Link
                      href={item.href}
                      prefetch={false}
                      className="group grid min-h-20 grid-cols-[2rem_1fr_auto] items-center gap-3 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-inset"
                    />
                  }
                >
                  <span className="font-mono text-[0.625rem] tracking-[0.12em] text-brand-paper/48">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[1.875rem] leading-none font-bold tracking-[-0.045em] text-brand-paper">
                    {item.label}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    size={18}
                    weight="regular"
                    className="text-brand-paper/50 transition-transform duration-200 ease-luma group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-paper"
                  />
                </SheetClose>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-auto grid grid-cols-2 gap-px border-t border-white/14 bg-white/14">
          <SheetClose
            render={
              <Link
                href="/saved"
                prefetch={false}
                className="flex min-h-24 items-center gap-3 bg-brand-forest-deep px-5 text-sm font-medium text-brand-paper/78 transition-colors duration-200 hover:bg-white/6 hover:text-brand-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-inset sm:px-7"
              />
            }
          >
            <Heart aria-hidden="true" size={20} weight="regular" />
            Saved
          </SheetClose>
          <SheetClose
            render={
              <Link
                href="/trips"
                prefetch={false}
                className="flex min-h-24 items-center gap-3 bg-brand-forest-deep px-5 text-sm font-medium text-brand-paper/78 transition-colors duration-200 hover:bg-white/6 hover:text-brand-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-inset sm:px-7"
              />
            }
          >
            <SuitcaseRolling aria-hidden="true" size={20} weight="regular" />
            Trips
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
