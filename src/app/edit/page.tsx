import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { LumaEdit } from "@/features/editorial";

export const metadata: Metadata = {
  title: "The Luma Edit",
  description:
    "Read LumaStay's independent journal of places, rooms, tables, and travel rituals worth noticing.",
};

export default function EditPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-brand-paper">
        <LumaEdit />
      </main>
      <SiteFooter />
    </>
  );
}
