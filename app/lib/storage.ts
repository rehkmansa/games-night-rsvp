import { put, list } from "@vercel/blob";
import type { Rsvp, RsvpStore } from "./types";

const BLOB_PATHNAME = "rsvps.json";

async function findBlobUrl(): Promise<string | null> {
  const { blobs } = await list({ prefix: BLOB_PATHNAME });
  const match = blobs.find((b) => b.pathname === BLOB_PATHNAME);
  return match?.url ?? null;
}

export async function readRsvps(): Promise<Rsvp[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  const url = await findBlobUrl();
  if (!url) return [];
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  const data = (await res.json()) as RsvpStore;
  return data.entries ?? [];
}

export async function writeRsvps(entries: Rsvp[]): Promise<void> {
  const store: RsvpStore = { entries };
  await put(BLOB_PATHNAME, JSON.stringify(store, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}
