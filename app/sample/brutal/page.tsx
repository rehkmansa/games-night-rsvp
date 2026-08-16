"use client";

/* THROWAWAY PREVIEW — direction D "Brutalist Birthday, ink ground". Delete once a direction is picked. */

import { useState } from "react";

const GUESTS = [
  { secret: "Jollof Enthusiast", status: "coming", revealed: false },
  { secret: "Aux Gremlin", status: "coming", revealed: true, real: "Rehk" },
  { secret: "Cake Courier", status: "coming", revealed: false },
  { secret: "Perpetually Late", status: "maybe", revealed: false },
  { secret: "Cousin, Allegedly", status: "coming", revealed: true, real: "Bayo" },
  { secret: "Uni Days Witness", status: "cant", revealed: false },
];

const STATUS_LABEL: Record<string, string> = {
  coming: "I'm coming",
  maybe: "Maybe",
  cant: "Can't make it",
};

const DETAILS = [
  { label: "The day", value: "Sat 22 August", aside: "clear your afternoon", bg: "bg-hot-pink", fg: "text-ink" },
  { label: "Arrival", value: "12 noon", aside: "come on time", bg: "bg-cyan", fg: "text-ink" },
  { label: "The place", value: "Iyeru Okin", aside: "at the Radisson Blu", bg: "bg-lime", fg: "text-ink" },
];

