export type RsvpStatus = "coming" | "maybe" | "cant";

/** Hannah is running two games; every guest picks the one they're in. */
export type GameChoice = "hottakes" | "murder";

/** Explicit choice, never an unticked default. See FIX-2026-10-10-02. */
export type PhotoPolicy = "fine" | "no";

export type Rsvp = {
  id: string;
  /**
   * Real name. Always collected: Hannah plans food and drinks off this list, so
   * "who is coming" cannot be optional. This is NOT the same question as
   * whether the guest is willing to be linked to their memory.
   */
  name: string;
  /** The alias the memory is signed with. Kept apart from `name` until reveal. */
  secretName: string;
  /** A memory the guest and Hannah share. Hidden until the store is revealed. */
  memory: string;
  status: RsvpStatus;
  game: GameChoice;
  photoPolicy: PhotoPolicy;
  /** Guest is happy for their real name to sit next to their memory publicly. */
  showName: boolean;
  /** Legacy alias for `name` on entries written before the split. */
  realName?: string;
  /**
   * Legacy. Entries written before the photo question became a required choice
   * carry this boolean instead of photoPolicy; normaliseEntry in storage.ts
   * converts it on read. Do not write it.
   */
  photoOptOut?: boolean;
  createdAt: string;
};

/** What the client is allowed to see before the memories unlock. */
export type PublicRsvp = {
  id: string;
  secretName: string;
  status: RsvpStatus;
  game: GameChoice;
  /** Only present when the guest opted to be named publicly. */
  realName?: string;
  memory?: string;
};

export type RsvpStore = {
  entries: Rsvp[];
  /**
   * ISO timestamp of the moment the host pressed reveal, or null while the
   * memories are still sealed. There is no fixed date for the reveal, so this
   * flag is the single source of truth rather than a countdown.
   */
  revealedAt: string | null;
};

export const GAME_LABEL: Record<GameChoice, string> = {
  hottakes: "Rage bait hot takes",
  murder: "Murder mystery",
};

export const PHOTO_LABEL: Record<PhotoPolicy, string> = {
  fine: "Fine with photos",
  no: "No photos please",
};
