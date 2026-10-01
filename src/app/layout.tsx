import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/config/site";
import "./globals.css";

/**
 * Fonts are self-hosted (variable WOFF2 from Google Fonts) so builds never
 * depend on an external download and there are no third-party font requests.
 */
const inter = localFont({
  src: [{ path: "../fonts/inter-latin.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-inter",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const jakarta = localFont({
  src: [{ path: "../fonts/jakarta-latin.woff2", weight: "600 800", style: "normal" }],
  variable: "--font-jakarta",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon", apple: "/apple-icon" },
};

export const viewport: Viewport = {
  themeColor: "#073665",
  width: "device-width",
  initialScale: 1,
};

/**
 * Root layout: fonts + global styles only. Route groups own their chrome:
 *   (site)      – public marketing website (Stage 1)
 *   (shop)      – tools marketplace (Stage 2, future)
 *   (platform)  – authenticated client workspace (Stage 3, future)
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
