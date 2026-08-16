import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/ssr";

import { getMediaById } from "@/data/mock";

const curationPasses = [
  {
    title: "Place",
    question: "Could this stay belong anywhere else?",
    description:
      "We look for a meaningful relationship between the property and its setting—through materials, scale, landscape, local craft, or the rhythm of the neighborhood.",
  },
  {
    title: "Character",
    question: "Is there a point of view beyond polish?",
    description:
      "A memorable stay can be spare, storied, eccentric, or serene. What matters is that the choices feel coherent rather than assembled from a familiar luxury checklist.",
  },
  {
    title: "Room truth",
    question: "Can the room be understood before it is chosen?",
    description:
      "Light, layout, bed setup, size, outlook, inclusions, and meaningful limitations should be close to the decision—not buried beneath mood photography.",
  },
  {
    title: "Practical clarity",
    question: "Does the beautiful choice remain a clear one?",
    description:
      "Price composition, cancellation terms, arrival context, and useful house details need the same editorial attention as the architecture and atmosphere.",
  },
] as const;

const evidenceStudies = [
  {
    mediaId: "stillwater-cabin-exterior",
    folio: "01",
    label: "Setting",
    note: "Architecture that takes its cue from climate and landscape.",
    sizes: "(min-width: 1024px) 38vw, (min-width: 640px) 58vw, 92vw",
    className: "lg:col-span-5",
    imageClassName: "aspect-[4/5]",
  },
  {
    mediaId: "kiyo-machiya-room",
    folio: "02",
    label: "Room",
    note: "Material, light, scale, and outlook made legible together.",
    sizes: "(min-width: 1024px) 30vw, (min-width: 640px) 42vw, 92vw",
    className: "lg:col-start-7 lg:col-span-4 lg:mt-28",
    imageClassName: "aspect-[3/4]",
  },
  {
    mediaId: "nila-haveli-courtyard-dining",
    folio: "03",
    label: "Ritual",
    note: "The smaller moments that give a stay its own tempo.",
    sizes: "(min-width: 1024px) 46vw, 92vw",
    className: "lg:col-start-5 lg:col-span-6 lg:-mt-10",
    imageClassName: "aspect-[3/2]",
  },
] as const;

const boundaries = [
  {
    title: "Not a universal score",
    description:
      "The edit is a point of view, not a star system, certification, or promise that one kind of stay will suit every traveler.",
  },
  {
    title: "Not an inspection claim",
    description:
      "LumaStay does not currently operate a live review network or claim that the properties shown here have been visited, audited, or verified for booking.",
  },
  {
    title: "Not live inventory",
    description:
      "This product is a frontend prototype. Its stays, availability, prices, policies, reviews, and booking outcomes are deterministic interface fixtures.",
  },
] as const;

function getCurationMedia(mediaId: string) {
  const media = getMediaById(mediaId);

  if (!media) {
    throw new Error(`Missing curation media: ${mediaId}`);
  }

  return media;
}

