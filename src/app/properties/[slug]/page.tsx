import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { createPageMetadata } from "@/config/metadata";
import {
  getPropertyDetailBySlug,
  mockPropertyDetails,
} from "@/data/mock";
import { BookingStoreInitializer } from "@/features/booking/components/booking-store-initializer";
import { toBookingProperty } from "@/features/booking/lib/booking-store-seed";
import {
  PropertyDetailShell,
  PropertyErrorDemo,
} from "@/features/properties";

type PropertyPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

export function generateStaticParams() {
  return mockPropertyDetails.map((property) => ({
    slug: property.summary.slug,
  }));
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyDetailBySlug(slug);

  if (!property) {
    notFound();
  }

  const location = [
    property.summary.location.city,
    property.summary.location.region,
    property.summary.location.country,
  ]
    .filter(Boolean)
    .join(", ");

  return createPageMetadata({
    title: property.summary.name,
    description: `Explore the fictional ${property.summary.name} profile in ${location}, including editorial detail, room fixtures, and a prototype booking journey.`,
    path: `/properties/${property.summary.slug}`,
    eyebrow: "Fictional property folio",
    detail: "Prototype inventory · No live availability",
  });
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = getPropertyDetailBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <>
      <Suspense fallback={null}>
        <PropertyErrorDemo />
        <BookingStoreInitializer
          property={toBookingProperty(property.summary)}
        />
      </Suspense>
      <PropertyDetailShell property={property} />
    </>
  );
}
