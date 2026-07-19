import Link from "next/link";
import { ArrowDownRight } from "@phosphor-icons/react/ssr";

import { SiteHeader } from "@/components/layout/site-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const swatches = [
  { name: "Deep forest", token: "--luma-forest-950", hex: "#102c2d" },
  { name: "Luma forest", token: "--luma-forest-900", hex: "#173a3b" },
  { name: "Warm linen", token: "--luma-linen-100", hex: "#f4f0e9" },
  { name: "Paper", token: "--luma-paper", hex: "#fcfbf8" },
  { name: "Antique brass", token: "--luma-brass-500", hex: "#b88a4a" },
  { name: "Ink", token: "--luma-ink-950", hex: "#18201f" },
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <section className="container-luma grid min-h-[68vh] items-end gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-8">
          <p className="text-eyebrow mb-6 text-brand-brass">Product foundation</p>
          <h1 className="max-w-4xl text-5xl leading-[0.96] tracking-[-0.045em] text-balance sm:text-7xl lg:text-8xl">
            Considered stays, beautifully found.
          </h1>
        </div>

        <div className="space-y-7 md:col-span-4 md:pb-2">
          <p className="max-w-md text-lg leading-8 text-muted-foreground">
            The LumaStay scaffold, design tokens, accessibility baseline, and product
            architecture are ready for the first experience build.
          </p>
          <Link
            href="#tokens"
            className={cn(buttonVariants({ size: "lg" }), "w-fit")}
          >
            View the foundation
            <ArrowDownRight aria-hidden="true" weight="regular" />
          </Link>
        </div>
      </section>

      <section id="tokens" className="bg-secondary py-20 md:py-28">
        <div className="container-luma">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-eyebrow mb-4 text-brand-brass">Design tokens</p>
              <h2 className="text-4xl tracking-[-0.035em] sm:text-5xl">
                Quiet colour. Clear purpose.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-muted-foreground">
              Brand values remain separate from semantic UI roles, allowing every future
              page and state to inherit a coherent, accessible system.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-panel border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {swatches.map((swatch) => (
              <article key={swatch.token} className="bg-card p-5">
                <div
                  className="mb-8 aspect-[16/8] rounded-image border border-black/5"
                  style={{ backgroundColor: `var(${swatch.token})` }}
                />
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-sans text-sm font-semibold">{swatch.name}</h3>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {swatch.token}
                    </p>
                  </div>
                  <span className="font-mono text-xs uppercase text-muted-foreground">
                    {swatch.hex}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
