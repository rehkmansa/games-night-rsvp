"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { readStore, writeStore } from "./lib/storage";
import type { GameChoice, PhotoPolicy, Rsvp, RsvpStatus } from "./lib/types";

export type RsvpFormState = {
  ok: boolean;
  error?: string;
  secretName?: string;
};

const VALID_STATUSES: RsvpStatus[] = ["coming", "maybe", "cant"];
const VALID_GAMES: GameChoice[] = ["hottakes", "murder"];
const VALID_PHOTO: PhotoPolicy[] = ["fine", "no"];

function clean(value: FormDataEntryValue | null, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

export async function submitRsvp(
  _prev: RsvpFormState,
  formData: FormData,
): Promise<RsvpFormState> {
  const name = clean(formData.get("name"), 80);
  const secretName = clean(formData.get("secretName"), 60);
  const memory = clean(formData.get("memory"), 500);
  const status = clean(formData.get("status"), 10) as RsvpStatus;
  const showName = clean(formData.get("showName"), 5) === "yes";
  const game = clean(formData.get("game"), 10) as GameChoice;
  const photoPolicy = clean(formData.get("photoPolicy"), 5) as PhotoPolicy;

  if (!name) {
    return { ok: false, error: "We need your name for the guest list." };
  }
  if (!secretName || !memory) {
    return { ok: false, error: "We need a secret name and a memory." };
  }
  if (!VALID_STATUSES.includes(status)) {
    return { ok: false, error: "Let us know if you're coming, maybe, or can't." };
  }
  if (!VALID_GAMES.includes(game)) {
    return { ok: false, error: "Pick which game you're in." };
  }
  /*
   * [FIX-2026-10-10-02] Photo consent is a required choice, never a default.
   *
   * It used to be a single unticked checkbox ("I'd rather not be in photos"),
   * so the overwhelmingly common submission — someone who skimmed the form and
   * never touched it — was recorded as consent. Hannah is hiring someone to
   * shoot stills and video, and she reads this list to brief them, so a guest
   * who simply did not notice the line would have been filmed. Silence is not
   * consent: with two radios there is no state that means "they didn't say".
   *
   * This is the server half. The form half is the required radio group in
   * RsvpForm.tsx; that one stops the mistake, this one makes it impossible to
   * post around. Do not reintroduce a default here to be "friendlier".
   */
  if (!VALID_PHOTO.includes(photoPolicy)) {
    return { ok: false, error: "Let us know how you feel about photos." };
  }

  const entry: Rsvp = {
    id: randomUUID(),
    name,
    secretName,
    memory,
    status,
    game,
    photoPolicy,
    showName,
    createdAt: new Date().toISOString(),
  };

  try {
    const store = await readStore();
    await writeStore({ ...store, entries: [...store.entries, entry] });
  } catch (err) {
    console.error("[rsvp] save failed:", err);
    const detail = err instanceof Error ? err.message : "unknown error";
    return { ok: false, error: `That didn't save. ${detail}` };
  }

  revalidatePath("/");
  return { ok: true, secretName };
}
