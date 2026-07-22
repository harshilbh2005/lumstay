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
  destinationNavigation: [
    { label: "Udaipur", href: "/search?destination=Udaipur" },
    { label: "Amalfi Coast", href: "/search?destination=Amalfi%20Coast" },
    { label: "South Iceland", href: "/search?destination=South%20Iceland" },
    { label: "AlUla", href: "/search?destination=AlUla" },
    { label: "Kyoto", href: "/search?destination=Kyoto" },
  ],
  companyNavigation: [
    { label: "About LumaStay", href: "/about" },
    { label: "The Luma Edit", href: "/edit" },
    { label: "How we curate", href: "/about/curation" },
  ],
  supportNavigation: [
    { label: "Help & support", href: "/support" },
    { label: "Booking questions", href: "/support#booking" },
    { label: "Cancellations", href: "/support#cancellations" },
  ],
  legalNavigation: [
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
    { label: "Accessibility", href: "/legal/accessibility" },
    { label: "Cookies", href: "/legal/cookies" },
  ],
  market: {
    country: "India",
    currency: "INR",
  },
} as const;

export type SiteConfig = typeof siteConfig;
