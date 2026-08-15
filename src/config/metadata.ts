import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

const localSiteUrl = "http://localhost:3000";

export const defaultSiteDescription =
  "Explore a considered editorial collection of distinctive stays through the LumaStay frontend prototype.";

type IndexingPolicy = "index" | "noindex-follow" | "noindex-nofollow";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  eyebrow: string;
  detail?: string;
  indexing?: IndexingPolicy;
};

function normalizeSiteUrl(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  try {
    const parsedUrl = new URL(
      value.includes("://") ? value : `https://${value}`,
    );

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return undefined;
    }

    return new URL(parsedUrl.origin);
  } catch {
    return undefined;
  }
}

function resolveSiteUrl() {
  return (
    normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    normalizeSiteUrl(process.env.VERCEL_URL) ??
    new URL(localSiteUrl)
  );
}

function getRobots(policy: IndexingPolicy): Metadata["robots"] {
  if (policy === "index") {
    return {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    };
  }

  const follow = policy === "noindex-follow";

  return {
    index: false,
    follow,
    nocache: true,
    googleBot: {
      index: false,
      follow,
    },
  };
}

export const siteUrl = resolveSiteUrl();

export function getSocialPreviewUrl({
  title,
  description,
  eyebrow,
  detail = "Considered stays · Frontend prototype",
}: Pick<PageMetadataOptions, "title" | "description" | "eyebrow" | "detail">) {
  const previewUrl = new URL("/social-preview", siteUrl);

  previewUrl.searchParams.set("title", title);
  previewUrl.searchParams.set("description", description);
  previewUrl.searchParams.set("eyebrow", eyebrow);
  previewUrl.searchParams.set("detail", detail);

  return previewUrl;
}

export function createPageMetadata({
  title,
  description,
  path,
  eyebrow,
  detail,
  indexing = "index",
}: PageMetadataOptions): Metadata {
  const socialTitle = `${title} · ${siteConfig.name}`;
  const socialImage = getSocialPreviewUrl({
    title,
    description,
    eyebrow,
    detail,
  });

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: siteConfig.name,
      url: path,
      title: socialTitle,
      description,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: `${title} — ${siteConfig.name}`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage],
    },
    robots: getRobots(indexing),
  };
}

const homeSocialImage = getSocialPreviewUrl({
  title: "Considered stays, beautifully found",
  description: defaultSiteDescription,
  eyebrow: "Independent travel edit",
});

export const rootMetadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: siteConfig.name,
  title: {
    default: "LumaStay — Considered stays, beautifully found",
    template: `%s · ${siteConfig.name}`,
  },
  description: defaultSiteDescription,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "travel",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    url: "/",
    title: "LumaStay — Considered stays, beautifully found",
    description: defaultSiteDescription,
    images: [
      {
        url: homeSocialImage,
        width: 1200,
        height: 630,
        alt: "LumaStay — Considered stays, beautifully found",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LumaStay — Considered stays, beautifully found",
    description: defaultSiteDescription,
    images: [homeSocialImage],
  },
  robots: getRobots("index"),
};
