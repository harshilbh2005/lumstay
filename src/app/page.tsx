import { SiteHeader } from "@/components/layout/site-header";
import { BookingConfidence } from "@/components/marketing/booking-confidence";
import { ClosingBookingCta } from "@/components/marketing/closing-booking-cta";
import { ExperienceCollections } from "@/components/marketing/experience-collections";
import { LandingHero } from "@/components/marketing/landing-hero";
import { CuratedStays } from "@/features/properties";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <LandingHero />
      <CuratedStays />
      <ExperienceCollections />
      <BookingConfidence />
      <ClosingBookingCta />
    </main>
  );
}
