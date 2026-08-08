import Link from "next/link";

const bookingSteps = [
  { number: "01", label: "Review", href: "/booking/review" },
  {
    number: "02",
    label: "Guest details",
    href: "/booking/guest-details",
  },
  { number: "03", label: "Payment", href: null },
  { number: "04", label: "Confirm", href: null },
] as const;

type BookingProgressStep = 0 | 1 | 2 | 3 | 4;

interface BookingFlowHeaderProps {
  activeStep: 1 | 2 | 3 | 4;
  completedThrough?: BookingProgressStep;
  title: string;
  description: string;
}

function StepContent({
  step,
  index,
  activeStep,
  completedThrough,
}: {
  step: (typeof bookingSteps)[number];
  index: number;
  activeStep: BookingFlowHeaderProps["activeStep"];
  completedThrough: BookingProgressStep;
}) {
  const stepNumber = index + 1;
  const isActive = stepNumber === activeStep;
  const isComplete = stepNumber <= completedThrough && !isActive;
  const detail = isComplete
    ? "Complete"
    : isActive
      ? "Current"
      : stepNumber < activeStep
        ? "Required"
        : "Later";

  return (
    <>
      <span
        className={`font-mono text-[0.625rem] tracking-[0.12em] uppercase ${
          isActive ? "text-brand-brass" : "text-brand-stone"
        }`}
      >
        {step.number}
      </span>
      <span>
        <span className="block text-sm font-semibold">{step.label}</span>
        <span
          className={`mt-1 block font-mono text-[0.5625rem] tracking-[0.1em] uppercase ${
            isActive ? "text-brand-paper/52" : "text-brand-stone"
          }`}
        >
          {detail}
        </span>
      </span>
    </>
  );
}

export function BookingFlowHeader({
  activeStep,
  completedThrough,
  title,
  description,
}: BookingFlowHeaderProps) {
  const resolvedCompletedThrough =
    completedThrough ?? ((activeStep - 1) as BookingProgressStep);

  return (
    <section className="border-b border-brand-forest-deep/18 bg-brand-linen">
      <div className="container-luma py-12 sm:py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-3">
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-brand-stone uppercase">
              <span className="mr-3 text-brand-brass">Booking</span>
              Step {String(activeStep).padStart(2, "0")}
            </p>
          </div>

          <div className="lg:col-span-6">
            <h1 className="max-w-[12ch] font-display text-[clamp(3rem,6.4vw,6.5rem)] leading-[0.9] font-medium tracking-[-0.055em] text-brand-forest-deep">
              {title}
            </h1>
          </div>

          <div className="lg:col-span-3 lg:pt-1">
            <p className="max-w-[28rem] text-base leading-7 text-foreground/72">
              {description}
            </p>
          </div>
        </div>

        <ol
          aria-label="Booking progress"
          className="mt-10 grid grid-cols-2 border-t border-brand-forest-deep/22 sm:mt-14 sm:grid-cols-4"
        >
          {bookingSteps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === activeStep;
            const isComplete = stepNumber <= resolvedCompletedThrough && !isActive;
            const itemClassName = `grid min-h-20 grid-cols-[auto_1fr] content-center gap-x-3 border-b border-brand-forest-deep/22 px-3 py-4 sm:min-h-24 sm:border-b-0 sm:border-r sm:px-4 sm:last:border-r-0 ${
              index % 2 === 0 ? "border-r" : ""
            } ${isActive ? "bg-brand-forest-deep text-brand-paper" : ""}`;
            const content = (
              <StepContent
                step={step}
                index={index}
                activeStep={activeStep}
                completedThrough={resolvedCompletedThrough}
              />
            );

            return (
              <li
                key={step.number}
                aria-current={isActive ? "step" : undefined}
                className={step.href && isComplete ? "contents" : itemClassName}
              >
                {step.href && isComplete ? (
                  <Link
                    href={step.href}
                    className={`${itemClassName} transition-colors duration-200 hover:bg-brand-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring`}
                  >
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
