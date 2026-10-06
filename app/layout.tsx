import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, Work_Sans } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
});

const body = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

/*
 * Derived, never hardcoded. The project has already been renamed twice, and a
 * stale host here silently breaks link previews: og:image is an absolute URL,
 * so WhatsApp and co. fetch the dead domain and show no card at all. Vercel
 * sets VERCEL_PROJECT_PRODUCTION_URL to the current production domain.
 */
const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";
const TITLE = "Birthday Hangout";
const DESCRIPTION =
  "Saturday 24 October at Hannah's estate. Food, drinks and games are sorted, just reply by the 17th so she can plan, and leave her a memory under a secret name.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Birthday Hangout",
  keywords: ["birthday", "hangout", "RSVP", "Lagos"],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Birthday Hangout",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#fdf8f3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${hand.variable} ${body.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col">{children}</body>
    </html>
  );
}
