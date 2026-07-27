import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/ssr";

import { getMediaById } from "@/data/mock";
import type { PropertyDetail } from "@/types/domain";

export function PropertyDetailShell({
  property,
}: {
  property: PropertyDetail;
}) {
  const { summary, editorial } = property;
  const leadMedia = getMediaById(property.galleryMediaIds[0]);

  if (!leadMedia) {
    return null;
  }

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
              <p className="mt-5 max-w-[24rem] text-sm leading-6 text-muted-foreground lg:mt-8">
                {summary.location.city}, {summary.location.country}
                {summary.location.region ? ` · ${summary.location.region}` : ""}
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
        </header>

        <figure className="container-luma">
          <div className="relative aspect-[4/5] overflow-hidden bg-brand-linen sm:aspect-[16/10] lg:aspect-[16/8.3]">
            <Image
              fill
              preload
              src={leadMedia.src}
              alt={leadMedia.alt}
              sizes="(max-width: 767px) calc(100vw - 2.5rem), calc(100vw - 5rem)"
              className="object-cover"
              style={{ objectPosition: leadMedia.focalPoint }}
            />
          </div>
          <figcaption className="grid gap-3 border-b border-brand-forest-deep/18 py-4 font-mono text-[0.625rem] leading-5 tracking-[0.1em] text-muted-foreground uppercase sm:grid-cols-2 sm:py-5">
            <span>{leadMedia.title} · Lead view</span>
            <span className="sm:text-right">{leadMedia.location}</span>
          </figcaption>
        </figure>

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
