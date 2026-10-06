import type { Metadata } from "next";

/*
 * Public on purpose: these get shared with Hannah so she can pick a look.
 * They render mock guests only and never read the real store.
 */
export const metadata: Metadata = {
  title: "Hannah's invite",
  description: "Four looks for the invite. Pick the one you like.",
};

export default function SampleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
