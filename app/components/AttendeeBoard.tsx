import type { Rsvp, RsvpStatus } from "../lib/types";

const TILTS = ["tilt-left", "tilt-right", "tilt-more-left", "tilt-more-right"];
const CARD_COLORS = ["bg-yellow", "bg-cyan", "bg-lime", "bg-violet/80", "bg-orange/90"];

const COLUMNS: {
  status: RsvpStatus;
  title: string;
  emoji: string;
  accent: string;
  empty: string;
}[] = [
  {
    status: "coming",
    title: "Locked in",
    emoji: "🔥",
    accent: "bg-lime",
    empty: "be the first one in.",
  },
  {
    status: "maybe",
    title: "On the fence",
    emoji: "🤔",
    accent: "bg-yellow",
    empty: "no fence-sitters yet.",
  },
  {
    status: "cant",
    title: "Bailed",
    emoji: "💀",
    accent: "bg-hot-pink",
    empty: "nobody's chickened out... yet.",
  },
];

function Card({ rsvp, index }: { rsvp: Rsvp; index: number }) {
  const tilt = TILTS[index % TILTS.length];
  const color = CARD_COLORS[index % CARD_COLORS.length];
  return (
    <div
      className={`relative ${color} border-[3px] border-ink rounded-2xl p-4 hard-shadow ${tilt}`}
    >
      <div className="font-display uppercase text-2xl leading-none">
        {rsvp.nickname}
      </div>
      <div className="font-marker text-xs text-ink/70 mt-1">
        a.k.a. {rsvp.name}
      </div>
      <div className="font-body text-sm mt-3 border-t-2 border-dashed border-ink/40 pt-2 flex items-center gap-2">
        <span className="text-lg">🔒</span>
        <p className="font-marker text-xs leading-snug uppercase text-ink/70">
          fact sealed. revealed at games night.
        </p>
      </div>
    </div>
  );
}

export function AttendeeBoard({ rsvps }: { rsvps: Rsvp[] }) {
  const byStatus = COLUMNS.map((col) => ({
    ...col,
    items: rsvps.filter((r) => r.status === col.status),
  }));

  return (
    <section className="relative z-10 px-6 py-10 sm:py-14">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display uppercase text-4xl sm:text-6xl leading-none mb-2">
          the <span className="bg-violet text-paper px-2 tilt-left inline-block">attendee</span> wall
        </h2>
        <p className="font-marker text-lg text-ink/70 mb-8">
          live updates. who&apos;s in, who&apos;s sketchy, who&apos;s a ghost.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {byStatus.map((col) => (
            <div key={col.status} className="flex flex-col gap-4">
              <div
                className={`${col.accent} border-[3px] border-ink rounded-2xl px-4 py-3 hard-shadow flex items-center justify-between`}
              >
                <div className="font-display uppercase text-2xl">
                  {col.emoji} {col.title}
                </div>
                <div className="font-display text-3xl bg-ink text-paper rounded-full w-12 h-12 flex items-center justify-center border-[3px] border-ink">
                  {col.items.length}
                </div>
              </div>

              {col.items.length === 0 ? (
                <div className="border-[3px] border-dashed border-ink/40 rounded-2xl p-6 text-center font-marker text-ink/50">
                  {col.empty}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {col.items.map((rsvp, idx) => (
                    <Card key={rsvp.id} rsvp={rsvp} index={idx} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
