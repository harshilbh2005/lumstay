"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowsOutSimple,
  X,
} from "@phosphor-icons/react";

import type { LumaStayMediaAsset } from "@/data/mock";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type PropertyGalleryMedia = Pick<
  LumaStayMediaAsset,
  "alt" | "focalPoint" | "id" | "location" | "src" | "title"
>;

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
  media: readonly PropertyGalleryMedia[];
  propertyName: string;
  location: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const gallerySize = media.length.toString().padStart(2, "0");
  const activeMedia = media[activeIndex] ?? media[0];

  if (!activeMedia) {
    return null;
  }

  function showPrevious() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? media.length - 1 : currentIndex - 1,
    );
  }

  function showNext() {
    setActiveIndex((currentIndex) =>
      currentIndex === media.length - 1 ? 0 : currentIndex + 1,
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              <DialogTrigger
                type="button"
                aria-label={`Open photo ${index + 1} of ${media.length}: ${asset.title}`}
                onClick={() => setActiveIndex(index)}
                className="group relative block h-full w-full cursor-zoom-in overflow-hidden focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-inset"
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
                  className="object-cover transition-transform duration-300 ease-luma group-hover:scale-[1.015]"
                  style={{ objectPosition: asset.focalPoint }}
                />
                <span className="absolute top-3 left-3 bg-brand-paper/92 px-2.5 py-1.5 font-mono text-[0.5625rem] leading-none tracking-[0.12em] text-brand-forest-deep uppercase">
                  {(index + 1).toString().padStart(2, "0")} / {gallerySize}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute right-3 bottom-3 flex size-11 items-center justify-center rounded-full border border-brand-paper/35 bg-brand-forest-deep/72 text-brand-paper opacity-100 backdrop-blur-sm transition-colors duration-200 group-hover:border-brand-brass group-hover:bg-brand-forest-deep sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100"
                >
                  <ArrowsOutSimple size={17} />
                </span>
              </DialogTrigger>
            </li>
          ))}
        </ol>

        <figcaption className="grid gap-3 border-b border-brand-forest-deep/18 py-4 font-mono text-[0.625rem] leading-5 tracking-[0.1em] text-muted-foreground uppercase sm:grid-cols-2 sm:py-5">
          <span>
            {gallerySize} illustrative views · {propertyName} studies
          </span>
          <span className="sm:text-right">{location}</span>
        </figcaption>
      </figure>

      <DialogContent
        showCloseButton={false}
        initialFocus={closeButtonRef}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            showPrevious();
          }

          if (event.key === "ArrowRight") {
            event.preventDefault();
            showNext();
          }

          if (event.key === "Home") {
            event.preventDefault();
            setActiveIndex(0);
          }

          if (event.key === "End") {
            event.preventDefault();
            setActiveIndex(media.length - 1);
          }
        }}
        className="inset-0 top-0 left-0 z-50 grid h-[100dvh] min-h-[100dvh] max-h-none w-screen max-w-none translate-x-0 translate-y-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden rounded-none bg-brand-forest-deep p-0 text-brand-paper ring-0 sm:max-w-none data-open:zoom-in-100 data-closed:zoom-out-100"
      >
        <DialogTitle className="sr-only">
          {propertyName} fullscreen gallery
        </DialogTitle>
        <DialogDescription className="sr-only">
          Use the previous and next controls, swipe, or press the left and right
          arrow keys to move between photos.
        </DialogDescription>

        <header className="z-20 flex min-h-18 items-center justify-between border-b border-brand-paper/14 px-4 sm:px-8">
          <div className="min-w-0">
            <p className="font-sans text-sm font-semibold text-brand-paper">
              {propertyName}
            </p>
            <p className="mt-0.5 truncate font-mono text-[0.5625rem] tracking-[0.12em] text-brand-paper/58 uppercase">
              {location} · Illustrative gallery
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <p
              aria-live="polite"
              aria-atomic="true"
              className="shrink-0 font-mono text-[0.6875rem] tracking-[0.12em] whitespace-nowrap text-brand-paper/78 tabular-nums"
            >
              {(activeIndex + 1).toString().padStart(2, "0")} / {gallerySize}
            </p>
            <DialogClose
              ref={closeButtonRef}
              aria-label="Close fullscreen gallery"
              className="flex size-12 shrink-0 items-center justify-center rounded-full border border-brand-paper/26 text-brand-paper transition-colors duration-200 hover:border-brand-brass hover:bg-brand-paper/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest-deep active:scale-[0.98]"
            >
              <X aria-hidden="true" size={20} />
            </DialogClose>
          </div>
        </header>

        <div
          className="relative min-h-0 overflow-hidden bg-[#0b2425] px-3 py-3 sm:px-20 sm:py-6 lg:px-28"
          onTouchStart={(event) => {
            touchStartX.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const startX = touchStartX.current;
            const endX = event.changedTouches[0]?.clientX;
            touchStartX.current = null;

            if (startX === null || endX === undefined) {
              return;
            }

            const distance = endX - startX;

            if (Math.abs(distance) < 50) {
              return;
            }

            if (distance > 0) {
              showPrevious();
            } else {
              showNext();
            }
          }}
        >
          <div
            key={activeMedia.id}
            className="relative mx-auto h-full w-full max-w-[100rem] animate-in fade-in-0 duration-200"
          >
            <Image
              fill
              loading="eager"
              src={activeMedia.src}
              alt={activeMedia.alt}
              sizes="(max-width: 767px) calc(100vw - 1.5rem), calc(100vw - 10rem)"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            aria-label={`Previous photo: ${
              media[(activeIndex - 1 + media.length) % media.length]?.title
            }`}
            onClick={showPrevious}
            className="absolute top-1/2 left-4 flex size-13 -translate-y-1/2 items-center justify-center rounded-full border border-brand-paper/28 bg-brand-forest-deep/78 text-brand-paper backdrop-blur-sm transition-colors duration-200 hover:border-brand-brass hover:bg-brand-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2425] active:scale-[0.98] sm:left-7 sm:size-14"
          >
            <ArrowLeft aria-hidden="true" size={21} />
          </button>

          <button
            type="button"
            aria-label={`Next photo: ${
              media[(activeIndex + 1) % media.length]?.title
            }`}
            onClick={showNext}
            className="absolute top-1/2 right-4 flex size-13 -translate-y-1/2 items-center justify-center rounded-full border border-brand-paper/28 bg-brand-forest-deep/78 text-brand-paper backdrop-blur-sm transition-colors duration-200 hover:border-brand-brass hover:bg-brand-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2425] active:scale-[0.98] sm:right-7 sm:size-14"
          >
            <ArrowRight aria-hidden="true" size={21} />
          </button>
        </div>

        <footer className="grid min-h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-brand-paper/14 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:px-8">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-brand-paper">
              {activeMedia.title}
            </p>
            <p className="mt-0.5 truncate font-mono text-[0.5625rem] tracking-[0.1em] text-brand-paper/52 uppercase">
              {activeMedia.location ?? "Mediterranean study"}
            </p>
          </div>

          <div
            aria-hidden="true"
            className="hidden items-center gap-1.5 sm:flex"
          >
            {media.map((asset, index) => (
              <span
                key={asset.id}
                className={`h-px w-7 transition-colors duration-200 ${
                  index === activeIndex
                    ? "bg-brand-brass"
                    : "bg-brand-paper/24"
                }`}
              />
            ))}
          </div>

          <p className="text-right font-mono text-[0.5625rem] leading-4 tracking-[0.1em] text-brand-paper/52 uppercase">
            Swipe or use arrow keys
          </p>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
