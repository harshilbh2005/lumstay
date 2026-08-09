import Link from "next/link";
import {
  ArrowUpRight,
  GlobeHemisphereEast,
} from "@phosphor-icons/react/ssr";

import { siteConfig } from "@/config/site";

const footerGroups = [
  { label: "Company", items: siteConfig.companyNavigation },
  { label: "Support", items: siteConfig.supportNavigation },
  { label: "Your Luma", items: siteConfig.accountNavigation },
] as const;

const footerLinkClassName =
  "group/link -mx-2 flex min-h-11 w-fit items-center rounded-sm px-2 text-sm text-brand-paper/68 transition-colors duration-200 hover:text-brand-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest-deep motion-reduce:transition-none";

export function SiteFooter() {
  return (
    <footer className="bg-brand-forest-deep text-brand-paper">
      <div className="container-luma">
        <nav
          aria-label="Featured destinations"
          className="border-b border-white/14 pt-12 sm:pt-16"
        >
          <div className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.15em] text-white/52 uppercase">
            <span className="h-px w-7 bg-brand-brass" aria-hidden="true" />
            Around the map
          </div>

          <ul className="mt-7 grid border-t border-white/14 sm:grid-cols-2 lg:grid-cols-5">
            {siteConfig.destinationNavigation.map((destination) => (
              <li
                key={destination.href}
                className="border-b border-white/14 sm:odd:border-r lg:border-r lg:last:border-r-0"
              >
                <Link
                  href={destination.href}
                  prefetch={false}
                  className="group/destination flex min-h-16 items-center justify-between gap-4 px-4 text-base font-medium transition-colors duration-200 hover:bg-white/[0.045] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-brass motion-reduce:transition-none sm:min-h-18 lg:px-5"
                >
                  {destination.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    size={15}
                    className="shrink-0 text-brand-brass transition-transform duration-200 ease-luma group-hover/destination:translate-x-0.5 group-hover/destination:-translate-y-0.5 motion-reduce:transition-none"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-16 py-16 lg:grid-cols-12 lg:gap-x-8 lg:py-20">
          <div className="lg:col-span-5">
            <Link
              href="/"
              aria-label="LumaStay home"
              className="brand-wordmark-inverse inline-flex rounded-sm font-sans text-[clamp(3.25rem,6vw,6.5rem)] leading-[0.82] font-extrabold tracking-[-0.075em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-4 focus-visible:ring-offset-brand-forest-deep"
            >
              LumaStay
            </Link>
            <p className="mt-8 max-w-[24rem] font-display text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.025em] text-brand-paper sm:text-[2rem]">
              Considered stays, beautifully found.
            </p>
            <p className="mt-5 max-w-[29rem] text-base leading-7 text-white/60">
              An independent hotel edit for travelers who would rather choose
              well than scroll forever.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:col-start-7 lg:col-span-6"
          >
            {footerGroups.map((group) => (
              <div key={group.label}>
                <h2 className="font-mono text-[0.6875rem] tracking-[0.15em] text-brand-brass uppercase">
                  {group.label}
                </h2>
                <ul className="mt-5 space-y-1">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        prefetch={
                          item.href === "/saved" || item.href === "/trips"
                            ? null
                            : false
                        }
                        className={footerLinkClassName}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="grid gap-7 border-t border-white/14 py-7 text-white/52 sm:grid-cols-[auto_1fr] sm:items-center lg:grid-cols-[auto_1fr_auto]">
          <p className="font-mono text-[0.625rem] tracking-[0.12em] uppercase">
            © 2026 LumaStay
          </p>

          <nav aria-label="Legal" className="sm:justify-self-end lg:justify-self-center">
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {siteConfig.legalNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="flex min-h-11 items-center rounded-sm font-mono text-[0.625rem] tracking-[0.08em] uppercase transition-colors duration-200 hover:text-brand-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest-deep motion-reduce:transition-none"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p
            aria-label={`Market: ${siteConfig.market.country}; currency: ${siteConfig.market.currency}`}
            className="flex min-h-11 items-center gap-2 font-mono text-[0.6875rem] tracking-[0.1em] uppercase sm:col-span-2 sm:justify-self-end lg:col-span-1"
          >
            <GlobeHemisphereEast
              aria-hidden="true"
              size={17}
              className="text-brand-brass"
            />
            {siteConfig.market.country} / {siteConfig.market.currency}
          </p>
        </div>
      </div>
    </footer>
  );
}
