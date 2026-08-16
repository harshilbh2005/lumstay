"use client";

import Link from "next/link";
import { ArrowClockwise, ArrowRight } from "@phosphor-icons/react";

import { PropertyRouteState } from "@/features/properties";

export default function PropertyError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  function retryProperty() {
    const url = new URL(window.location.href);

    if (url.searchParams.has("_demo")) {
      url.searchParams.delete("_demo");
      window.location.replace(
        `${url.pathname}${url.search}${url.hash}`,
      );
      return;
    }

    unstable_retry();
  }

  return (
    <PropertyRouteState
      role="alert"
      tone="error"
      eyebrow="Property interrupted"
      title="We couldn’t prepare this stay."
      description="An unexpected problem interrupted the property page. Try the page again before returning to the wider collection."
      statusLabel="Recoverable error"
      statusTitle="The details may still be within reach."
      statusDescription="Retrying asks this property route to render again. No booking, payment, or live inventory request has been made."
      actions={
        <>
          <button
            type="button"
            onClick={retryProperty}
            className="group inline-flex min-h-12 w-full items-center justify-between gap-5 rounded-full border border-brand-forest-deep bg-brand-forest-deep px-6 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:bg-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-px sm:w-auto"
          >
            Try this stay again
            <ArrowClockwise
              aria-hidden="true"
              size={16}
              className="transition-transform duration-200 ease-luma group-hover:rotate-45 motion-reduce:transition-none"
            />
          </button>
          <Link
            href="/search"
            className="group inline-flex min-h-11 items-center gap-3 px-2 text-sm font-semibold text-brand-forest-deep underline decoration-brand-forest-deep/35 underline-offset-4 transition-colors duration-200 hover:text-brand-brass-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Explore other stays
            <ArrowRight
              aria-hidden="true"
              size={15}
              className="transition-transform duration-200 ease-luma group-hover:translate-x-1"
            />
          </Link>
        </>
      }
      railLabel="Recovery note"
      railItems={[
        "Retry stays on this property route.",
        "Your browser has not submitted a booking.",
        "The wider LumaStay collection remains available.",
      ]}
    />
  );
}
