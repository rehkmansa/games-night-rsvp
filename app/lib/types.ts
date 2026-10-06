export type RsvpStatus = "coming" | "maybe" | "cant";

export type Rsvp = {
  id: string;
  /** The alias shown publicly. The only name Hannah sees before she guesses. */
  secretName: string;
  /** A memory the guest and Hannah share. Hidden until the store is revealed. */
  memory: string;
  status: RsvpStatus;
  /** Optional. Present only if the guest chose to unmask themselves. */
  realName?: string;
  /** Guest asked not to be photographed or filmed on the day. */
  photoOptOut: boolean;
  createdAt: string;
};

/** What the client is allowed to see before the memories unlock. */
export type PublicRsvp = {
  id: string;
  secretName: string;
  status: RsvpStatus;
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
