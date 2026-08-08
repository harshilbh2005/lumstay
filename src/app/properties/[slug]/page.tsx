import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import {
  getPropertyDetailBySlug,
  mockPropertyDetails,
} from "@/data/mock";
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

  return {
    title: property.summary.name,
    description: property.summary.description,
  };
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
      </Suspense>
      <PropertyDetailShell property={property} />
    </>
  );
}
