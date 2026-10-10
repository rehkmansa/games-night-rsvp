import { RsvpForm } from "./RsvpForm";

const DETAILS = [
  { k: "The day", v: "Saturday 24 October" },
  { k: "Reply by", v: "Sat 17 October" },
  { k: "The place", v: "Her estate", note: "address closer to the day" },
];

export function InviteCard() {
  return (
    <div className="a-card">
      <div className="a-ribbon" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <p className="a-eyebrow">Birthday hangout</p>

      <h1 className="a-title font-display">
        You&apos;re invited to
        <span className="a-name">Hannah&apos;s</span>
        <span className="a-name a-name-2">hangout</span>
      </h1>

      <p className="a-gag font-hand">food and drinks are on her, just bring yourself</p>

      <div className="a-rule" />

      <dl className="a-details">
        {DETAILS.map((d) => (
          <div key={d.k}>
            <dt>{d.k}</dt>
            <dd>
              {d.v}
              {d.note && <em>{d.note}</em>}
            </dd>
          </div>
        ))}
      </dl>

      <div className="a-rule" />

      <div className="a-game">
        <p className="a-game-head font-display">Two games, pick one</p>
        <p>
          Rage bait hot takes, where you defend your worst opinion out loud. Or a murder mystery,
          where you play a character and work out who did it. Say which when you reply.
        </p>
      </div>

      <div className="a-rule" />

      <div className="a-game">
        <p className="a-game-head font-display">Leave a fond memory</p>
        <p>
          Leave Hannah a memory from the two of you. Keep it personal, and sign it with a secret
          name. She&apos;ll see the name, but not who it belongs to, until she opens them all and
          starts guessing.
        </p>
      </div>

      <RsvpForm />
    </div>
  );
}
