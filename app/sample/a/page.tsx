"use client";

/* THROWAWAY PREVIEW — direction A "Big Date". Delete once a direction is picked. */

import { useState } from "react";
import { Archivo_Black, Archivo, Caveat } from "next/font/google";

const display = Archivo_Black({ subsets: ["latin"], weight: "400" });
const body = Archivo({ subsets: ["latin"] });
const hand = Caveat({ subsets: ["latin"] });

const GUESTS = [
  { secret: "Aux Gremlin", status: "coming", revealed: true, real: "Rehk" },
  { secret: "Bench Philosopher", status: "coming", revealed: false },
  { secret: "Room 3B", status: "coming", revealed: true, real: "Tobi" },
  { secret: "Perpetually Late", status: "maybe", revealed: false },
  { secret: "Uni Days Witness", status: "cant", revealed: false },
];

const STATUS_LABEL: Record<string, string> = {
  coming: "I'm in",
  maybe: "Maybe",
  cant: "Can't",
};

const TILES = [
  { k: "Where", v: "Her estate", n: "address drops closer", cls: "a-tile-plum" },
  { k: "Food", v: "Sorted", n: "she's got it covered", cls: "a-tile-mint" },
  { k: "Expect", v: "Games", n: "gist, pictures, noise", cls: "a-tile-sun" },
];