export function CurationPage() {
  const closeReadingMedia = getCurationMedia("casa-serein-lemon-terrace");

  return (
    <div className="overflow-clip bg-brand-paper">
      <section
        aria-labelledby="curation-heading"
        className="container-luma pt-14 pb-18 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32"
      >
        <div className="flex items-center justify-between gap-5 border-y border-border py-4 font-mono text-[0.625rem] tracking-[0.14em] text-muted-foreground uppercase">
          <p>About / The Luma standard</p>
          <p className="text-right">A point of view, made clear</p>
        </div>

        <div className="grid gap-9 pt-10 sm:pt-14 lg:grid-cols-12 lg:items-end lg:gap-x-8 lg:pt-18">
          <div className="lg:col-span-8">
            <p className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.16em] text-brand-brass-dark uppercase">
              <span className="h-px w-7 bg-brand-brass" aria-hidden="true" />
              How the edit works
            </p>
            <h1
              id="curation-heading"
              className="mt-6 max-w-[11ch] text-[clamp(3.9rem,8.6vw,8.5rem)] leading-[0.86] font-semibold tracking-[-0.06em] text-brand-forest-deep"
            >
              A beautiful stay needs better reasons.
            </h1>
          </div>

          <div className="max-w-[31rem] lg:col-start-10 lg:col-span-3 lg:pb-2">
            <p className="text-lg leading-8 text-foreground/72">
              LumaStay is built around a smaller, opinionated collection—and
              the belief that taste becomes useful only when its reasoning is
              visible.
            </p>
            <p className="mt-6 font-mono text-[0.6875rem] leading-5 tracking-[0.12em] text-muted-foreground uppercase">
              Place / Character / Room truth / Practical clarity
            </p>
          </div>
        </div>

        <nav aria-label="On this page" className="mt-12 sm:mt-16 lg:mt-20">
          <ul className="grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["The approach", "#approach"],
              ["Four passes", "#four-passes"],
              ["Evidence", "#evidence"],
              ["Boundaries", "#boundaries"],
            ].map(([label, href], index) => (
              <li key={href} className="border-r border-b border-border">
                <a
                  href={href}
                  className="group flex min-h-16 items-center justify-between gap-4 px-4 text-sm font-semibold text-foreground/78 transition-colors duration-200 hover:bg-brand-linen hover:text-brand-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring motion-reduce:transition-none sm:min-h-18 sm:px-5"
                >
                  <span>{label}</span>
                  <span className="font-mono text-[0.625rem] tracking-[0.1em] text-brand-brass-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section
        id="approach"
        aria-labelledby="approach-heading"
        className="scroll-mt-28 bg-brand-linen py-20 sm:py-28 lg:py-36"
      >
        <div className="container-luma grid gap-12 lg:grid-cols-12 lg:gap-x-8">
          <figure className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden bg-brand-forest/8">
              <Image
                src={closeReadingMedia.src}
                alt={closeReadingMedia.alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: closeReadingMedia.focalPoint }}
              />
            </div>
            <figcaption className="mt-4 flex items-start justify-between gap-5 font-mono text-[0.625rem] leading-5 tracking-[0.1em] text-muted-foreground uppercase">
              <span>{closeReadingMedia.title}</span>
              <span className="text-right">
                A study in shade, material, and pace
              </span>
            </figcaption>
          </figure>

          <div className="lg:col-start-8 lg:col-span-5 lg:flex lg:flex-col">
            <div className="flex items-center justify-between border-b border-brand-forest-deep/18 pb-4 font-mono text-[0.625rem] tracking-[0.14em] text-muted-foreground uppercase">
              <span>Close reading</span>
              <span>01 / Approach</span>
            </div>

            <div className="pt-9 sm:pt-12 lg:pt-16">
              <h2
                id="approach-heading"
                className="max-w-[11ch] text-[clamp(3rem,5.6vw,6rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-brand-forest-deep"
              >
                We begin with what the image cannot prove.
              </h2>
              <p className="mt-7 max-w-[35rem] text-base leading-7 text-foreground/70 sm:text-lg sm:leading-8">
                A photograph can establish desire. Curation has to go further:
                explaining the setting, the room, the rate, and the practical
                details that determine whether a stay will feel right once the
                frame is gone.
              </p>
            </div>

            <dl className="mt-12 border-b border-brand-forest-deep/18 lg:mt-auto">
              {[
                ["Editorial aim", "Make the reason to choose visible."],
                ["Collection aim", "Keep comparison calm and finite."],
                ["Guest aim", "Replace guesswork with useful context."],
              ].map(([term, detail]) => (
                <div
                  key={term}
                  className="grid gap-2 border-t border-brand-forest-deep/18 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
                >
                  <dt className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass-dark uppercase">
                    {term}
                  </dt>
                  <dd className="text-base leading-7 text-foreground/72">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section
        id="four-passes"
        aria-labelledby="passes-heading"
        className="scroll-mt-28 bg-brand-forest-deep py-20 text-brand-paper sm:py-28 lg:py-36"
      >
        <div className="container-luma">
          <header className="grid gap-8 border-t border-white/16 pt-6 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-3">
              <p className="font-mono text-[0.6875rem] tracking-[0.15em] text-brand-brass uppercase">
                The editorial standard
              </p>
              <p className="mt-3 font-mono text-[0.625rem] tracking-[0.12em] text-white/48 uppercase">
                Four passes / One clear edit
              </p>
            </div>
            <div className="lg:col-start-5 lg:col-span-5">
              <h2
                id="passes-heading"
                className="max-w-[11ch] text-[clamp(3.1rem,6vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.05em]"
              >
                The questions behind every choice.
              </h2>
            </div>
            <p className="max-w-[29rem] text-base leading-7 text-white/64 lg:col-start-10 lg:col-span-3 lg:self-end">
              These are the standards the LumaStay experience is designed to
              make legible. They are an editorial framework, not a claim of
              live operational review.
            </p>
          </header>

          <ol className="mt-14 border-b border-white/16 sm:mt-18 lg:mt-24">
            {curationPasses.map((pass, index) => (
              <li
                key={pass.title}
                className="grid gap-5 border-t border-white/16 py-8 sm:grid-cols-[3rem_minmax(0,0.75fr)_minmax(0,1fr)_minmax(0,1.25fr)] sm:gap-7 sm:py-10 lg:gap-8 lg:py-12"
              >
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-brand-brass">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-sans text-2xl leading-tight font-bold tracking-[-0.035em] text-brand-paper sm:text-[1.7rem]">
                  {pass.title}
                </h3>
                <p className="max-w-[20rem] text-lg leading-7 font-medium text-white/88">
                  {pass.question}
                </p>
                <p className="max-w-[37rem] text-base leading-7 text-white/58">
                  {pass.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="evidence"
        aria-labelledby="evidence-heading"
        className="scroll-mt-28 bg-brand-paper py-20 sm:py-28 lg:py-36"
      >
        <div className="container-luma">
          <header className="grid gap-7 border-t border-border pt-6 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-3">
              <p className="font-mono text-[0.6875rem] tracking-[0.15em] text-brand-brass-dark uppercase">
                Evidence over ornament
              </p>
              <p className="mt-3 font-mono text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase">
                Setting / Room / Ritual
              </p>
            </div>
            <h2
              id="evidence-heading"
              className="max-w-[12ch] text-[clamp(3rem,5.8vw,6.25rem)] leading-[0.91] font-semibold tracking-[-0.05em] text-brand-forest-deep lg:col-start-5 lg:col-span-6"
            >
              No single formula makes a place worth staying.
            </h2>
            <p className="max-w-[29rem] text-base leading-7 text-foreground/68 lg:col-start-10 lg:col-span-3 lg:self-end">
              We use photography to hold atmosphere, then pair it with the
              context a guest needs to read what is distinctive—and what may
              not suit them.
            </p>
          </header>

          <ol className="mt-16 grid gap-x-8 gap-y-16 sm:mt-20 lg:grid-cols-12 lg:gap-y-24">
            {evidenceStudies.map((study) => {
              const media = getCurationMedia(study.mediaId);

              return (
                <li key={study.mediaId} className={study.className}>
                  <figure>
                    <div
                      className={`relative overflow-hidden bg-brand-linen ${study.imageClassName}`}
                    >
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes={study.sizes}
                        className="object-cover"
                        style={{ objectPosition: media.focalPoint }}
                      />
                    </div>
                    <figcaption className="mt-4 border-t border-border pt-4">
                      <div className="flex items-center justify-between gap-4 font-mono text-[0.625rem] tracking-[0.13em] text-muted-foreground uppercase">
                        <span className="text-brand-brass-dark">{study.folio}</span>
                        <span>{study.label}</span>
                      </div>
                      <p className="mt-3 max-w-[33rem] text-base leading-7 text-foreground/72">
                        {study.note}
                      </p>
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section
        id="boundaries"
        aria-labelledby="boundaries-heading"
        className="scroll-mt-28 bg-brand-linen py-20 sm:py-28 lg:py-32"
      >
        <div className="container-luma grid gap-12 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4">
            <p className="font-mono text-[0.6875rem] tracking-[0.15em] text-brand-brass-dark uppercase">
              Read the footnotes
            </p>
            <h2
              id="boundaries-heading"
              className="mt-5 max-w-[10ch] text-[clamp(3rem,5.4vw,5.7rem)] leading-[0.92] font-semibold tracking-[-0.05em] text-brand-forest-deep"
            >
              What curation does not mean.
            </h2>
          </div>

          <div className="lg:col-start-6 lg:col-span-7">
            <dl className="border-b border-brand-forest-deep/18">
              {boundaries.map((boundary, index) => (
                <div
                  key={boundary.title}
                  className="grid gap-5 border-t border-brand-forest-deep/18 py-7 sm:grid-cols-[3rem_minmax(0,0.8fr)_minmax(0,1.4fr)] sm:gap-7 sm:py-9"
                >
                  <dt className="contents">
                    <span className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass-dark">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-sans text-xl leading-tight font-bold tracking-[-0.025em] text-brand-forest-deep">
                      {boundary.title}
                    </span>
                  </dt>
                  <dd className="text-base leading-7 text-foreground/68">
                    {boundary.description}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-7 max-w-[46rem] text-sm leading-6 text-muted-foreground">
              The current collection uses fictional properties and locally
              stored generated or licensed stock imagery to test the product
              experience. It should be read as interface content, not as a
              representation of bookable hotel inventory.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="continue-heading"
        className="bg-brand-paper py-20 sm:py-28 lg:py-32"
      >
        <div className="container-luma grid gap-10 border-y border-border py-10 sm:py-14 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <div className="lg:col-span-3">
            <p className="font-mono text-[0.6875rem] tracking-[0.15em] text-brand-brass-dark uppercase">
              Continue from here
            </p>
            <p className="mt-3 font-mono text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase">
              The collection / The journal
            </p>
          </div>
          <h2
            id="continue-heading"
            className="max-w-[10ch] text-[clamp(3rem,5.6vw,6rem)] leading-[0.91] font-semibold tracking-[-0.05em] text-brand-forest-deep lg:col-start-5 lg:col-span-5"
          >
            See the point of view in practice.
          </h2>
          <div className="flex flex-col items-start gap-3 lg:col-start-10 lg:col-span-3">
            <Link
              href="/search"
              className="group flex min-h-12 w-full items-center justify-between gap-4 rounded-full bg-brand-forest-deep px-6 text-sm font-semibold text-brand-paper transition-[background-color,transform] duration-200 hover:bg-brand-forest active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-paper motion-reduce:transition-none"
            >
              Browse the stay edit
              <ArrowRight
                aria-hidden="true"
                size={17}
                className="transition-transform duration-200 ease-luma group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </Link>
            <Link
              href="/edit"
              className="group flex min-h-12 w-full items-center justify-between gap-4 rounded-full border border-brand-forest-deep/34 px-6 text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:border-brand-forest-deep hover:bg-brand-linen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-paper motion-reduce:transition-none"
            >
              Read The Luma Edit
              <ArrowUpRight
                aria-hidden="true"
                size={17}
                className="transition-transform duration-200 ease-luma group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
