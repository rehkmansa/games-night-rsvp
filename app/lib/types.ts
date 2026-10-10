export type RsvpStatus = "coming" | "maybe" | "cant";

/** Hannah is running two games; every guest picks the one they're in. */
export type GameChoice = "hottakes" | "murder";

/** Explicit choice, never an unticked default. See FIX-2026-10-10-02. */
export type PhotoPolicy = "fine" | "no";

export type Rsvp = {
  id: string;
  /** The alias shown publicly. The only name Hannah sees before she guesses. */
  secretName: string;
  /** A memory the guest and Hannah share. Hidden until the store is revealed. */
  memory: string;
  status: RsvpStatus;
  game: GameChoice;
  photoPolicy: PhotoPolicy;
  /** Optional. Present only if the guest chose to unmask themselves. */
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
