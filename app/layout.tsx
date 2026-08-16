import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Karla } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
});

const body = Karla({
  variable: "--font-body",
  subsets: ["latin"],
});

const SITE_URL = "https://oshioke-rsvp.vercel.app";
const TITLE = "Oshioke's Birthday · Sat 22 August";
const DESCRIPTION =
  "Arrive for 12 noon at Iyeru Okin, Radisson Blu. RSVP and leave him a birthday wish under a secret name. He has to guess who wrote what.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Oshioke's Birthday",
  keywords: ["Oshioke", "birthday", "RSVP", "Iyeru Okin", "Radisson Blu", "22 August"],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Oshioke's Birthday",
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
  themeColor: "#10362e",
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
