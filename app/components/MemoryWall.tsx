import type { PublicRsvp } from "../lib/types";

const STATUS_LABEL: Record<PublicRsvp["status"], string> = {
  coming: "I'm in",
  maybe: "Maybe",
  cant: "Can't",
};

const TAG: Record<PublicRsvp["status"], string> = {
  coming: "bg-[#F2EADD] text-[#7A6218]",
  maybe: "bg-[#F7E7E1] text-[#9A4B36]",
  cant: "bg-[#EFEAE6] text-soft",
};

const TILT = ["-rotate-[1.4deg]", "rotate-[1.1deg]", "-rotate-[0.5deg]", "rotate-[1.7deg]"];

export function MemoryWall({ entries, open }: { entries: PublicRsvp[]; open: boolean }) {
  return (
    <section className="mx-auto mt-10 w-full max-w-[900px] sm:mt-14">
      <h2 className="flex flex-wrap items-baseline gap-3 font-display text-[clamp(1.4375rem,3.6vw,2rem)] font-extrabold tracking-[-0.02em]">
        {entries.length === 0
          ? "Nobody pinned yet"
          : `${entries.length} pinned so far`}
        <span className="font-hand text-[23px] font-normal text-coral">
          {entries.length === 0
            ? "be the first"
            : open
              ? "all open"
              : "all sealed"}
        </span>
      </h2>

      {entries.length === 0 ? (
        <p className="mt-3 max-w-[52ch] text-[15px] text-soft">
          Add your name above and your memory goes up here, sealed, until she opens them.
        </p>
      ) : (
        <ul className="mt-5 grid list-none grid-cols-[repeat(auto-fill,minmax(215px,1fr))] gap-[18px] p-0">
          {entries.map((entry, i) => (
            <li
              key={entry.id}
              className={`relative bg-card px-4 pb-4 pt-[22px] paper-shadow transition-transform hover:rotate-0 hover:-translate-y-1 ${TILT[i % TILT.length]}`}
            >
              <span
                className="tape -top-3 left-4 h-5 w-[62px] -rotate-6"
                aria-hidden="true"
              />
              <p className="font-display text-[17px] font-extrabold leading-tight">
                {entry.secretName}
              </p>
              <p className="mt-0.5 font-hand text-xl text-soft">
                {entry.realName ? `aka ${entry.realName}` : "still a mystery"}
              </p>

              {entry.memory ? (
                <p className="mt-3 border-t border-dashed border-ink/20 pt-3 text-[14.5px] leading-relaxed text-soft">
                  {entry.memory}
                </p>
              ) : (
                <div className="mt-3 flex flex-col gap-[7px]" aria-hidden="true">
                  <span className="h-[7px] rounded-full bg-ink/10" />
                  <span className="h-[7px] w-[82%] rounded-full bg-ink/10" />
                  <span className="h-[7px] w-[54%] rounded-full bg-ink/10" />
                </div>
              )}

              <span
                className={`mt-3.5 inline-block rounded-full px-[11px] py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] ${TAG[entry.status]}`}
              >
                {STATUS_LABEL[entry.status]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
