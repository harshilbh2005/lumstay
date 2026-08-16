function SkeletonBlock({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-brand-forest-deep/[0.075] ${className}`}
    />
  );
}

export function PropertyDetailSkeleton() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      aria-busy="true"
      aria-labelledby="property-loading-status"
      className="min-h-screen overflow-clip bg-brand-paper"
    >
      <p id="property-loading-status" role="status" className="sr-only">
        Loading property details
      </p>

      <div aria-hidden="true">
        <header className="container-luma pb-10 pt-8 sm:pb-14 sm:pt-10 lg:pb-16 lg:pt-14">
          <SkeletonBlock className="h-11 w-28" />

          <div className="mt-8 grid gap-8 border-t border-brand-forest-deep/18 pt-6 lg:mt-12 lg:grid-cols-12 lg:gap-x-8 lg:pt-8">
            <div className="lg:col-span-3">
              <SkeletonBlock className="h-3 w-36" />
              <SkeletonBlock className="mt-8 h-4 w-44" />
            </div>

            <div className="lg:col-span-6">
              <SkeletonBlock className="h-[7.5rem] w-full max-w-[34rem] sm:h-[10rem] lg:h-[12rem]" />
            </div>

            <div className="flex flex-col justify-end gap-3 lg:col-span-3">
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-[92%]" />
              <SkeletonBlock className="h-4 w-[72%]" />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 border-y border-brand-forest-deep/18 lg:mt-12 lg:ml-[25%] lg:grid-cols-[1.25fr_0.75fr_0.9fr_7.5rem]">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="border-r border-b border-brand-forest-deep/14 p-4 last:border-r-0 sm:p-5 lg:border-b-0"
              >
                <SkeletonBlock className="h-2.5 w-20" />
                <SkeletonBlock className="mt-3 h-4 w-[78%]" />
                <SkeletonBlock className="mt-2 h-3 w-[58%]" />
              </div>
            ))}
          </div>
        </header>

        <section className="container-luma overflow-hidden">
          <div className="flex gap-2 lg:grid lg:h-[clamp(34rem,50vw,46rem)] lg:grid-cols-12 lg:grid-rows-2">
            <SkeletonBlock className="aspect-[4/5] w-[84vw] max-w-[22rem] shrink-0 sm:w-[72vw] lg:col-span-7 lg:row-span-2 lg:h-auto lg:w-auto lg:max-w-none" />
            <SkeletonBlock className="aspect-[4/5] w-[40vw] shrink-0 sm:w-[34vw] lg:col-span-3 lg:h-auto lg:w-auto" />
            <SkeletonBlock className="hidden lg:col-span-2 lg:block" />
            <SkeletonBlock className="hidden lg:col-span-2 lg:block" />
            <SkeletonBlock className="hidden lg:col-span-3 lg:block" />
          </div>
          <div className="grid gap-3 border-b border-brand-forest-deep/18 py-4 sm:grid-cols-2 sm:py-5">
            <SkeletonBlock className="h-3 w-48" />
            <SkeletonBlock className="h-3 w-36 sm:justify-self-end" />
          </div>
        </section>

        <section className="container-luma py-[var(--space-section)]">
          <div className="grid gap-10 border-t border-brand-forest-deep/18 pt-7 lg:grid-cols-12 lg:gap-x-8 lg:pt-9">
            <SkeletonBlock className="h-3 w-32 lg:col-span-3" />
            <div className="lg:col-span-6">
              <SkeletonBlock className="h-24 w-full max-w-[32rem] sm:h-32" />
              <div className="mt-8 grid gap-3">
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="h-4 w-[94%]" />
                <SkeletonBlock className="h-4 w-[78%]" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
