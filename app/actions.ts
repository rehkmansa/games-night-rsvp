"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { readRsvps, writeRsvps } from "./lib/storage";
import type { Rsvp, RsvpStatus } from "./lib/types";

export type RsvpFormState = {
  ok: boolean;
  error?: string;
  secretName?: string;
};

const VALID_STATUSES: RsvpStatus[] = ["coming", "maybe", "cant"];

function clean(value: FormDataEntryValue | null, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

export async function submitRsvp(
  _prev: RsvpFormState,
  formData: FormData,
): Promise<RsvpFormState> {
  const secretName = clean(formData.get("secretName"), 60);
  const memory = clean(formData.get("memory"), 500);
  const status = clean(formData.get("status"), 10) as RsvpStatus;
  const reveal = clean(formData.get("reveal"), 5) === "yes";
  const realName = clean(formData.get("realName"), 80);

  if (!secretName || !memory) {
    return { ok: false, error: "We need a secret name and a memory." };
  }
  if (!VALID_STATUSES.includes(status)) {
    return { ok: false, error: "Let us know if you're coming, maybe, or can't." };
  }
  if (reveal && !realName) {
    return { ok: false, error: "You said to tell her, so add your real name." };
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      ok: false,
      error: "Storage isn't set up yet. Add BLOB_READ_WRITE_TOKEN in Vercel.",
    };
  }

  const entry: Rsvp = {
    id: randomUUID(),
    secretName,
    memory,
    status,
    createdAt: new Date().toISOString(),
    ...(reveal ? { realName } : {}),
  };

  try {
    const entries = await readRsvps();
    await writeRsvps([...entries, entry]);
  } catch (err) {
    console.error("[rsvp] save failed:", err);
    const detail = err instanceof Error ? err.message : "unknown error";
    return { ok: false, error: `That didn't save. ${detail}` };
  }

  revalidatePath("/");
  return { ok: true, secretName };
}
