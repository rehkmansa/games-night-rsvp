import { get, put } from "@vercel/blob";
import type { Rsvp, RsvpStore } from "./types";

/**
 * Deliberately NOT "rsvps.json" — that key still holds the games-night entries,
 * which use the old {name, nickname, factAbout} shape. Pointing the birthday
 * site at a fresh key starts the store empty and leaves the old file readable
 * if anyone ever wants it back.
 */
const BLOB_PATHNAME = "birthday-rsvps.json";

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
