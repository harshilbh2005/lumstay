import type { ReactNode } from "react";

export function PropertyRouteState({
  eyebrow,
  title,
  description,
  statusLabel,
  statusTitle,
  statusDescription,
  actions,
  railLabel,
  railItems,
  role,
  tone = "brass",
}: {
  eyebrow: string;
  title: string;
  description: string;
  statusLabel: string;
  statusTitle: string;
  statusDescription: string;
  actions: ReactNode;
  railLabel: string;
  railItems: readonly string[];
  role?: "alert" | "status";
  tone?: "brass" | "error";
}) {
  return (
    <main className="min-h-[calc(100dvh-5.5rem)] bg-brand-paper py-12 sm:py-16 lg:py-20">
      <div className="container-luma">
        <header className="grid gap-8 border-t border-brand-forest-deep/20 pt-6 lg:grid-cols-12 lg:gap-x-8 lg:pt-8">
          <p
            className={`font-mono text-[0.6875rem] tracking-[0.15em] uppercase lg:col-span-3 ${
              tone === "error" ? "text-destructive" : "text-brand-brass"
            }`}
          >
            {eyebrow}
          </p>

          <div className="lg:col-span-6">
            <h1 className="max-w-[11ch] font-sans text-[clamp(3rem,6vw,6.6rem)] leading-[0.9] font-bold tracking-[-0.065em] text-brand-forest-deep">
              {title}
            </h1>
          </div>

          <p className="max-w-[30rem] text-base leading-7 text-muted-foreground lg:col-span-3 lg:pt-1">
            {description}
          </p>
        </header>

        <section
          role={role}
          className="mt-12 grid min-h-[26rem] border-y border-brand-forest-deep/18 bg-brand-linen lg:mt-16 lg:grid-cols-12 lg:min-h-[30rem]"
        >
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-8 lg:p-14">
            <p
              className={`font-mono text-[0.6875rem] tracking-[0.15em] uppercase ${
                tone === "error" ? "text-destructive" : "text-brand-brass"
              }`}
            >
              {statusLabel}
            </p>
            <h2 className="mt-5 max-w-[14ch] font-display text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.94] font-medium tracking-[-0.05em] text-brand-forest-deep">
              {statusTitle}
            </h2>
            <p className="mt-6 max-w-[38rem] text-base leading-7 text-foreground/72">
              {statusDescription}
            </p>
            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              {actions}
            </div>
          </div>

          <aside className="border-t border-brand-paper/14 bg-brand-forest-deep p-6 text-brand-paper sm:p-8 lg:col-span-4 lg:border-t-0 lg:border-l lg:p-10">
            <p className="font-mono text-[0.625rem] tracking-[0.14em] text-brand-brass uppercase">
              {railLabel}
            </p>
            <ol className="mt-8 divide-y divide-brand-paper/14 border-y border-brand-paper/14">
              {railItems.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[2rem_1fr] gap-3 py-4 text-sm leading-6 text-brand-paper/78"
                >
                  <span className="font-mono text-[0.625rem] tracking-[0.1em] text-brand-brass">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </aside>
        </section>
      </div>
    </main>
  );
}
