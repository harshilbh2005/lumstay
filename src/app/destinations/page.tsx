import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { createPageMetadata } from "@/config/metadata";
import { DestinationDiscovery } from "@/features/destinations";

export const metadata = createPageMetadata({
  title: "Destinations",
  description:
    "Explore LumaStay's considered edit of destinations, from Kyoto and Udaipur to South Iceland and the Amalfi Coast.",
  path: "/destinations",
  eyebrow: "Destination index",
});

export default function DestinationsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-brand-paper">
        <DestinationDiscovery />
      </main>
      <SiteFooter />
    </>
  );
}
