import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { createPageMetadata } from "@/config/metadata";
import { LumaEdit } from "@/features/editorial";

export const metadata = createPageMetadata({
  title: "The Luma Edit",
  description:
    "Read LumaStay's independent journal of places, rooms, tables, and travel rituals worth noticing.",
  path: "/edit",
  eyebrow: "Independent travel journal",
});

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
