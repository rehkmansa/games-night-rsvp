"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { readRsvps, writeRsvps } from "./lib/storage";
import type { Rsvp, RsvpStatus } from "./lib/types";

export type RsvpFormState = {
  ok: boolean;
  error?: string;
  nickname?: string;
};

const VALID_STATUSES: RsvpStatus[] = ["coming", "maybe", "cant"];

function clean(value: FormDataEntryValue | null, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

export async function submitRsvp(
  _prev: RsvpFormState,
  formData: FormData,
): Promise<RsvpFormState> {
  const name = clean(formData.get("name"), 80);
  const nickname = clean(formData.get("nickname"), 40);
  const factAbout = clean(formData.get("factAbout"), 280);
  const status = clean(formData.get("status"), 10) as RsvpStatus;

  if (!name || !nickname || !factAbout) {
    return { ok: false, error: "Fill in all three fields, no cheating." };
  }
  if (!VALID_STATUSES.includes(status)) {
    return { ok: false, error: "Pick a status — coming, maybe, or can't." };
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      ok: false,
      error: "Storage isn't configured. Set BLOB_READ_WRITE_TOKEN in Vercel.",
    };
  }

  const entry: Rsvp = {
    id: randomUUID(),
    name,
    nickname,
    factAbout,
    status,
    createdAt: new Date().toISOString(),
  };

  try {
    const entries = await readRsvps();
    await writeRsvps([...entries, entry]);
  } catch (err) {
    console.error("[rsvp] save failed:", err);
    const detail = err instanceof Error ? err.message : "unknown error";
    return { ok: false, error: `Couldn't save that — ${detail}` };
  }

  revalidatePath("/");
  return { ok: true, nickname };
}
