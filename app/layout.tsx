import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Oshioke's Birthday",
  description:
    "Saturday 22 August, 12 till 4, Iyeru Okin at the Radisson Blu. Leave a wish under a secret name.",
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
