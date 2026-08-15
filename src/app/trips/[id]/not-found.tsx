import Link from "next/link";
import { ArrowLeft, ArrowRight, Receipt } from "@phosphor-icons/react/ssr";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function TripDetailNotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="min-h-[70vh] bg-brand-paper">
        <section className="container-luma grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-x-8 lg:py-36">
          <div className="lg:col-span-7">
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-brand-brass-dark uppercase">
              404 · Record unavailable
            </p>
            <h1 className="mt-6 max-w-[11ch] text-[clamp(3.5rem,7vw,7rem)] leading-[0.88] font-semibold tracking-[-0.055em] text-brand-forest-deep">
              This trip record is not available.
            </h1>
          </div>

          <div className="max-w-[32rem] border-t border-brand-forest-deep/16 pt-7 lg:col-start-9 lg:col-span-4 lg:self-end">
            <Receipt
              aria-hidden="true"
              size={26}
              className="text-brand-brass-dark"
            />
            <p className="mt-5 text-base leading-7 text-foreground/70">
              The link may be unknown, or it may point to a payment attempt.
              Attempts stay in the history ledger and never become reservation
              detail pages.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Nothing has been booked, changed, charged, or refunded.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Link
                href="/trips"
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-brand-forest-deep px-5 py-3 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:bg-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-paper active:translate-y-px motion-reduce:transition-none"
              >
                <ArrowLeft
                  aria-hidden="true"
                  size={15}
                  className="transition-transform duration-200 ease-luma group-hover:-translate-x-1 motion-reduce:transition-none"
                />
                Return to trips
              </Link>
              <Link
                href="/search"
                className="group inline-flex min-h-11 items-center gap-3 rounded-sm px-2 text-sm font-semibold text-brand-forest-deep underline decoration-brand-forest-deep/30 underline-offset-4 transition-colors duration-200 hover:text-brand-brass-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-paper motion-reduce:transition-none"
              >
                Explore stays
                <ArrowRight
                  aria-hidden="true"
                  size={15}
                  className="transition-transform duration-200 ease-luma group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
