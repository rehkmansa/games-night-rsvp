export type RsvpStatus = "coming" | "maybe" | "cant";

export type Rsvp = {
  id: string;
  /** The alias shown publicly. The only name Meera sees before she guesses. */
  secretName: string;
  /** A memory the guest and Meera share. Sealed until REVEAL_AT. */
  memory: string;
  status: RsvpStatus;
  /** Optional. Present only if the guest chose to unmask themselves. */
  realName?: string;
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
};
