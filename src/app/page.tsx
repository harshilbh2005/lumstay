import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BookingConfidence } from "@/components/marketing/booking-confidence";
import { ClosingBookingCta } from "@/components/marketing/closing-booking-cta";
import { ExperienceCollections } from "@/components/marketing/experience-collections";
import { LandingHero } from "@/components/marketing/landing-hero";
import { CuratedStays } from "@/features/properties";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-background">
        <LandingHero />
        <CuratedStays />
        <ExperienceCollections />
        <BookingConfidence />
        <ClosingBookingCta />
      </main>
      <SiteFooter />
    </>
  );
}
