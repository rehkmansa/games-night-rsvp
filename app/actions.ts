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
  const wish = clean(formData.get("wish"), 500);
  const status = clean(formData.get("status"), 10) as RsvpStatus;
  const reveal = clean(formData.get("reveal"), 5) === "yes";
  const realName = clean(formData.get("realName"), 80);

  if (!secretName || !wish) {
    return { ok: false, error: "Give us a secret name and a wish." };
  }
  if (!VALID_STATUSES.includes(status)) {
    return { ok: false, error: "Pick one: coming, maybe, or can't make it." };
  }
  if (reveal && !realName) {
    return { ok: false, error: "You said to tell him, so add your real name." };
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      ok: false,
      error: "Storage isn't configured. Set BLOB_READ_WRITE_TOKEN in Vercel.",
    };
  }

  const entry: Rsvp = {
    id: randomUUID(),
    secretName,
    wish,
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
    return { ok: false, error: `Couldn't save that — ${detail}` };
  }

  revalidatePath("/");
  return { ok: true, secretName };
}
