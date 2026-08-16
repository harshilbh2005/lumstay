import { ArrowRight } from "@phosphor-icons/react/ssr";
import Link from "next/link";

import { SupportNoteComposer } from "@/features/support/components/support-note-composer";

const pageIndex = [
  ["Booking", "#booking"],
  ["Cancellations", "#cancellations"],
  ["Payments", "#payments"],
  ["Prepare a note", "#contact"],
] as const;

const supportChapters = [
  {
    id: "booking",
    folio: "01",
    title: "Booking",
    summary:
      "How the mock discovery and checkout path is meant to behave before a prototype itinerary is created.",
    questions: [
      {
        question: "Where should I begin a new stay?",
        answer: (
          <p>
            Start with the <Link href="/search">stay collection</Link>, open
            Casa Serein, choose dates and guests, then select one of its
            available room fixtures. The review, guest-details, mock-payment,
            and confirmation steps all depend on that in-memory draft.
          </p>
        ),
      },
      {
        question: "Why did my selected room or guest details disappear?",
        answer: (
          <p>
            The booking draft is intentionally held in memory only. Reloading
            a booking page, closing the tab, or starting from a URL without the
            same in-session draft can clear the selected room, guest details,
            payment result, and confirmation record.
          </p>
        ),
      },
      {
        question: "Does choosing a room hold inventory?",
        answer: (
          <p>
            No. Room availability, dates, nightly prices, taxes, and fees are
            deterministic interface fixtures. Choosing a room changes the
            prototype UI but does not contact a property, reserve inventory, or
            create a booking.
          </p>
        ),
      },
    ],
  },
  {
    id: "cancellations",
    folio: "02",
    title: "Cancellations",
    summary:
      "Where cancellation terms appear, and what the read-only Trips examples can—and cannot—do.",
    questions: [
      {
        question: "Where can I read the cancellation terms?",
        answer: (
          <p>
            Each Casa Serein room fixture shows a cancellation category and
            detailed terms. After selecting a room, the booking review exposes
            the full mock schedule and accommodation-only charge examples
            beside the transparent price ledger.
          </p>
        ),
      },
      {
        question: "Can I cancel an upcoming trip here?",
        answer: (
          <p>
            No. The <Link href="/trips">Trips ledger</Link> contains fixed,
            read-only examples and has no live reservation-management action.
            Its cancelled stay is a deterministic record showing how a refund
            outcome could be presented, not a cancellation service.
          </p>
        ),
      },
      {
        question: "Are the displayed fees or deadlines binding?",
        answer: (
          <p>
            No. The percentages, dates, retained fees, and refund amounts are
            prototype fixtures. They do not represent a property contract,
            current hotel policy, live deadline, or applicable law.
          </p>
        ),
      },
    ],
  },
  {
    id: "payments",
    folio: "03",
    title: "Mock payments",
    summary:
      "What the documented test-card states demonstrate without contacting a payment provider.",
    questions: [
      {
        question: "Will the payment step charge my card?",
        answer: (
          <p>
            No. The form accepts only the documented 4242 test number and
            simulates approved, declined, and interrupted outcomes in the
            browser. It does not authorize, tokenize, store, or charge a real
            payment method.
          </p>
        ),
      },
      {
        question: "What payment details are kept?",
        answer: (
          <p>
            Full card and security values are cleared as processing begins.
            Only a page-local masked summary may remain for the prepared mock
            result, and confirmation stores only the last four digits, name,
            and expiry in the current in-memory session.
          </p>
        ),
      },
      {
        question: "Does a LUMA-MOCK reference prove a reservation?",
        answer: (
          <p>
            No. It is a deterministic interface identifier for the local
            itinerary snapshot. It is not issued by a hotel, payment provider,
            account system, or booking service.
          </p>
        ),
      },
    ],
  },
  {
    id: "trips",
    folio: "04",
    title: "Trips & saved stays",
    summary:
      "How browser-local preferences differ from the fixed history fixtures used for interface review.",
    questions: [
      {
        question: "Why does Saved survive a reload but booking details do not?",
        answer: (
          <p>
            Saved stays persist only stable property IDs in this browser. The
            booking draft deliberately remains memory-only because it contains
            a larger, session-specific flow. Neither collection is synced to an
            account or another device.
          </p>
        ),
      },
      {
        question: "Why is my session confirmation missing from Trips?",
        answer: (
          <p>
            Trips is a fixed set of six review fixtures. The session-only
            confirmation flow does not write into that ledger, browser storage,
            an account, or a backend.
          </p>
        ),
      },
    ],
  },
] as const;

