import type { PublicRsvp, Rsvp, RsvpStore } from "./types";

/**
 * Strips the memory text from every entry until the host reveals them.
 *
 * This runs on the server and is the ONLY thing standing between a curious
 * guest and everyone else's memories. Hiding the text with CSS or a client-side
 * flag would still ship it inside the HTML payload, where anyone can read it
 * from view-source. Keep the filtering here, above the component boundary.
 *
 * The trigger is a stored flag rather than a date: there is no fixed reveal
 * time for this one, so the host presses the button in /admin when she's ready.
 */
export function toPublicRsvps(store: RsvpStore): PublicRsvp[] {
  const open = store.revealedAt !== null;
  return store.entries.map((entry: Rsvp) => ({
    id: entry.id,
    secretName: entry.secretName,
    status: entry.status,
    game: entry.game,
    // Her real name goes public only if she said yes; the guest list in /admin
    // is a separate surface with a separate rule.
    realName: entry.showName ? entry.name : undefined,
    memory: open ? entry.memory : undefined,
  }));
}
