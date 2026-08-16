"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export interface ExperienceStory {
  mediaId: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
  location?: string;
}

export function ExperienceGallery({ stories }: { stories: ExperienceStory[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStory = stories[activeIndex] ?? stories[0];

  if (!activeStory) {
    return null;
  }

  return (
    <div className="mt-12 lg:mt-20">
      <div className="hidden min-h-[43rem] grid-cols-12 gap-x-8 lg:grid">
        <div className="col-span-4 flex min-w-0 flex-col pr-6 xl:pr-12">
          <div
            role="group"
            aria-label="Choose an experience"
            className="border-b border-white/16"
          >
            {stories.map((story, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={story.mediaId}
                  type="button"
                  aria-controls="experience-story-stage"
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className="group relative flex min-h-24 w-full items-center gap-5 border-t border-white/16 py-5 text-left focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-4 focus-visible:ring-offset-brand-forest-deep"
                >
                  <span
                    className={`h-px w-10 shrink-0 origin-left transition-[transform,background-color] duration-300 ease-luma motion-reduce:transition-none ${
                      isActive
                        ? "scale-x-100 bg-brand-brass"
                        : "scale-x-50 bg-white/32 group-hover:scale-x-75 group-hover:bg-white/54"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span
                      className={`block font-mono text-[0.625rem] tracking-[0.14em] uppercase transition-colors duration-200 motion-reduce:transition-none ${
                        isActive ? "text-brand-brass" : "text-white/48"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")} · {story.eyebrow}
                    </span>
                    <span
                      className={`mt-2 block font-sans text-[1.65rem] leading-none font-bold tracking-[-0.04em] transition-colors duration-200 motion-reduce:transition-none ${
                        isActive ? "text-brand-paper" : "text-white/58"
                      }`}
                    >
                      {story.title}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-auto border-l border-brand-brass/55 pl-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeStory.mediaId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="max-w-[29rem] text-base leading-7 text-white/64">
                  {activeStory.description}
                </p>
                <Link
                  href={activeStory.href}
                  className="group/link mt-6 inline-flex min-h-11 items-center gap-3 border-b border-white/35 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:border-brand-brass hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-4 focus-visible:ring-offset-brand-forest-deep motion-reduce:transition-none"
                >
                  Explore this feeling
                  <ArrowRight
                    aria-hidden="true"
                    size={16}
                    className="transition-transform duration-200 ease-luma group-hover/link:translate-x-1 motion-reduce:transition-none"
                  />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div
          id="experience-story-stage"
          className="relative col-span-8 min-h-0 overflow-hidden bg-brand-forest"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeStory.mediaId}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.012 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                fill
                src={activeStory.image}
                alt={activeStory.imageAlt}
                sizes="(max-width: 1023px) 0px, 66vw"
                style={{ objectPosition: activeStory.imagePosition }}
                className="object-cover"
              />
              <span
                className="absolute inset-0 bg-gradient-to-t from-brand-forest-deep/90 via-brand-forest-deep/8 to-brand-forest-deep/8"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-8 p-8 xl:p-10">
                <div>
                  <p className="font-mono text-[0.625rem] tracking-[0.15em] text-white/72 uppercase">
                    {activeStory.location ?? "LumaStay collection"}
                  </p>
                  <p className="mt-2 max-w-[12ch] font-sans text-[clamp(2.25rem,3.5vw,4.25rem)] leading-[0.92] font-bold tracking-[-0.055em] text-white">
                    {activeStory.title}
                  </p>
                </div>
                <Link
                  href={activeStory.href}
                  aria-label={`Explore ${activeStory.title}`}
                  className="grid size-14 shrink-0 place-items-center border border-white/46 bg-brand-forest-deep/28 text-white backdrop-blur-sm transition-colors duration-200 hover:border-brand-brass hover:bg-brand-forest-deep/58 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-4 focus-visible:ring-offset-brand-forest-deep motion-reduce:transition-none"
                >
                  <ArrowUpRight aria-hidden="true" size={21} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <ol className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 [scrollbar-width:none] sm:-mx-10 sm:px-10 lg:hidden [&::-webkit-scrollbar]:hidden">
        {stories.map((story, index) => (
          <li
            key={story.mediaId}
            className="w-[82vw] max-w-[23rem] shrink-0 snap-center"
          >
            <Link
              href={story.href}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-4 focus-visible:ring-offset-brand-forest-deep"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-brand-forest">
                <Image
                  fill
                  src={story.image}
                  alt={story.imageAlt}
                  sizes="(max-width: 639px) 82vw, 23rem"
                  style={{ objectPosition: story.imagePosition }}
                  className="object-cover"
                />
                <span
                  className="absolute inset-0 bg-gradient-to-t from-brand-forest-deep/92 via-brand-forest-deep/8 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="font-mono text-[0.625rem] tracking-[0.14em] text-[#d2ab72] uppercase">
                    {String(index + 1).padStart(2, "0")} · {story.eyebrow}
                  </p>
                  <div className="mt-2 flex items-end justify-between gap-5">
                    <h3 className="font-sans text-[2rem] leading-none font-bold tracking-[-0.045em] text-white">
                      {story.title}
                    </h3>
                    <ArrowUpRight
                      aria-hidden="true"
                      size={20}
                      className="mb-0.5 shrink-0 text-white/72"
                    />
                  </div>
                </div>
              </div>
              <p className="mt-4 max-w-[33rem] text-sm leading-6 text-white/58">
                {story.description}
              </p>
            </Link>
          </li>
        ))}
      </ol>

      <p className="mt-3 flex items-center gap-3 font-mono text-[0.625rem] tracking-[0.12em] text-white/48 uppercase lg:hidden">
        <span className="h-px w-8 bg-brand-brass" aria-hidden="true" />
        Swipe through the stories
      </p>
    </div>
  );
}
