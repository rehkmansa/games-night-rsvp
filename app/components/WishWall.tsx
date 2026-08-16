import type { PublicRsvp } from "../lib/types";

const STATUS_LABEL: Record<PublicRsvp["status"], string> = {
  coming: "Coming",
  maybe: "Maybe",
  cant: "Can't make it",
};

const SEAL_COLOR: Record<PublicRsvp["status"], string> = {
  coming: "bg-red",
  maybe: "bg-marigold",
  cant: "bg-[#8c8378]",
};

export function WishWall({ entries, open }: { entries: PublicRsvp[]; open: boolean }) {
  if (entries.length === 0) {
    return (
      <section className="w-full max-w-[1000px] text-center">
        <h2 className="font-display text-[clamp(1.625rem,4.4vw,2.5rem)] font-semibold tracking-[-0.02em]">
          No wishes yet
        </h2>
        <p className="mt-2 text-[15px] text-stock/70">
          Be the first. Yours sits sealed on this wall until noon on the 22nd.
        </p>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[1000px]">
      <header className="mb-7 text-center sm:mb-10">
        <h2 className="font-display text-[clamp(1.625rem,4.4vw,2.5rem)] font-semibold tracking-[-0.02em]">
          {entries.length} {entries.length === 1 ? "wish" : "wishes"} {open ? "open" : "sealed"}
        </h2>
        <p className="mt-2 text-[15px] text-stock/70">
          {open
            ? "They are all open. Now work out who wrote what."
            : "Every one opens at noon on the 22nd. No peeking, not even him."}
        </p>
      </header>

      <ul className="grid list-none grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-[18px] p-0">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="relative overflow-hidden rounded-[3px] bg-stock px-[18px] pb-[18px] pt-[46px] text-ink shadow-[0_14px_30px_-16px_rgba(0,0,0,0.6)] transition-transform hover:-translate-y-[3px]"
          >
            <div className="env-flap absolute inset-x-0 top-0 h-[62px]" aria-hidden="true" />
            <div
              className={`absolute left-1/2 top-[44px] -ml-[13px] h-[26px] w-[26px] rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.25)] ${SEAL_COLOR[entry.status]}`}
              aria-hidden="true"
            />

            <p className="mb-0.5 mt-4 text-[18px] font-bold leading-snug">{entry.secretName}</p>
            <p className="font-hand text-[21px] leading-none text-teal">
              {entry.realName ? `aka ${entry.realName}` : "identity withheld"}
            </p>

            {entry.wish ? (
              <p className="mt-4 border-t border-dashed border-ink/25 pt-3 text-[15px] leading-relaxed text-ink-soft">
                {entry.wish}
              </p>
            ) : (
              <p className="mt-4 border-[1.5px] border-dashed border-ink/25 bg-black/[0.03] px-3 py-4 text-center font-hand text-lg text-ink-soft/60">
                wish sealed
              </p>
            )}

            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">
              {STATUS_LABEL[entry.status]}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
