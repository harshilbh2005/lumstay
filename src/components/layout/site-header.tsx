import Link from "next/link";
import { Heart } from "@phosphor-icons/react/ssr";

import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const navLinkClassName = cn(
  "relative flex h-11 items-center text-[0.8125rem] font-semibold tracking-[0.018em] text-foreground/82",
  "transition-colors duration-200 ease-luma hover:text-foreground",
  "focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
  "after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-brand-brass",
  "after:transition-transform after:duration-200 after:ease-luma hover:after:scale-x-100 focus-visible:after:scale-x-100",
);

export function SiteHeader() {
  return (
    <header className="luma-header-surface sticky top-0 z-30 border-b border-border/72 after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-gradient-to-r after:from-transparent after:via-brand-brass/38 after:to-transparent">
      <div className="container-luma grid h-[5.5rem] grid-cols-[auto_1fr_auto] items-center gap-6 lg:gap-10">
        <Link
          href="/"
          aria-label="LumaStay home"
          className="group flex h-11 items-center gap-4 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <span className="brand-wordmark font-sans text-[1.7rem] leading-none font-extrabold tracking-[-0.065em]">
            LumaStay
          </span>
          <span className="hidden h-5 w-px bg-border xl:block" aria-hidden="true" />
          <span className="hidden text-[0.625rem] leading-tight font-semibold tracking-[0.12em] text-muted-foreground uppercase xl:block">
            The hotel edit
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 justify-self-center lg:flex xl:gap-10"
        >
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClassName}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-1 sm:gap-2">
          <Link
            href="/saved"
            aria-label="View saved stays"
            className="hidden h-11 items-center gap-2 rounded-control px-3 text-[0.8125rem] font-semibold tracking-[0.01em] text-foreground/80 transition-colors duration-200 ease-luma hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:flex"
          >
            <Heart aria-hidden="true" size={18} weight="regular" />
            <span className="hidden xl:inline">Saved</span>
          </Link>

          <Link
            href="/trips"
            className="hidden h-11 items-center rounded-control px-3 text-[0.8125rem] font-semibold tracking-[0.01em] text-foreground/80 transition-colors duration-200 ease-luma hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:flex"
          >
            Trips
          </Link>

          <abbr
            className="hidden h-11 items-center px-2 font-mono text-[0.6875rem] tracking-[0.1em] text-muted-foreground xl:flex"
            title="Indian rupees"
          >
            INR
          </abbr>

          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
