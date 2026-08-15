import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { createPageMetadata } from "@/config/metadata";
import { SupportPage } from "@/features/support";

export const metadata = createPageMetadata({
  title: "Support & Contact",
  description:
    "Find clear guidance for the LumaStay prototype and prepare a support note locally without sending personal information to a live service.",
  path: "/support",
  eyebrow: "Prototype guidance",
  detail: "Local support preparation · No message sent",
});

export default function SupportRoute() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="min-h-screen bg-brand-paper">
        <SupportPage />
      </main>
      <SiteFooter />
    </>
  );
}
