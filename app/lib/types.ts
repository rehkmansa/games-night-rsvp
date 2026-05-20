export type RsvpStatus = "coming" | "maybe" | "cant";

export type Rsvp = {
  id: string;
  name: string;
  nickname: string;
  factAbout: string;
  status: RsvpStatus;
  createdAt: string;
};

export type RsvpStore = {
  entries: Rsvp[];
};