export default function BrutalSample() {
  const [status, setStatus] = useState("coming");
  const [reveal, setReveal] = useState(false);

  return (
    <div className="relative z-10 min-h-screen bg-ink text-paper">
      {/* MARQUEE */}
      <div className="overflow-hidden border-b-4 border-paper bg-lime py-2">
        <div className="flex animate-[d-slide_24s_linear_infinite] gap-8 whitespace-nowrap font-display text-sm uppercase tracking-[0.2em] text-ink">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>Oshioke · 22.08 · Iyeru Okin, Radisson Blu · arrive 12 noon ·</span>
          ))}
        </div>
      </div>

      <style>{`@keyframes d-slide { to { transform: translateX(-50%); } }`}</style>

      {/* HERO */}
      <section className="relative mx-auto max-w-6xl overflow-hidden px-5 pb-16 pt-14 sm:px-8">
        <p className="font-marker text-2xl text-cyan sm:text-3xl">
          it&apos;s his birthday and you&apos;re invited
        </p>

        <h1 className="mt-4 font-display uppercase leading-[0.82] tracking-[-0.03em]">
          <span className="block text-[clamp(3.2rem,13vw,10.5rem)] text-paper">Oshioke</span>
          <span className="block text-[clamp(2.2rem,9vw,7.5rem)] text-hot-pink">Turns Up</span>
        </h1>

        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
          <span className="font-display text-2xl uppercase text-paper/50 sm:text-4xl">
            the birthday
          </span>
          <span className="relative inline-block font-display text-2xl uppercase text-paper/35 sm:text-4xl">
            boy
            <svg
              viewBox="0 0 100 30"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute -left-[6%] top-[18%] h-[64%] w-[112%] overflow-visible"
            >
              <path
                d="M2 20 C26 8, 54 26, 76 12 C84 7, 93 15, 98 11"
                fill="none"
                stroke="var(--color-hot-pink)"
                strokeWidth="5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </span>
          <span className="tilt-more-right inline-block border-4 border-ink bg-yellow px-5 py-1 font-display text-4xl uppercase text-ink hard-shadow sm:text-6xl">
            Man
          </span>
        </div>

        <div
          className="pointer-events-none absolute right-8 top-10 hidden rotate-12 border-4 border-paper bg-violet px-7 py-4 text-center font-display text-5xl uppercase text-paper hard-shadow-pink lg:block"
          aria-hidden="true"
        >
          22
          <span className="block text-lg tracking-[0.2em]">Aug</span>
        </div>
      </section>

      {/* DETAILS BANDS */}
      <section>
        {DETAILS.map((d) => (
          <div key={d.label} className={`border-t-4 border-ink ${d.bg} ${d.fg}`}>
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-10 gap-y-3 px-5 py-8 sm:px-8">
              <div className="flex flex-col gap-1">
                <span className="font-body text-xs font-bold uppercase tracking-[0.3em] opacity-60">
                  {d.label}
                </span>
                <span className="font-display text-[clamp(1.7rem,4vw,2.9rem)] uppercase leading-none tracking-tight">
                  {d.value}
                </span>
              </div>
              <span className="font-marker text-xl opacity-80 sm:text-2xl">{d.aside}</span>
            </div>
          </div>
        ))}
      </section>

      {/* THE GAME */}
      <section className="border-t-4 border-paper px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.1fr_1fr] md:items-start">
          <h2 className="font-display text-[clamp(1.9rem,4.6vw,3.4rem)] uppercase leading-[0.95]">
            He has to <span className="text-lime">guess</span> who you are
          </h2>
          <div className="flex flex-col gap-4">
            <p className="font-body text-lg leading-relaxed text-paper/85 sm:text-xl">
              Every wish goes up under a secret name. That is all Oshioke sees. At noon on the 22nd
              they all unlock at once and he has to work out who wrote what.
            </p>
            <p className="font-marker text-2xl text-cyan sm:text-3xl">
              you can reveal yourself. you don&apos;t have to.
            </p>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="border-t-4 border-paper bg-paper px-5 py-16 text-ink sm:px-8">
        <form onSubmit={(e) => e.preventDefault()} className="mx-auto max-w-3xl">
          <h2 className="font-display text-[clamp(2.1rem,5.5vw,4rem)] uppercase leading-none">
            Are you in?
          </h2>

          <div className="mt-10 flex flex-col gap-8">
            <label className="flex flex-col gap-2">
              <span className="font-display text-xs uppercase tracking-[0.25em]">
                Your secret name
              </span>
              <input
                placeholder="Aux Gremlin. Jollof Enthusiast. Person From Church."
                className="border-b-4 border-ink bg-transparent px-1 py-3 font-display text-2xl uppercase outline-none placeholder:font-body placeholder:text-base placeholder:normal-case placeholder:text-ink/35 focus:border-hot-pink sm:text-3xl"
              />
              <span className="font-body text-sm text-ink/60">
                The only name on your wish. Make it guessable, or don&apos;t.
              </span>
            </label>

            <fieldset className="border-0 p-0">
              <legend className="mb-3 font-display text-xs uppercase tracking-[0.25em]">
                Are you coming
              </legend>
              <div className="flex flex-wrap gap-3">
                {Object.entries(STATUS_LABEL).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setStatus(key)}
                    className={`cursor-pointer border-4 border-ink px-6 py-3 font-display text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5 ${
                      status === key ? "bg-ink text-paper hard-shadow-pink" : "bg-white hard-shadow"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="flex flex-col gap-2">
              <span className="font-display text-xs uppercase tracking-[0.25em]">
                Your birthday wish
              </span>
              <textarea
                rows={4}
                placeholder="Sealed until noon on the 22nd. Say the thing you'd never say to his face."
                className="border-4 border-ink bg-white px-4 py-3 font-body text-base outline-none focus:bg-yellow/25"
              />
            </label>

            <div className="border-4 border-dashed border-ink p-5">
              <p className="font-display text-xs uppercase tracking-[0.25em]">
                Do you want him to know?
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setReveal(false)}
                  className={`cursor-pointer border-4 border-ink px-5 py-2 font-marker text-2xl transition-transform hover:-translate-y-0.5 ${
                    !reveal ? "bg-hot-pink text-paper hard-shadow" : "bg-white"
                  }`}
                >
                  keep me a mystery
                </button>
                <button
                  type="button"
                  onClick={() => setReveal(true)}
                  className={`cursor-pointer border-4 border-ink px-5 py-2 font-marker text-2xl transition-transform hover:-translate-y-0.5 ${
                    reveal ? "bg-lime hard-shadow" : "bg-white"
                  }`}
                >
                  fine, tell him
                </button>
              </div>
              {reveal && (
                <label className="bounce-in mt-5 flex flex-col gap-2">
                  <span className="font-display text-xs uppercase tracking-[0.25em]">
                    Your real name
                  </span>
                  <input
                    placeholder="Sits next to your secret name on the day"
                    className="border-4 border-ink bg-white px-4 py-3 font-body text-base outline-none focus:bg-yellow/25"
                  />
                </label>
              )}
            </div>

            <button
              type="submit"
              className="cursor-pointer self-start border-4 border-ink bg-ink px-12 py-5 font-display text-2xl uppercase tracking-wide text-lime transition-transform hard-shadow-pink hover:-translate-y-1"
            >
              Seal it
            </button>
          </div>
        </form>
      </section>

      {/* WALL */}
      <section className="border-t-4 border-paper px-5 py-16 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-display text-[clamp(1.8rem,4.4vw,3.2rem)] uppercase leading-none">
            {GUESTS.length} sealed wishes
          </h2>
          <p className="font-marker text-2xl text-cyan">they all open at noon</p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-px border-4 border-paper bg-paper sm:grid-cols-2 lg:grid-cols-3">
          {GUESTS.map((g) => (
            <li
              key={g.secret}
              className="group flex flex-col gap-3 bg-ink p-6 transition-colors hover:bg-hot-pink"
            >
              <p className="font-display text-xl uppercase leading-tight">{g.secret}</p>
              <p className="font-marker text-lg text-cyan group-hover:text-ink">
                {g.revealed ? `aka ${g.real}` : "identity withheld"}
              </p>
              <div className="mt-2 flex-1 border-2 border-dashed border-paper/25 px-3 py-6 text-center font-marker text-lg text-paper/35 group-hover:border-ink/40 group-hover:text-ink/50">
                wish sealed
              </div>
              <span className="self-start border-2 border-paper px-3 py-1 font-display text-[10px] uppercase tracking-[0.2em] group-hover:border-ink group-hover:text-ink">
                {STATUS_LABEL[g.status]}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="border-t-4 border-paper px-5 py-8 text-center font-marker text-2xl text-paper/60 sm:px-8">
        <p>iyeru okin, radisson blu · 22.08 · don&apos;t be weird</p>
      </footer>
    </div>
  );
}
