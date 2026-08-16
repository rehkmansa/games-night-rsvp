import { notFound } from "next/navigation";

/**
 * Preview surfaces (/facts, /sample/*) are kept in the repo for reference but
 * must never be reachable on the deployed site — /facts would expose sealed
 * wishes ahead of the reveal, and /sample shows rejected design directions.
 * Call this at the top of any such page.
 */
export function devOnly(): void {
  if (process.env.NODE_ENV === "production") notFound();
}
