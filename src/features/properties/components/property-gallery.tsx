import Image from "next/image";

import type { LumaStayMediaAsset } from "@/data/mock";

const desktopPlacement = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
] as const;

export function PropertyGallery({
  media,
  propertyName,
  location,
}: {
  media: readonly LumaStayMediaAsset[];
  propertyName: string;
  location: string;
}) {
  const gallerySize = media.length.toString().padStart(2, "0");

  return (
    <figure className="container-luma">
      <ol
        aria-label={`${propertyName} image gallery`}
        className="flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:h-[clamp(34rem,50vw,46rem)] lg:grid-cols-12 lg:grid-rows-2 lg:overflow-visible lg:pb-0"
      >
        {media.map((asset, index) => (
          <li
            key={asset.id}
            className={`relative aspect-[4/5] w-[84vw] max-w-[22rem] shrink-0 snap-start overflow-hidden bg-brand-linen sm:w-[72vw] lg:aspect-auto lg:w-auto lg:max-w-none ${
              desktopPlacement[index] ?? "lg:col-span-3"
            }`}
          >
            <Image
              fill
              preload={index === 0}
              src={asset.src}
              alt={asset.alt}
              sizes={
                index === 0
                  ? "(max-width: 639px) 84vw, (max-width: 1023px) 72vw, 58vw"
                  : "(max-width: 639px) 84vw, (max-width: 1023px) 72vw, 25vw"
              }
              className="object-cover"
              style={{ objectPosition: asset.focalPoint }}
            />
            <span className="absolute top-3 left-3 bg-brand-paper/92 px-2.5 py-1.5 font-mono text-[0.5625rem] leading-none tracking-[0.12em] text-brand-forest-deep uppercase">
              {(index + 1).toString().padStart(2, "0")} / {gallerySize}
            </span>
          </li>
        ))}
      </ol>

      <figcaption className="grid gap-3 border-b border-brand-forest-deep/18 py-4 font-mono text-[0.625rem] leading-5 tracking-[0.1em] text-muted-foreground uppercase sm:grid-cols-2 sm:py-5">
        <span>{gallerySize} illustrative views · {propertyName} studies</span>
        <span className="sm:text-right">{location}</span>
      </figcaption>
    </figure>
  );
}