export function SupportPage() {
  return (
    <div className="overflow-clip bg-brand-paper">
      <section
        aria-labelledby="support-heading"
        className="container-luma pt-14 pb-18 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32"
      >
        <div className="flex items-center justify-between gap-5 border-y border-border py-4 font-mono text-[0.625rem] tracking-[0.14em] text-muted-foreground uppercase">
          <p>Support / Frontend prototype</p>
          <p className="text-right">Clear scope, useful next steps</p>
        </div>

        <div className="grid gap-10 pt-10 sm:pt-14 lg:grid-cols-12 lg:items-end lg:gap-x-8 lg:pt-18">
          <div className="lg:col-span-8">
            <p className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.16em] text-brand-brass-dark uppercase">
              <span className="h-px w-7 bg-brand-brass" aria-hidden="true" />
              Help, without the maze
            </p>
            <h1
              id="support-heading"
              className="mt-6 max-w-[10ch] text-[clamp(3.9rem,8.6vw,8.5rem)] leading-[0.86] font-semibold tracking-[-0.06em] text-brand-forest-deep"
            >
              Clear answers before the next step.
            </h1>
          </div>

          <div className="max-w-[31rem] lg:col-start-10 lg:col-span-3 lg:pb-2">
            <p className="text-lg leading-8 text-foreground/72">
              Find the intended behavior for bookings, cancellations,
              payments, trips, and saved stays—then prepare a note locally if
              something still feels unclear.
            </p>
            <p className="mt-6 border-l border-brand-brass/70 pl-4 text-sm leading-6 text-muted-foreground">
              LumaStay has no live support operation, emergency channel, or
              connected inbox in this frontend prototype.
            </p>
          </div>
        </div>

        <nav aria-label="Support topics" className="mt-12 sm:mt-16 lg:mt-20">
          <ul className="grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
            {pageIndex.map(([label, href], index) => (
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
        aria-labelledby="support-scope-heading"
        className="bg-brand-forest-deep py-20 text-brand-paper sm:py-28 lg:py-32"
      >
        <div className="container-luma grid gap-12 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5">
            <p className="font-mono text-[0.6875rem] tracking-[0.15em] text-brand-brass uppercase">
              Start with the scope
            </p>
            <h2
              id="support-scope-heading"
              className="mt-6 max-w-[10ch] text-[clamp(3.2rem,6vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.05em]"
            >
              What this page can resolve.
            </h2>
          </div>

          <dl className="border-b border-white/16 lg:col-start-7 lg:col-span-6">
            {[
              [
                "Explain",
                "The intended behavior of the deterministic booking, payment, saved, and Trips fixtures.",
              ],
              [
                "Redirect",
                "Point to an implemented route where the relevant mock detail can be reviewed again.",
              ],
              [
                "Prepare",
                "Validate and format a note locally so the issue is easier to describe outside this prototype.",
              ],
              [
                "Cannot do",
                "Contact a property, change a reservation, move money, recover an account, or respond to an urgent situation.",
              ],
            ].map(([term, detail], index) => (
              <div
                key={term}
                className="grid gap-4 border-t border-white/16 py-7 sm:grid-cols-[3rem_8rem_1fr] sm:gap-6 sm:py-8"
              >
                <dt className="contents">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-xl leading-tight font-bold tracking-[-0.025em]">
                    {term}
                  </span>
                </dt>
                <dd className="max-w-[34rem] text-base leading-7 text-brand-paper/64">
                  {detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        aria-labelledby="answers-heading"
        className="bg-brand-linen py-20 sm:py-28 lg:py-36"
      >
        <div className="container-luma">
          <header className="grid gap-8 border-t border-brand-forest-deep/20 pt-6 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-3">
              <p className="font-mono text-[0.6875rem] tracking-[0.15em] text-brand-brass-dark uppercase">
                Self-service notes
              </p>
              <p className="mt-3 font-mono text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase">
                Deterministic answers / No live data
              </p>
            </div>
            <h2
              id="answers-heading"
              className="max-w-[10ch] text-[clamp(3.1rem,6vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-brand-forest-deep lg:col-start-5 lg:col-span-6"
            >
              Find the nearest answer first.
            </h2>
          </header>

          <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-24 lg:mt-28 lg:space-y-32">
            {supportChapters.map((chapter) => (
              <article
                key={chapter.id}
                id={chapter.id}
                aria-labelledby={`${chapter.id}-heading`}
                className="scroll-mt-28 grid gap-9 lg:grid-cols-12 lg:gap-x-8"
              >
                <header className="lg:col-span-4">
                  <div className="flex items-center justify-between border-t border-brand-forest-deep/22 pt-4 font-mono text-[0.625rem] tracking-[0.13em] text-muted-foreground uppercase">
                    <span>{chapter.folio} / Topic</span>
                    <span>{String(chapter.questions.length).padStart(2, "0")} notes</span>
                  </div>
                  <h3
                    id={`${chapter.id}-heading`}
                    className="mt-7 font-display text-[clamp(2.8rem,4.8vw,5rem)] leading-[0.92] tracking-[-0.045em] text-brand-forest-deep"
                  >
                    {chapter.title}
                  </h3>
                  <p className="mt-5 max-w-[29rem] text-base leading-7 text-foreground/68">
                    {chapter.summary}
                  </p>
                </header>

                <div className="border-b border-brand-forest-deep/22 lg:col-start-6 lg:col-span-7">
                  {chapter.questions.map((item) => (
                    <details
                      key={item.question}
                      className="group border-t border-brand-forest-deep/22"
                    >
                      <summary className="flex min-h-18 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg leading-7 font-semibold tracking-[-0.015em] text-brand-forest-deep transition-colors duration-200 hover:text-brand-brass-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
                        <span>{item.question}</span>
                        <span
                          aria-hidden="true"
                          className="font-mono text-xl font-normal text-brand-brass-dark group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <div className="max-w-[42rem] pb-7 text-base leading-7 text-foreground/70 [&_a]:font-semibold [&_a]:text-brand-forest-deep [&_a]:underline [&_a]:decoration-brand-brass/65 [&_a]:underline-offset-4 [&_a]:transition-colors [&_a]:duration-200 [&_a]:hover:text-brand-brass-dark [&_a]:focus-visible:outline-none [&_a]:focus-visible:ring-2 [&_a]:focus-visible:ring-ring">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="scroll-mt-28 bg-brand-paper py-20 sm:py-28 lg:py-36"
      >
        <div className="container-luma grid gap-12 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4">
            <p className="font-mono text-[0.6875rem] tracking-[0.15em] text-brand-brass-dark uppercase">
              Contact, honestly scoped
            </p>
            <h2
              id="contact-heading"
              className="mt-6 max-w-[9ch] text-[clamp(3.2rem,6vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-brand-forest-deep"
            >
              Prepare the useful details.
            </h2>
            <p className="mt-7 max-w-[29rem] text-base leading-7 text-foreground/70">
              If the notes above do not explain the issue, create a clean local
              summary. The composer makes no delivery or response promise.
            </p>

            <ol className="mt-10 border-b border-brand-forest-deep/18">
              {[
                "Name the route or step.",
                "Add only the mock reference, if one exists.",
                "Describe what you expected and what appeared.",
                "Leave out payment and sensitive identity details.",
              ].map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-brand-forest-deep/18 py-5 text-sm leading-6 text-foreground/68"
                >
                  <span className="font-mono text-[0.625rem] tracking-[0.12em] text-brand-brass-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>

            <Link
              href="/trips"
              className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-sm px-2 text-sm font-semibold text-brand-forest-deep underline decoration-brand-brass/65 underline-offset-4 transition-colors duration-200 hover:text-brand-brass-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 motion-reduce:transition-none"
            >
              Review mock trip references
              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-200 ease-luma group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </Link>
          </div>

          <div className="lg:col-start-6 lg:col-span-7">
            <SupportNoteComposer />
          </div>
        </div>
      </section>
    </div>
  );
}
