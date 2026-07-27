import Link from "next/link";
import { ArrowDown } from "@phosphor-icons/react/ssr";

import { SEARCH_RESULTS_BATCH_SIZE } from "@/features/search/lib/search-filters";

export function SearchResultsProgress({
  visibleCount,
  totalCount,
  moreResultsHref,
}: {
  visibleCount: number;
  totalCount: number;
  moreResultsHref: string | null;
}) {
  const nextBatchCount = Math.min(
    SEARCH_RESULTS_BATCH_SIZE,
    totalCount - visibleCount,
  );

  return (
    <div className="grid min-h-28 items-center gap-5 border-y border-brand-forest-deep/18 py-5 sm:grid-cols-[1fr_auto] sm:px-1">
      <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-stone uppercase">
        <span className="text-brand-forest-deep">
          {String(visibleCount).padStart(2, "0")}
        </span>{" "}
        of {String(totalCount).padStart(2, "0")} stays shown
      </p>

      {moreResultsHref ? (
        <Link
          href={moreResultsHref}
          scroll={false}
          prefetch={false}
          aria-label={`Show ${nextBatchCount} more stays`}
          className="group inline-flex min-h-12 w-full items-center justify-between gap-8 border border-brand-forest-deep px-5 text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:bg-brand-forest-deep hover:text-brand-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 active:translate-y-px sm:w-auto"
        >
          Show {nextBatchCount} more stays
          <ArrowDown
            aria-hidden="true"
            size={16}
            className="transition-transform duration-200 ease-luma group-hover:translate-y-1"
          />
        </Link>
      ) : (
        <p
          role="status"
          className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-forest-deep uppercase"
        >
          The full edit is in view
        </p>
      )}
    </div>
  );
}
