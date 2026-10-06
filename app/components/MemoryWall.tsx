import type { PublicRsvp } from "../lib/types";

const STATUS_LABEL: Record<PublicRsvp["status"], string> = {
  coming: "Coming",
  maybe: "Maybe",
  cant: "Can't make it",
};

export function MemoryWall({ entries, open }: { entries: PublicRsvp[]; open: boolean }) {
  return (
    <section className="a-wall">
      <header className="a-wall-head">
        <h2 className="font-display">
          {entries.length === 0
            ? "No replies yet"
            : `${entries.length} ${entries.length === 1 ? "reply" : "replies"}${open ? "" : ", all sealed"}`}
        </h2>
        <p>
          {entries.length === 0
            ? "Be the first. Yours sits sealed here until she opens them."
            : open
              ? "She opens them all at once and starts guessing."
              : "Sealed until she opens them."}
        </p>
      </header>

      {entries.length > 0 && (
        <ul className="a-envelopes">
          {entries.map((entry) => (
            <li key={entry.id} className={`a-env a-env-${entry.status}`}>
              <div className="a-flap" />
              <div className="a-seal" />
              <p className="a-env-name">{entry.secretName}</p>
              <p className="a-env-tag font-hand">
                {entry.realName ? `aka ${entry.realName}` : "still a mystery"}
              </p>
              {entry.memory && <p className="a-env-memory">{entry.memory}</p>}
              <p className="a-env-status">{STATUS_LABEL[entry.status]}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
