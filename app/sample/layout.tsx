import type { Metadata } from "next";

/*
 * These previews are public on purpose: they get shared with the birthday
 * person so she can pick a look. /facts stays dev-gated because it would show
 * sealed wishes early; nothing here reads real data.
 */
export const metadata: Metadata = {
  title: "Meera's picnic",
  description: "Four looks for the invite. Pick the one you like.",
};

export default function SampleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
