export type RsvpStatus = "coming" | "maybe" | "cant";

export type Rsvp = {
  id: string;
  /** The alias shown publicly. The only name Oshioke sees before he guesses. */
  secretName: string;
  /** Sealed until REVEAL_AT. Never sent to the client before then. */
  wish: string;
  status: RsvpStatus;
  /** Optional. Present only if the guest chose to unmask themselves. */
  realName?: string;
  createdAt: string;
};

/** What the client is allowed to see before the wishes unlock. */
export type PublicRsvp = {
  id: string;
  secretName: string;
  status: RsvpStatus;
  realName?: string;
  wish?: string;
};

export type RsvpStore = {
  entries: Rsvp[];
};