export default function BigDateSample() {
  const [status, setStatus] = useState("coming");
  const [reveal, setReveal] = useState(false);

  return (
    <div className={`a-root ${body.className}`}>
      <style>{CSS}</style>

      <header className="a-hero">
        <div className="a-name-band">
          <span className={display.className}>FALETI HANNAH</span>
          <span className={`a-band-sub ${hand.className}`}>is having a hangout</span>
        </div>

        <div className="a-date">
          <span className={`a-dow ${display.className}`}>SAT</span>
          <span className={`a-num ${display.className}`}>24</span>
          <span className={`a-mon ${display.className}`}>
            OCT
            <i>2026</i>
          </span>
        </div>
      </header>

      {/* the deadline is the thing she actually asked for, so it gets its own bar */}
      <div className="a-deadline">
        <span className={`a-deadline-k ${display.className}`}>Reply by</span>
        <span className={`a-deadline-v ${display.className}`}>Sat 17 Oct</span>
        <span className="a-deadline-n">
          Especially if you <strong>can&apos;t</strong>{" "}come. She&apos;s counting heads for food.
        </span>
      </div>

      <section className="a-tiles">
        {TILES.map((t) => (
          <div key={t.k} className={`a-tile ${t.cls}`}>
            <span className="a-tile-k">{t.k}</span>
            <strong className={display.className}>{t.v}</strong>
            <span className={`a-tile-n ${hand.className}`}>{t.n}</span>
          </div>
        ))}
      </section>

      <section className="a-secret">
        <h2 className={`a-h2 ${display.className}`}>Leave her one memory</h2>
        <p>Signed with a fake name. She reads it, then has to guess who you are.</p>
      </section>

      <form className="a-form" onSubmit={(e) => e.preventDefault()}>
        <fieldset className="a-status">
          <legend>Are you coming</legend>
          <div>
            {Object.entries(STATUS_LABEL).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setStatus(key)}
                className={`a-chip${status === key ? " is-on" : ""} ${display.className}`}
              >
                {label}
              </button>
            ))}
          </div>
          {status === "cant" && (
            <p className={`a-early ${hand.className}`}>thanks for saying early, it really helps</p>
          )}
        </fieldset>

        <label className="a-field">
          <span>Secret name</span>
          <input placeholder="Aux Gremlin, Room 3B, Person From Church" />
        </label>

        <label className="a-field">
          <span>A memory of you and Hannah</span>
          <textarea rows={3} placeholder="She can't read it until she opens them." />
        </label>

        <div className="a-reveal">
          <p>Should she know it&apos;s you?</p>
          <div>
            <button
              type="button"
              onClick={() => setReveal(false)}
              className={`a-chip${!reveal ? " is-on" : ""} ${display.className}`}
            >
              Nope
            </button>
            <button
              type="button"
              onClick={() => setReveal(true)}
              className={`a-chip${reveal ? " is-on" : ""} ${display.className}`}
            >
              Tell her
            </button>
          </div>
          {reveal && (
            <label className="a-field a-field-reveal">
              <span>Your real name</span>
              <input placeholder="Shown next to your secret name" />
            </label>
          )}
        </div>

        <label className="a-photo">
          <input type="checkbox" />
          <span>
            Photos and videos are happening. Tick if you&apos;d rather not be in them.
          </span>
        </label>

        <button type="submit" className={`a-send ${display.className}`}>
          Send it
        </button>
      </form>

      <section className="a-wall">
        <h2 className={`a-h2 ${display.className}`}>
          {GUESTS.length} in
          <span className={hand.className}>memories sealed</span>
        </h2>
        <ul>
          {GUESTS.map((g, i) => (
            <li key={g.secret} className={`a-card a-card-${i % 3}`}>
              <span className={`a-card-name ${display.className}`}>{g.secret}</span>
              <span className="a-card-real">
                {g.revealed ? `aka ${g.real}` : "still a mystery"}
              </span>
              <span className={`a-tag a-tag-${g.status}`}>{STATUS_LABEL[g.status]}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const CSS = `
.a-root {
  --paper: #FFF9F0;
  --ink: #1C1A26;
  --soft: #857E92;
  --coral: #FF5C4D;
  --plum: #6B4E9E;
  --mint: #2FA98A;
  --sun: #F5B32E;

  position: relative;
  z-index: 10;
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
  overflow-x: hidden;
  padding-bottom: 80px;
}

/* hero: the date is the poster */
.a-hero { max-width: 1000px; margin: 0 auto; padding: clamp(20px, 4vw, 40px) 20px 0; }
.a-name-band {
  display: flex;
  align-items: baseline;
  gap: 14px;
  flex-wrap: wrap;
  background: var(--ink);
  color: var(--paper);
  padding: 13px clamp(16px, 3vw, 26px);
}
.a-name-band > span:first-child { font-size: clamp(16px, 2.6vw, 24px); letter-spacing: 0.12em; }
.a-band-sub { font-size: clamp(20px, 2.8vw, 26px); color: var(--sun); }

.a-date {
  display: flex;
  align-items: flex-end;
  gap: clamp(10px, 2.5vw, 26px);
  margin-top: clamp(14px, 2.5vw, 24px);
  line-height: 0.78;
}
.a-dow { font-size: clamp(34px, 7vw, 76px); color: var(--coral); }
.a-num {
  font-size: clamp(120px, 31vw, 340px);
  letter-spacing: -0.06em;
  color: var(--ink);
}
.a-mon {
  display: flex;
  flex-direction: column;
  font-size: clamp(34px, 7vw, 76px);
  color: var(--plum);
}
.a-mon i { font-style: normal; font-size: clamp(14px, 2vw, 22px); letter-spacing: 0.22em; color: var(--soft); }

/* deadline bar */
.a-deadline {
  max-width: 1000px;
  margin: clamp(16px, 3vw, 28px) auto 0;
  display: flex;
  align-items: center;
  gap: clamp(10px, 2vw, 20px);
  flex-wrap: wrap;
  background: var(--coral);
  color: #FFF6F4;
  padding: clamp(14px, 2.4vw, 20px) clamp(16px, 3vw, 26px);
}
.a-deadline-k { font-size: 12px; letter-spacing: 0.26em; text-transform: uppercase; opacity: 0.85; }
.a-deadline-v { font-size: clamp(22px, 3.6vw, 34px); }
.a-deadline-n { font-size: 14.5px; line-height: 1.5; opacity: 0.92; max-width: 42ch; }
.a-deadline-n strong { font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }

/* tiles */
.a-tiles {
  max-width: 1000px;
  margin: 12px auto 0;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 12px;
}
.a-tile {
  padding: 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  color: #FFF9F0;
}
.a-tile-plum { background: var(--plum); }
.a-tile-mint { background: var(--mint); }
.a-tile-sun { background: var(--sun); color: var(--ink); }
.a-tile-k { font-size: 10.5px; letter-spacing: 0.26em; text-transform: uppercase; opacity: 0.8; }
.a-tile strong { font-size: clamp(25px, 3.4vw, 32px); line-height: 1.05; }
.a-tile-n { font-size: 20px; opacity: 0.9; }

/* secret */
.a-secret { max-width: 1000px; margin: clamp(26px, 4vw, 44px) auto 0; padding: 0 20px; }
.a-h2 { margin: 0 0 8px; font-size: clamp(24px, 4.2vw, 40px); letter-spacing: -0.02em; }
.a-secret p { margin: 0; font-size: 16px; line-height: 1.65; color: var(--soft); max-width: 48ch; }

/* form */
.a-form {
  /* left-aligned to the same grid as the hero, not centred in it */
  max-width: 1000px;
  margin: clamp(26px, 4vw, 44px) auto 0;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: stretch;
}
.a-form > * { max-width: 620px; width: 100%; }
.a-field { display: flex; flex-direction: column; gap: 7px; }
.a-field > span, .a-status legend, .a-reveal > p {
  font-size: 10.5px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--soft);
}
.a-field input, .a-field textarea {
  font: inherit;
  font-size: 16px;
  background: #FFFFFF;
  border: 2.5px solid var(--ink);
  padding: 13px 15px;
  color: var(--ink);
  resize: vertical;
  border-radius: 0;
}
.a-field input::placeholder, .a-field textarea::placeholder { color: #B4AEC0; }
.a-field input:focus, .a-field textarea:focus { outline: none; border-color: var(--coral); }

.a-status { border: 0; margin: 0; padding: 0; }
.a-status legend { padding: 0 0 10px; }
.a-status > div, .a-reveal > div { display: flex; gap: 9px; flex-wrap: wrap; }
.a-chip {
  cursor: pointer;
  font-size: 15px;
  letter-spacing: 0.03em;
  padding: 11px 22px;
  border: 2.5px solid var(--ink);
  background: transparent;
  color: var(--ink);
  transition: background 140ms ease, color 140ms ease;
}
.a-chip:hover { background: var(--sun); }
.a-chip.is-on { background: var(--ink); color: var(--paper); }
.a-early { margin: 11px 0 0; font-size: 21px; color: var(--mint); }

.a-reveal { display: flex; flex-direction: column; gap: 11px; }
.a-reveal > p { margin: 0; }

.a-photo {
  display: flex;
  gap: 11px;
  align-items: flex-start;
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--soft);
  cursor: pointer;
}
.a-photo input { margin-top: 3px; accent-color: var(--coral); cursor: pointer; }

.a-send {
  cursor: pointer;
  font-size: 19px;
  letter-spacing: 0.04em;
  padding: 16px;
  border: 0;
  background: var(--coral);
  color: #FFF6F4;
  transition: transform 140ms ease, background 140ms ease;
}
.a-send:hover { background: #E8463A; transform: translateY(-2px); }

/* wall */
.a-wall { max-width: 1000px; margin: clamp(34px, 5vw, 56px) auto 0; padding: 0 20px; }
.a-wall .a-h2 { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; }
.a-wall .a-h2 span { font-size: 22px; color: var(--coral); }
.a-wall ul {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 10px;
}
.a-card {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 16px;
  border-left: 7px solid var(--coral);
  background: #FFFFFF;
}
.a-card-1 { border-left-color: var(--plum); }
.a-card-2 { border-left-color: var(--mint); }
.a-card-name { font-size: 16px; }
.a-card-real { font-size: 13px; color: var(--soft); }
.a-tag {
  align-self: flex-start;
  margin-top: 8px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 4px 10px;
  background: var(--ink);
  color: var(--paper);
}
.a-tag-maybe { background: var(--sun); color: var(--ink); }
.a-tag-cant { background: #E8E3EE; color: var(--soft); }

@media (prefers-reduced-motion: reduce) {
  .a-root * { transition: none !important; animation: none !important; }
}
`;
