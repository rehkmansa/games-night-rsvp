import { RsvpForm } from "./RsvpForm";

const DETAILS = [
  { label: "The day", value: "Saturday 22 August" },
  { label: "Arrival", value: "12 noon" },
  { label: "The place", value: "Iyeru Okin", note: "at the Radisson Blu" },
];

export function InviteCard() {
  return (
    <section className="relative w-full max-w-[780px] overflow-hidden rounded bg-stock px-6 pb-8 pt-9 text-ink card-stock card-keyline sm:px-14 sm:pb-14 sm:pt-14">
      <div className="absolute inset-x-0 top-0 flex h-[9px]" aria-hidden="true">
        <span className="flex-1 bg-red" />
        <span className="flex-1 bg-marigold" />
        <span className="flex-1 bg-teal" />
        <span className="flex-1 bg-pine" />
      </div>

      <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-teal sm:mb-7">
        You are invited
      </p>

      <h1 className="font-display text-[clamp(1.75rem,4.6vw,2.6rem)] leading-tight">
        Happy Birthday,
        <span className="mt-1.5 block font-display text-[clamp(3.4rem,12.5vw,7.25rem)] font-bold leading-[0.92] tracking-[-0.035em] [font-variation-settings:'SOFT'_40,'WONK'_1]">
          Oshioke
        </span>
      </h1>

      <p className="mt-5 flex flex-wrap items-center gap-3 text-[clamp(1.5rem,3.6vw,2.125rem)] leading-tight text-ink-soft sm:mt-7">
        the birthday
        <span className="relative inline-block">
          boy
          <svg
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute left-[-6%] top-[14%] h-[82%] w-[112%] overflow-visible"
          >
            <path
              d="M2 21 C24 9, 52 25, 74 12 C82 7, 92 14, 98 10"
              fill="none"
              stroke="var(--color-red)"
              strokeWidth="4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </span>
        <span className="inline-block -rotate-4 font-hand text-[clamp(3.25rem,8.5vw,5.125rem)] leading-[0.72] text-red">
          man
        </span>
      </p>

      <div className="dashed-rule my-7 sm:my-9" />

      <dl className="grid gap-6 sm:grid-cols-3">
        {DETAILS.map((d) => (
          <div key={d.label}>
            <dt className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-teal">
              {d.label}
            </dt>
            <dd className="text-[clamp(1.1875rem,2.3vw,1.375rem)] font-semibold leading-tight">
              {d.value}
              {d.note && (
                <span className="mt-0.5 block text-sm font-normal text-ink-soft">{d.note}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      <div className="dashed-rule my-7 sm:my-9" />

      <div className="mb-7 border-l-4 border-teal bg-teal/10 px-5 py-4">
        <p className="font-display text-[clamp(1.25rem,2.8vw,1.625rem)] font-bold">
          He has to guess who you are
        </p>
        <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
          Your wish goes up under a secret name. That is all he sees. At noon on the 22nd they all
          unlock at once and he has to work out who wrote what.
        </p>
      </div>

      <RsvpForm />
    </section>
  );
}
