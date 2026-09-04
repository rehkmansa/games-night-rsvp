import { get, put } from "@vercel/blob";
import type { Rsvp, RsvpStore } from "./types";

/**
 * One key per event. "rsvps.json" holds the games-night entries and
 * "birthday-rsvps.json" holds Oshioke's; both use older field shapes. A fresh
 * key starts the picnic store empty and leaves the old files intact.
 */
const BLOB_PATHNAME = "picnic-rsvps.json";

export async function readRsvps(): Promise<Rsvp[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  const result = await get(BLOB_PATHNAME, {
    access: "private",
    useCache: false,
  });
  if (!result) return [];
  const data = (await new Response(result.stream).json()) as RsvpStore;
  return data.entries ?? [];
}

export async function writeRsvps(entries: Rsvp[]): Promise<void> {
  const store: RsvpStore = { entries };
  await put(BLOB_PATHNAME, JSON.stringify(store, null, 2), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}
