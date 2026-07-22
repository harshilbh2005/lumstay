import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/ssr";

import { getMediaById, mockEditorialStories } from "@/data/mock";
import type { EditorialStory } from "@/types/domain";

function getStoryMedia(story: EditorialStory) {
  const media = getMediaById(story.mediaId);

  if (!media) {
    throw new Error(`Missing media for editorial story: ${story.title}`);
  }

  return media;
}

function StoryMeta({ story, inverse = false }: { story: EditorialStory; inverse?: boolean }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.625rem] tracking-[0.12em] uppercase ${
        inverse ? "text-white/48" : "text-muted-foreground"
      }`}
    >
      <span className="text-brand-brass">{story.department}</span>
      <span aria-hidden="true">/</span>
      <span>By {story.author}</span>
      <span aria-hidden="true">/</span>
      <span>{story.readingTime}</span>
    </div>
  );
}

function RelatedPlaceLink({ story, inverse = false }: { story: EditorialStory; inverse?: boolean }) {
  return (
    <Link
      href={story.relatedHref}
      className={`group inline-flex min-h-11 w-fit items-center gap-3 rounded-sm text-sm font-semibold underline underline-offset-8 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 motion-reduce:transition-none ${
        inverse
          ? "text-brand-paper decoration-brand-brass/70 hover:text-brand-brass focus-visible:ring-brand-brass focus-visible:ring-offset-brand-forest-deep"
          : "text-brand-forest-deep decoration-brand-brass/70 hover:text-brand-brass focus-visible:ring-ring focus-visible:ring-offset-brand-paper"
      }`}
    >
      {story.relatedLabel}
      <ArrowUpRight
        aria-hidden="true"
        size={16}
        className="transition-transform duration-200 ease-luma group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
      />
    </Link>
  );
}

export function LumaEdit() {
  const [leadStory, roomFeature, ...fieldNotes] = mockEditorialStories;
  const leadMedia = getStoryMedia(leadStory);
  const roomMedia = getStoryMedia(roomFeature);

  return (
    <div className="bg-brand-paper">
      <section aria-labelledby="edit-heading" className="container-luma pt-12 sm:pt-16 lg:pt-20">
        <div className="grid gap-4 border-y border-border py-4 font-mono text-[0.625rem] tracking-[0.14em] text-muted-foreground uppercase sm:grid-cols-3 sm:items-center">
          <p>Issue No. 01 / The art of arriving</p>
          <p className="sm:text-center">July 2026</p>
          <p className="sm:text-right">Places / Rooms / Tables / Rituals</p>
        </div>

        <div className="grid gap-7 py-10 sm:py-14 lg:grid-cols-12 lg:items-end lg:py-16">
          <h1
            id="edit-heading"
            className="text-[clamp(4rem,11.5vw,10.5rem)] leading-[0.78] font-semibold tracking-[-0.065em] text-brand-forest-deep lg:col-span-9"
          >
            The Luma Edit
          </h1>
          <p className="max-w-[28rem] text-base leading-7 text-foreground/70 sm:text-lg sm:leading-8 lg:col-span-3 lg:pb-1">
            An independent journal of the places, rooms, tables, and rituals
            that make a stay worth remembering.
          </p>
        </div>

        <nav aria-label="Editorial departments" className="border-t border-l border-border">
          <ul className="grid grid-cols-2 sm:grid-cols-4">
            {[
              ["Places", "#places"],
              ["Rooms", "#rooms"],
              ["Tables", "#tables"],
              ["Rituals", "#rituals"],
            ].map(([label, href], index) => (
              <li key={href} className="border-r border-b border-border">
                <a
                  href={href}
                  className="group flex min-h-16 items-center justify-between gap-4 px-4 text-sm font-semibold text-foreground/78 transition-colors duration-200 hover:bg-brand-linen hover:text-brand-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring motion-reduce:transition-none sm:min-h-18 sm:px-5"
                >
                  <span>{label}</span>
                  <span className="font-mono text-[0.625rem] tracking-[0.1em] text-brand-brass">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <article
        id="places"
        className="container-luma scroll-mt-28 py-20 sm:py-28 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:py-36"
      >
        <figure className="lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden bg-brand-linen">
            <Image
              src={leadMedia.src}
              alt={leadMedia.alt}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover grayscale"
              style={{ objectPosition: leadMedia.focalPoint }}
            />
          </div>
          <figcaption className="mt-4 flex items-start justify-between gap-5 font-mono text-[0.625rem] leading-5 tracking-[0.1em] text-muted-foreground uppercase">
            <span>{leadMedia.title}</span>
            <span className="text-right">Opening essay / Issue 01</span>
          </figcaption>
        </figure>

        <div className="mt-12 flex flex-col lg:col-start-9 lg:col-span-4 lg:mt-0 lg:min-h-full">
          <div className="flex items-center justify-between border-b border-border pb-4 font-mono text-[0.625rem] tracking-[0.13em] text-muted-foreground uppercase">
            <span>Lead story</span>
            <span>01 / 07</span>
          </div>
          <div className="pt-9 lg:pt-14">
            <StoryMeta story={leadStory} />
            <h2 className="mt-5 text-[clamp(3rem,5.8vw,6rem)] leading-[0.88] font-semibold tracking-[-0.05em] text-brand-forest-deep">
              {leadStory.title}
            </h2>
            <p className="mt-7 max-w-[34rem] text-base leading-7 text-foreground/70 sm:text-lg sm:leading-8">
              {leadStory.deck}
            </p>
          </div>
          <div className="mt-10 border-t border-border pt-5 lg:mt-auto">
            <RelatedPlaceLink story={leadStory} />
          </div>
        </div>
      </article>

      <article id="rooms" className="scroll-mt-28 bg-brand-forest-deep py-20 text-brand-paper sm:py-28 lg:py-36">
        <div className="container-luma">
          <header className="grid gap-4 border-t border-white/16 pt-5 font-mono text-[0.625rem] tracking-[0.14em] text-white/48 uppercase sm:grid-cols-2">
            <p>Long read / Rooms</p>
            <p className="sm:text-right">02 / 07</p>
          </header>

          <figure className="mt-10">
            <div className="relative aspect-[4/3] overflow-hidden bg-white/6 sm:aspect-[16/9] lg:aspect-[16/7]">
              <Image
                src={roomMedia.src}
                alt={roomMedia.alt}
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: roomMedia.focalPoint }}
              />
            </div>
            <figcaption className="mt-4 flex items-start justify-between gap-5 font-mono text-[0.625rem] leading-5 tracking-[0.1em] text-white/42 uppercase">
              <span>{roomMedia.title}</span>
              <span className="text-right">Material / Light / Belonging</span>
            </figcaption>
          </figure>

          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-x-8 lg:mt-16">
            <div className="lg:col-span-7">
              <StoryMeta story={roomFeature} inverse />
              <h2 className="mt-5 max-w-[12ch] text-[clamp(3.2rem,6.5vw,6.75rem)] leading-[0.87] font-semibold tracking-[-0.055em]">
                {roomFeature.title}
              </h2>
            </div>
            <div className="lg:col-start-9 lg:col-span-4 lg:pt-1">
              <p className="text-base leading-7 text-white/68 sm:text-lg sm:leading-8">
                {roomFeature.deck}
              </p>
              <div className="mt-8 border-t border-white/16 pt-5">
                <RelatedPlaceLink story={roomFeature} inverse />
              </div>
            </div>
          </div>
        </div>
      </article>

      <section aria-labelledby="field-notes-heading" className="bg-brand-linen py-20 sm:py-28 lg:py-36">
        <div className="container-luma lg:grid lg:grid-cols-12 lg:gap-x-8">
          <header className="lg:col-span-3">
            <p className="font-mono text-[0.6875rem] tracking-[0.15em] text-brand-brass uppercase">
              Departments / 03–07
            </p>
            <h2
              id="field-notes-heading"
              className="mt-4 text-[clamp(3rem,5vw,5.25rem)] leading-[0.9] font-semibold tracking-[-0.045em] text-brand-forest-deep"
            >
              Field notes.
            </h2>
            <p className="mt-6 max-w-[22rem] text-base leading-7 text-foreground/66">
              Short observations on the details that quietly change how a
              place feels.
            </p>
          </header>

          <ol className="mt-12 border-b border-border lg:col-start-5 lg:col-span-8 lg:mt-0">
            {fieldNotes.map((story, index) => {
              const media = getStoryMedia(story);
              const anchorId =
                story.department === "Tables" && index === 0
                  ? "tables"
                  : story.department === "Rituals" && index === 1
                    ? "rituals"
                    : story.slug;

              return (
                <li
                  key={story.id}
                  id={anchorId}
                  className="scroll-mt-28 border-t border-border py-8 sm:py-10"
                >
                  <article className="grid grid-cols-[2.5rem_1fr] gap-x-4 sm:grid-cols-12 sm:gap-x-6">
                    <p className="pt-1 font-mono text-[0.625rem] tracking-[0.12em] text-brand-brass sm:col-span-1">
                      {String(index + 3).padStart(2, "0")}
                    </p>

                    <figure className="col-start-2 sm:col-start-2 sm:col-span-4">
                      <div className="relative aspect-[3/2] overflow-hidden bg-brand-forest/8 sm:aspect-[4/3]">
                        <Image
                          src={media.src}
                          alt={media.alt}
                          fill
                          sizes="(min-width: 1024px) 26vw, (min-width: 640px) 34vw, 85vw"
                          className="object-cover"
                          style={{ objectPosition: media.focalPoint }}
                        />
                      </div>
                      <figcaption className="mt-3 font-mono text-[0.5625rem] tracking-[0.1em] text-muted-foreground uppercase">
                        {media.title}
                      </figcaption>
                    </figure>

                    <div className="col-start-2 mt-6 sm:col-start-7 sm:col-span-6 sm:mt-0">
                      <StoryMeta story={story} />
                      <h3 className="mt-4 text-[clamp(2rem,3.5vw,3.5rem)] leading-[0.96] font-semibold tracking-[-0.035em] text-brand-forest-deep">
                        {story.title}
                      </h3>
                      <p className="mt-4 max-w-[34rem] text-base leading-7 text-foreground/67">
                        {story.deck}
                      </p>
                      <div className="mt-6">
                        <RelatedPlaceLink story={story} />
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <aside aria-labelledby="editors-note-heading" className="bg-brand-paper py-20 sm:py-28 lg:py-32">
        <div className="container-luma grid gap-10 border-y border-border py-10 sm:py-14 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-3">
            <p className="font-mono text-[0.6875rem] tracking-[0.15em] text-brand-brass uppercase">
              Editor’s letter
            </p>
            <p className="mt-3 font-mono text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase">
              Issue No. 01 / July 2026
            </p>
          </div>
          <div className="lg:col-start-5 lg:col-span-5">
            <h2
              id="editors-note-heading"
              className="text-[clamp(2.7rem,4.8vw,5rem)] leading-[0.94] font-semibold tracking-[-0.04em] text-brand-forest-deep"
            >
              We travel to pay better attention.
            </h2>
          </div>
          <div className="lg:col-start-10 lg:col-span-3">
            <p className="text-base leading-7 text-foreground/68">
              This first issue is about arrival: the early walk, the room that
              feels native to its street, the table that asks you to linger.
              The Edit is where we keep those observations.
            </p>
            <Link
              href="/destinations"
              className="group mt-6 inline-flex min-h-11 w-fit items-center gap-3 rounded-sm text-sm font-semibold text-brand-forest-deep underline decoration-brand-brass/70 underline-offset-8 transition-colors duration-200 hover:text-brand-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-paper motion-reduce:transition-none"
            >
              Continue to the atlas
              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-200 ease-luma group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
