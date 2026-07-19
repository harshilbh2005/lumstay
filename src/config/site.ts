export const siteConfig = {
  name: "LumaStay",
  description: "Considered stays, beautifully found.",
  navigation: [
    { label: "Stays", href: "/search" },
    { label: "Destinations", href: "/destinations" },
    { label: "The Luma Edit", href: "/edit" },
  ],
  accountNavigation: [
    { label: "Saved", href: "/saved" },
    { label: "Trips", href: "/trips" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
