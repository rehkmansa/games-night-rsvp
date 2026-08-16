import { devOnly } from "../lib/dev-only";

/** Gates every /sample/* preview behind local dev. See lib/dev-only.ts. */
export default function SampleLayout({ children }: { children: React.ReactNode }) {
  devOnly();
  return children;
}
