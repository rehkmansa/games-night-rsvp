"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { readStore, writeStore } from "../lib/storage";

/*
 * This gate is a speed bump, not security.
 *
 * The passcode is 0000 and it is compared in plain text. Anyone who reads this
 * file, or guesses four digits, is in. That is deliberate and agreed: the only
 * thing behind it is a guest list and a reveal button for a birthday hangout,
 * so the goal is to stop a curious friend who finds /admin in a shared link,
 * not to withstand an attacker.
 *
 * If this ever guards anything that matters, this whole file has to change:
 * move the code to an env var, compare with a timing-safe hash, and sign the
 * cookie. Until then, do not add more ceremony here and pretend it is secure.
 */
const PASSCODE = "0000";
const COOKIE = "hannah_admin";

export type AdminAuthState = { error?: string };

export async function signIn(
  _prev: AdminAuthState,
  formData: FormData,
): Promise<AdminAuthState> {
  const entered = String(formData.get("passcode") ?? "").trim();
  if (entered !== PASSCODE) {
    return { error: "Wrong code." };
  }
  const jar = await cookies();
  jar.set(COOKIE, "ok", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  revalidatePath("/admin");
  return {};
}

export async function signOut(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
  revalidatePath("/admin");
}

export async function isSignedIn(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(COOKIE)?.value === "ok";
}

/** Flips the memories between sealed and open. Both directions, so a reveal
 *  pressed by accident can be put back. */
export async function setRevealed(revealed: boolean): Promise<void> {
  if (!(await isSignedIn())) return;
  const store = await readStore();
  await writeStore({
    ...store,
    revealedAt: revealed ? new Date().toISOString() : null,
  });
  revalidatePath("/");
  revalidatePath("/admin");
}
