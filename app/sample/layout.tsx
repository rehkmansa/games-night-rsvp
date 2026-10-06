import type { Metadata } from "next";
import { VariantSwitcher } from "./VariantSwitcher";

/*
 * Public on purpose: these get shared so a look can be picked. They render
 * mock guests only and never read the real store.
 */
export const metadata: Metadata = {
  title: "Birthday Hangout",
  description: "Pick the look you like.",
};

export default function SampleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <VariantSwitcher />
    </>
  );
}
