import { SiteHeader } from "@/components/layout/site-header";
import { LandingHero } from "@/components/marketing/landing-hero";
import { CuratedStays } from "@/features/properties";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <LandingHero />
      <CuratedStays />
    </main>
  );
}
