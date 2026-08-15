import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SupportPage } from "@/features/support";

export const metadata: Metadata = {
  title: "Support & Contact",
  description:
    "Find clear guidance for the LumaStay prototype and prepare a support note locally without sending personal information to a live service.",
};

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
