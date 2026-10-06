import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Birthday Hangout",
  description: "A look for the invite.",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
