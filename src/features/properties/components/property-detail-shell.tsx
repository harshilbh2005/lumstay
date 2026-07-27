import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  Star,
} from "@phosphor-icons/react/ssr";

import { getMediaById } from "@/data/mock";
import type { PropertyDetail } from "@/types/domain";

import { SaveStayButton } from "./save-stay-button";
import { PropertyGallery } from "./property-gallery";

export function PropertyDetailShell({
  property,
}: {
  property: PropertyDetail;
}) {
  const { summary, editorial } = property;
  const galleryMedia = property.galleryMediaIds.flatMap((mediaId) => {
    const media = getMediaById(mediaId);

    return media ? [media] : [];
  });

  if (galleryMedia.length === 0) {
    return null;
  }

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: summary.priceFrom.currency,
    maximumFractionDigits: 0,
  }).format(summary.priceFrom.amount);

  return (
    <main className="min-h-screen overflow-hidden bg-brand-paper">
      <article>
        <header className="container-luma pb-10 pt-8 sm:pb-14 sm:pt-10 lg:pb-16 lg:pt-14">
          <nav aria-label="Breadcrumb">
            <Link
              href="/search"
              className="group inline-flex min-h-11 items-center gap-3 rounded-sm font-mono text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase transition-colors duration-200 hover:text-brand-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
            >
              <ArrowLeft
                aria-hidden="true"
                size={15}
                className="transition-transform duration-200 ease-luma group-hover:-translate-x-1"
              />
              All stays
            </Link>
          </nav>

          <div className="mt-8 grid gap-8 border-t border-brand-forest-deep/18 pt-6 lg:mt-12 lg:grid-cols-12 lg:gap-x-8 lg:pt-8">
            <div className="lg:col-span-3">
              <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-brand-stone uppercase">
                <span className="mr-3 text-brand-brass">01</span>
                {editorial.folio}
              </p>
              <p className="mt-5 max-w-[24rem] text-sm leading-6 text-muted-foreground capitalize lg:mt-8">
                {summary.propertyType.replaceAll("-", " ")}
                {summary.isLumaPick ? " · Luma pick" : ""}
              </p>
            </div>

            <div className="lg:col-span-6">
              <h1 className="max-w-[8ch] font-sans text-[clamp(3.75rem,8.2vw,8rem)] leading-[0.82] font-bold tracking-[-0.075em] text-brand-forest-deep">
                {summary.name}
              </h1>
            </div>

            <div className="flex items-end lg:col-span-3">
              <p className="max-w-[31rem] text-[1.0625rem] leading-7 text-foreground/78 sm:text-lg sm:leading-8">
                {editorial.statement}
              </p>
            </div>
          </div>

          <div className="mt-10 grid lg:mt-12 lg:grid-cols-12 lg:gap-x-8">
            <div className="grid grid-cols-2 border-y border-brand-forest-deep/18 lg:col-span-9 lg:col-start-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)_minmax(0,0.9fr)_auto]">
              <div className="min-w-0 border-r border-b border-brand-forest-deep/18 px-4 py-4 sm:px-5 sm:py-5 lg:border-b-0 lg:px-6">
                <p className="flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase">
                  <MapPin aria-hidden="true" size={13} />
                  Setting
                </p>
                <p className="mt-2 text-sm leading-5 font-semibold text-brand-forest-deep sm:text-base">
                  {summary.location.city}
                  {summary.location.region
                    ? ` · ${summary.location.region}`
                    : ""}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {summary.location.country}
                </p>
              </div>

              <div className="min-w-0 border-b border-brand-forest-deep/18 px-4 py-4 sm:px-5 sm:py-5 lg:border-r lg:border-b-0 lg:px-6">
                <p className="font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase">
                  Guest rating
                </p>
                <p
                  aria-label={`Rated ${summary.rating.toFixed(2)} out of 5 from ${summary.reviewCount} guest reviews`}
                  className="mt-2 flex items-center gap-2 text-base font-semibold text-brand-forest-deep"
                >
                  <Star
                    aria-hidden="true"
                    size={14}
                    weight="fill"
                    className="text-brand-brass"
                  />
                  <span className="font-mono tabular-nums">
                    {summary.rating.toFixed(2)}
                  </span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {summary.reviewCount} guest reviews
                </p>
              </div>

              <div className="min-w-0 border-r border-brand-forest-deep/18 px-4 py-4 sm:px-5 sm:py-5 lg:px-6">
                <p className="font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase">
                  Stay from
                </p>
                <p className="mt-2 font-mono text-base font-medium text-brand-forest-deep tabular-nums">
                  {formattedPrice}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Per night · taxes later
                </p>
              </div>

              <SaveStayButton
                propertyName={summary.name}
                variant="ledger"
              />
            </div>
          </div>
        </header>

        <PropertyGallery
          media={galleryMedia}
          propertyName={summary.name}
          location={`${summary.location.city} · ${summary.location.country}`}
        />

        <section
          aria-labelledby="luma-note-title"
          className="container-luma py-[var(--space-section)]"
        >
          <div className="grid gap-10 border-t border-brand-forest-deep/18 pt-7 lg:grid-cols-12 lg:gap-x-8 lg:pt-9">
            <div className="lg:col-span-3">
              <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-brand-stone uppercase">
                <span className="mr-3 text-brand-brass">02</span>
                The Luma note
              </p>
            </div>

            <div className="lg:col-span-6">
              <h2
                id="luma-note-title"
                className="max-w-[12ch] font-display text-[clamp(2.6rem,5.2vw,5rem)] leading-[0.96] font-medium tracking-[-0.045em] text-brand-forest-deep"
              >
                A hillside house, edited by the sea.
              </h2>
              <p className="mt-8 max-w-[41rem] text-base leading-8 text-foreground/76 sm:text-lg sm:leading-8">
                {editorial.note}
              </p>
            </div>

            <div className="flex items-end lg:col-span-3">
              <Link
                href="/search"
                className="group inline-flex min-h-11 items-center gap-3 border-b border-brand-forest-deep/45 text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:border-brand-brass hover:text-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
              >
                Return to the collection
                <ArrowUpRight
                  aria-hidden="true"
                  size={16}
                  className="transition-transform duration-200 ease-luma group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
