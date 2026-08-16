import type { PublicRsvp, Rsvp } from "./types";

/**
 * Noon on 22 August 2026, Lagos time (WAT, UTC+1).
 * Everything on the site keys off this single instant.
 */
export const REVEAL_AT = new Date("2026-08-22T11:00:00.000Z");

export function wishesAreOpen(now: Date = new Date()): boolean {
  return now.getTime() >= REVEAL_AT.getTime();
}

/**
 * Strips the wish text from every entry until the reveal moment.
 *
 * This runs on the server and is the ONLY thing standing between a curious
 * guest and everyone else's wishes. Hiding the text with CSS or a client-side
 * flag would still ship it inside the HTML payload, where anyone can read it
 * from view-source. Keep the filtering here, above the component boundary.
 */
export function toPublicRsvps(entries: Rsvp[], now: Date = new Date()): PublicRsvp[] {
  const open = wishesAreOpen(now);
  return entries.map((entry) => ({
    id: entry.id,
    secretName: entry.secretName,
    status: entry.status,
    realName: entry.realName,
    wish: open ? entry.wish : undefined,
  }));
}
