import type { Viewport } from "next";
import { Bodoni_Moda, Geist_Mono, Jost } from "next/font/google";

import { AppProviders } from "@/components/providers/app-providers";
import { rootMetadata } from "@/config/metadata";

import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = rootMetadata;

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#fcfbf8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${jost.variable} ${bodoniModa.variable} ${geistMono.variable} min-h-full bg-background font-sans text-foreground antialiased`}
      >
        <a
          href="#main-content"
          className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-sm bg-brand-forest-deep px-4 py-3 text-sm font-semibold text-brand-paper shadow-float transition-transform duration-200 focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-brand-brass focus:ring-offset-2 focus:ring-offset-brand-paper motion-reduce:transition-none"
        >
          Skip to main content
        </a>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
