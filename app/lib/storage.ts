import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { get, put } from "@vercel/blob";
import type { Rsvp, RsvpStore } from "./types";

/**
 * One key per event. "rsvps.json" (games night), "birthday-rsvps.json"
 * (Oshioke) and "picnic-rsvps.json" (Meera) all use older field shapes. A
 * fresh key starts this store empty and leaves the old files intact.
 */
const BLOB_PATHNAME = "hannah-rsvps.json";

/**
 * Local dev has no BLOB_READ_WRITE_TOKEN, and for three events running that
 * meant every write path — submitting an RSVP, pressing reveal — could only be
 * checked by deploying and hoping. This file store is the stand-in so the whole
 * flow is testable offline. It is DEV ONLY on purpose: in production a missing
 * token is a real misconfiguration and must fail loudly rather than silently
 * writing to a container filesystem that disappears on the next deploy.
 */
const DEV_FILE = join(process.cwd(), ".data", BLOB_PATHNAME);
const useDevFile = () =>
  !process.env.BLOB_READ_WRITE_TOKEN && process.env.NODE_ENV !== "production";

const EMPTY: RsvpStore = { entries: [], revealedAt: null };

function normalise(data: Partial<RsvpStore> | null): RsvpStore {
  return {
    entries: data?.entries ?? [],
    revealedAt: data?.revealedAt ?? null,
  };
}

export async function readStore(): Promise<RsvpStore> {
  if (useDevFile()) {
    try {
      return normalise(JSON.parse(await readFile(DEV_FILE, "utf8")));
    } catch {
      return EMPTY;
    }
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) return EMPTY;

  const result = await get(BLOB_PATHNAME, { access: "private", useCache: false });
  if (!result) return EMPTY;
  return normalise((await new Response(result.stream).json()) as Partial<RsvpStore>);
}

export async function writeStore(store: RsvpStore): Promise<void> {
  const json = JSON.stringify(store, null, 2);

  if (useDevFile()) {
    await mkdir(dirname(DEV_FILE), { recursive: true });
    await writeFile(DEV_FILE, json, "utf8");
    return;
  }

  await put(BLOB_PATHNAME, json, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function readRsvps(): Promise<Rsvp[]> {
  return (await readStore()).entries;
}
