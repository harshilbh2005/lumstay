import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/ssr";

import { PropertyRouteState } from "@/features/properties";

export default function PropertyNotFound() {
  return (
    <PropertyRouteState
      eyebrow="404 · Stay not found"
      title="This stay is outside the current edit."
      description="The property link may have moved, expired, or reached a stay that LumaStay has not published yet."
      statusLabel="Property unavailable"
      statusTitle="The page has slipped from view."
      statusDescription="Nothing has been booked or changed. Return to the collection to continue with the places that are currently available to explore."
      actions={
        <>
          <Link
            href="/search"
            className="group inline-flex min-h-12 w-full items-center justify-between gap-5 rounded-full border border-brand-forest-deep bg-brand-forest-deep px-6 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:bg-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-px sm:w-auto"
          >
            Explore all stays
            <ArrowRight
              aria-hidden="true"
              size={16}
              className="transition-transform duration-200 ease-luma group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/"
            className="group inline-flex min-h-11 items-center gap-3 px-2 text-sm font-semibold text-brand-forest-deep underline decoration-brand-forest-deep/35 underline-offset-4 transition-colors duration-200 hover:text-brand-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ArrowLeft
              aria-hidden="true"
              size={15}
              className="transition-transform duration-200 ease-luma group-hover:-translate-x-1"
            />
            Return home
          </Link>
        </>
      }
      railLabel="What remains"
      railItems={[
        "Your search details have not been changed.",
        "No room selection or reservation was created.",
        "Published stays remain available in the collection.",
      ]}
    />
  );
}
