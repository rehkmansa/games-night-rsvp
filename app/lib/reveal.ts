import type { PublicRsvp, Rsvp } from "./types";

/**
 * Noon on Saturday 12 September 2026, Lagos time (WAT, UTC+1).
 * Every "sealed until" line on the site keys off this single instant.
 */
export const REVEAL_AT = new Date("2026-09-12T11:00:00.000Z");

export function memoriesAreOpen(now: Date = new Date()): boolean {
  return now.getTime() >= REVEAL_AT.getTime();
}

/**
 * Strips the memory text from every entry until the picnic.
 *
 * This runs on the server and is the ONLY thing standing between a curious
 * guest and everyone else's memories. Hiding the text with CSS or a client-side
 * flag would still ship it inside the HTML payload, where anyone can read it
 * from view-source. Keep the filtering here, above the component boundary.
 */
export function toPublicRsvps(entries: Rsvp[], now: Date = new Date()): PublicRsvp[] {
  const open = memoriesAreOpen(now);
  return entries.map((entry) => ({
    id: entry.id,
    secretName: entry.secretName,
    status: entry.status,
    realName: entry.realName,
    memory: open ? entry.memory : undefined,
  }));
}
