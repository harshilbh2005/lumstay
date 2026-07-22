import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Geist_Mono, Jost } from "next/font/google";

import { AppProviders } from "@/components/providers/app-providers";

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

export const metadata: Metadata = {
  title: {
    default: "LumaStay — Considered stays, beautifully found",
    template: "%s · LumaStay",
  },
  description:
    "A premium hotel discovery and booking experience for exceptional stays.",
};

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
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
