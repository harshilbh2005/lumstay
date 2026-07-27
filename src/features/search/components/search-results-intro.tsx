export function SearchResultsIntro() {
  return (
    <header className="grid gap-8 border-t border-brand-forest-deep/20 pt-6 lg:grid-cols-12 lg:gap-x-8 lg:pt-8">
      <p className="flex items-start gap-3 font-mono text-[0.6875rem] tracking-[0.15em] text-brand-stone uppercase lg:col-span-3">
        <span className="text-brand-brass">01</span>
        Search the edit
      </p>

      <div className="lg:col-span-6">
        <h1
          id="search-results-title"
          className="max-w-[12ch] font-sans text-[clamp(3rem,6vw,6.6rem)] leading-[0.9] font-bold tracking-[-0.065em] text-brand-forest-deep"
        >
          Considered stays, each with a reason to go.
        </h1>
      </div>

      <p className="max-w-[30rem] text-base leading-7 text-muted-foreground lg:col-span-3 lg:pt-1">
        A first pass across coast, city, mountain, and desert—ordered by
        character rather than commission.
      </p>
    </header>
  );
}
