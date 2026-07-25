import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "@phosphor-icons/react/ssr";

import { getMediaById } from "@/data/mock";
import { SaveStayButton } from "@/features/properties/components/save-stay-button";
import { cn } from "@/lib/utils";
import type { PropertySummary } from "@/types/domain";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

function getEditorialStatus(property: PropertySummary) {
  if (property.isNew) {
    return "Just added";
  }

  if (property.isLumaPick) {
    return "Luma pick";
  }

  return "Considered stay";
}

export function PropertyResultCard({
  property,
  index,
  featured = false,
  orderLabel,
}: {
  property: PropertySummary;
  index: number;
  featured?: boolean;
  orderLabel?: string;
}) {
  const media = getMediaById(property.mediaId);
  const propertyHref = `/properties/${property.slug}`;

  if (!media) {
    return null;
  }

  return (
    <article
      className={cn(
        "group py-8 sm:py-10 lg:py-12",
        featured && "lg:py-14",
      )}
    >
      <div
        className={cn(
          "grid min-w-0 gap-5 sm:gap-7 md:grid-cols-[minmax(15rem,0.82fr)_minmax(0,1.18fr)] md:gap-8",
          featured
            ? "lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:gap-12"
            : "lg:grid-cols-[minmax(17rem,0.78fr)_minmax(0,1.22fr)] lg:gap-10",
        )}
      >
        <div
          className={cn(
            "relative aspect-[16/10] min-w-0 overflow-hidden bg-muted sm:aspect-[4/3] md:aspect-auto md:min-h-[23rem]",
            featured && "lg:min-h-[31rem]",
          )}
        >
          <Link
            href={propertyHref}
            prefetch={false}
            aria-label={`View ${property.name}`}
            className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-inset"
          >
            <Image
              fill
              src={media.src}
              alt={media.alt}
              sizes={
                featured
                  ? "(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1023px) 42vw, 39vw"
                  : "(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1023px) 42vw, 27vw"
              }
              priority={index === 0}
              className="object-cover transition-transform duration-500 ease-luma group-hover:scale-[1.018]"
              style={{ objectPosition: media.focalPoint }}
            />
          </Link>

          <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-4 sm:inset-x-5 sm:top-5">
            <span className="flex min-h-8 items-center border border-white/34 bg-brand-forest-deep/68 px-3 font-mono text-[0.625rem] tracking-[0.13em] text-white uppercase backdrop-blur-md">
              {getEditorialStatus(property)}
            </span>
            <SaveStayButton
              propertyName={property.name}
              className="pointer-events-auto shrink-0"
            />
          </div>

          <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 font-mono text-[0.625rem] tracking-[0.14em] text-white/84 uppercase sm:inset-x-5 sm:bottom-5">
            <span>
              {orderLabel ?? (featured ? "First in the edit" : "Luma order")}
            </span>
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
        </div>

        <div
          className={cn(
            "flex min-w-0 flex-col md:py-1",
            featured && "lg:py-3",
          )}
        >
          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 font-mono text-[0.625rem] tracking-[0.11em] text-muted-foreground uppercase">
            <span>
              {property.location.city} · {property.location.country}
            </span>
            <span className="flex items-center gap-1.5 text-foreground">
              <Star aria-hidden="true" size={11} weight="fill" />
              {property.rating.toFixed(2)}
              <span className="text-muted-foreground">
                · {property.reviewCount} notes
              </span>
            </span>
          </div>

          <Link
            href={propertyHref}
            prefetch={false}
            className="mt-2 inline-flex min-h-11 w-fit items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
          >
            <h3
              className={cn(
                "font-sans leading-[0.98] font-bold tracking-[-0.05em] text-brand-forest-deep",
                featured
                  ? "text-[clamp(2.25rem,4.2vw,4.25rem)]"
                  : "text-[clamp(2rem,3vw,3.25rem)]",
              )}
            >
              {property.name}
            </h3>
          </Link>

          <p
            className={cn(
              "mt-3 line-clamp-3 max-w-[54ch] text-base leading-7 text-muted-foreground sm:mt-4 sm:line-clamp-none",
              featured && "lg:max-w-[46ch]",
            )}
          >
            {property.description}
          </p>

          <dl className="mt-6 grid grid-cols-2 border-y border-brand-forest-deep/14">
            <div className="py-4 pr-3 sm:pr-5">
              <dt className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-stone uppercase">
                The feeling
              </dt>
              <dd className="mt-1.5 text-[0.8125rem] leading-5 text-foreground sm:text-sm sm:leading-6">
                {property.atmosphere.join(" · ")}
              </dd>
            </div>
            <div className="border-l border-brand-forest-deep/14 py-4 pl-3 sm:pl-5">
              <dt className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-stone uppercase">
                Worth knowing
              </dt>
              <dd className="mt-1.5 text-[0.8125rem] leading-5 text-foreground sm:text-sm sm:leading-6">
                {property.facilities.join(" · ")}
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-5 md:mt-auto md:pt-7">
            <p className="text-sm text-muted-foreground">
              <span className="mb-1 block font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase">
                From
              </span>
              <span className="font-mono text-base font-medium text-foreground tabular-nums">
                ₹{priceFormatter.format(property.priceFrom.amount)}
              </span>{" "}
              / night
            </p>
            <Link
              href={propertyHref}
              prefetch={false}
              className="group/link inline-flex min-h-11 items-center gap-3 border-b border-brand-forest-deep/45 text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:border-brand-brass hover:text-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 active:translate-y-px"
            >
              View the stay
              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-200 ease-luma group-hover/link:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
