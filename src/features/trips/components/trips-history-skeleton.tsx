import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const statusPlaceholders = ["01", "02", "03", "04"] as const;
const recordPlaceholders = ["01", "02"] as const;

function QuietSkeleton({ className }: { className: string }) {
  return (
    <Skeleton
      aria-hidden="true"
      className={cn("rounded-none bg-muted", className)}
    />
  );
}

function TripRecordSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "grid gap-6 py-8 sm:py-10 lg:grid-cols-12 lg:gap-x-8 lg:py-12",
        featured && "lg:py-14",
      )}
    >
      <div className="lg:col-span-3">
        <QuietSkeleton
          className={cn(
            "aspect-[4/3] w-full",
            featured && "lg:aspect-[5/4]",
          )}
        />
      </div>

      <div className="lg:col-start-5 lg:col-span-5">
        <QuietSkeleton className="h-2.5 w-28" />
        <QuietSkeleton className="mt-5 h-11 w-[76%] sm:h-13" />
        <div className="mt-6 space-y-2.5">
          <QuietSkeleton className="h-3 w-full" />
          <QuietSkeleton className="h-3 w-[84%]" />
          <QuietSkeleton className="h-3 w-[62%]" />
        </div>
      </div>

      <div className="border-t border-brand-forest-deep/14 pt-5 lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
        <QuietSkeleton className="h-2.5 w-20" />
        <QuietSkeleton className="mt-4 h-4 w-36" />
        <QuietSkeleton className="mt-8 h-2.5 w-24" />
        <QuietSkeleton className="mt-4 h-4 w-28" />
      </div>
    </div>
  );
}

export function TripsHistorySkeleton() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      aria-busy="true"
      className="min-h-screen bg-brand-paper"
    >
      <span className="sr-only" role="status" aria-live="polite">
        Loading trip history
      </span>

      <section
        aria-labelledby="trips-loading-heading"
        className="container-luma pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28"
      >
        <div className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.16em] text-brand-brass-dark uppercase">
          <span className="h-px w-7 bg-brand-brass" aria-hidden="true" />
          Your journey ledger
        </div>

        <div className="mt-6 grid gap-9 border-t border-brand-forest-deep/18 pt-8 lg:grid-cols-12 lg:gap-x-8 lg:pt-10">
          <h1
            id="trips-loading-heading"
            className="max-w-[10ch] text-[clamp(3.55rem,8vw,7.75rem)] leading-[0.88] font-semibold tracking-[-0.055em] text-brand-forest-deep lg:col-span-8"
          >
            Every trip, kept in clear view.
          </h1>

          <div aria-hidden="true" className="lg:col-start-10 lg:col-span-3 lg:self-end">
            <QuietSkeleton className="h-3.5 w-full" />
            <QuietSkeleton className="mt-3 h-3.5 w-[92%]" />
            <QuietSkeleton className="mt-3 h-3.5 w-[70%]" />
            <QuietSkeleton className="mt-7 h-12 w-48" />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mt-12 grid grid-cols-2 border-t border-l border-brand-forest-deep/16 sm:grid-cols-4"
        >
          {statusPlaceholders.map((placeholder, index) => (
            <div
              key={placeholder}
              className="flex min-h-20 items-center justify-between gap-3 border-r border-b border-brand-forest-deep/16 px-4 py-3"
            >
              <QuietSkeleton
                className={cn(
                  "h-3",
                  index === 3 ? "w-28" : index === 2 ? "w-20" : "w-18",
                )}
              />
              <QuietSkeleton className="h-2.5 w-5" />
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3" aria-hidden="true">
          <span className="h-10 w-px bg-brand-brass/45" />
          <div className="w-full max-w-[46rem] space-y-2">
            <QuietSkeleton className="h-2.5 w-full" />
            <QuietSkeleton className="h-2.5 w-[76%]" />
          </div>
        </div>
      </section>

      <section aria-hidden="true" className="bg-brand-linen">
        <div className="container-luma py-[var(--space-section)]">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-8">
            <QuietSkeleton className="h-2.5 w-28 lg:col-span-3" />
            <div className="lg:col-start-5 lg:col-span-5">
              <QuietSkeleton className="h-14 w-[78%] sm:h-18" />
              <QuietSkeleton className="mt-3 h-14 w-[54%] sm:h-18" />
            </div>
            <div className="space-y-2.5 lg:col-span-3 lg:self-end">
              <QuietSkeleton className="h-3 w-full" />
              <QuietSkeleton className="h-3 w-[88%]" />
              <QuietSkeleton className="h-3 w-[64%]" />
            </div>
          </div>

          <div className="mt-10 divide-y divide-brand-forest-deep/16 border-t border-brand-forest-deep/16 sm:mt-14">
            {recordPlaceholders.map((placeholder, index) => (
              <TripRecordSkeleton key={placeholder} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
