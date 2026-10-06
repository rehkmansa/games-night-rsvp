"use client";

/* THROWAWAY PREVIEW — direction B "The Pass". Delete once a direction is picked. */

import { useState } from "react";
import { Archivo, Archivo_Black, Caveat } from "next/font/google";

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
  coming: "Going",
  maybe: "Maybe",
  cant: "Can't",
};

const ROWS = [
  { k: "Date", v: "Sat 24 Oct" },
  { k: "Venue", v: "Her estate" },
  { k: "Address", v: "Sent closer" },
  { k: "Reply by", v: "Sat 17 Oct" },
];

export default function PassSample() {
  const [status, setStatus] = useState("coming");
  const [reveal, setReveal] = useState(false);

  return (
    <div className={`t-root ${body.className}`}>
      <style>{CSS}</style>

      <div className="t-pass">
        {/* main stub */}
        <div className="t-main">
          <div className="t-head">
            <span className={`t-admit ${display.className}`}>Admit one</span>
            <span className="t-serial">No. 024</span>
          </div>

          <h1 className={`t-title ${display.className}`}>
            Faleti Hannah&apos;s
            <span>Birthday Hangout</span>
          </h1>

          <dl className="t-rows">
            {ROWS.map((r) => (
              <div key={r.k}>
                <dt>{r.k}</dt>
                <dd className={display.className}>{r.v}</dd>
              </div>
            ))}
          </dl>

          <p className="t-fine">
            Food, drinks, games and gist are handled. The only thing she needs from you is an early
            answer, because she&apos;s planning for a headcount.
          </p>
        </div>

        {/* perforated tear-off */}
        <div className="t-tear" aria-hidden="true">
          <span className="t-notch t-notch-top" />
          <span className="t-perf" />
          <span className="t-notch t-notch-bottom" />
        </div>

        <div className="t-side">
          <span className={`t-side-label ${display.className}`}>Hannah</span>
          <span className="t-side-date">24.10</span>
          <span className={`t-side-note ${hand.className}`}>bring yourself</span>
        </div>
      </div>

      <section className="t-secret">
        <h2 className={`t-h2 ${display.className}`}>One memory, no name on it</h2>
        <p>
          Your reply carries a memory of the two of you, signed with a secret name. Hannah sees the
          memory, never who sent it, until she opens them all at once and has to guess who wrote
          what.
        </p>
      </section>

      <form className="t-form" onSubmit={(e) => e.preventDefault()}>
        <h2 className={`t-h2 ${display.className}`}>Claim your pass</h2>

        <fieldset className="t-status">
          <legend>Are you coming</legend>
          <div>
            {Object.entries(STATUS_LABEL).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setStatus(key)}
                className={`t-chip${status === key ? " is-on" : ""}`}
              >
                {label}
              </button>
            ))}
          </div>
          {status === "cant" && (
            <p className={`t-early ${hand.className}`}>thanks for saying early, it really helps</p>
          )}
        </fieldset>

        <label className="t-field">
          <span>Your secret name</span>
          <input placeholder="Aux Gremlin, Room 3B, Person From Church" />
          <em className={hand.className}>this is all she sees</em>
        </label>

        <label className="t-field">
          <span>A memory of you and Hannah</span>
          <textarea rows={4} placeholder="She can't read it until she opens them." />
        </label>

        <div className="t-reveal">
          <p>Should she know it&apos;s you?</p>
          <div>
            <button
              type="button"
              onClick={() => setReveal(false)}
              className={`t-chip${!reveal ? " is-on" : ""}`}
            >
              Keep me a mystery
            </button>
            <button
              type="button"
              onClick={() => setReveal(true)}
              className={`t-chip${reveal ? " is-on" : ""}`}
            >
              Fine, tell her
            </button>
          </div>
          {reveal && (
            <label className="t-field t-field-reveal">
              <span>Your real name</span>
              <input placeholder="Shown next to your secret name" />
            </label>
          )}
        </div>

        <label className="t-photo">
          <input type="checkbox" />
          <span>There&apos;ll be photos and videos. Tick this if you&apos;d rather not be in them.</span>
        </label>

        <button type="submit" className={`t-send ${display.className}`}>
          Claim it
        </button>
      </form>

      <section className="t-wall">
        <h2 className={`t-h2 ${display.className}`}>{GUESTS.length} claimed</h2>
        <ul>
          {GUESTS.map((g) => (
            <li key={g.secret}>
              <span className="t-stub" aria-hidden="true" />
              <span className="t-wall-name">{g.secret}</span>
              <span className="t-wall-real">
                {g.revealed ? `aka ${g.real}` : "still a mystery"}
              </span>
              <span className={`t-tag t-tag-${g.status}`}>{STATUS_LABEL[g.status]}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const CSS = `
.t-root {
  --bg: #11131A;
  --card: #FBF9F4;
  --ink: #15171D;
  --soft: #7B7C84;
  --accent: #E2574C;
  --mint: #4FB286;

  position: relative;
  z-index: 10;
  min-height: 100vh;
  background:
    radial-gradient(70% 50% at 50% -10%, rgba(226,87,76,0.22) 0%, transparent 65%),
    var(--bg);
  color: var(--card);
  padding: clamp(30px, 6vw, 72px) 20px 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(28px, 4vw, 48px);
}

/* the pass */
.t-pass {
  width: min(100%, 760px);
  display: grid;
  grid-template-columns: 1fr auto 150px;
  background: var(--card);
  color: var(--ink);
  box-shadow: 0 24px 50px -26px rgba(0,0,0,0.85);
}
@media (max-width: 640px) {
  .t-pass { grid-template-columns: 1fr; }
}

.t-main { padding: clamp(24px, 4vw, 38px); }
.t-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 2px solid var(--ink);
  padding-bottom: 11px;
}
.t-admit { font-size: 14px; letter-spacing: 0.26em; text-transform: uppercase; }
.t-serial { font-size: 12px; letter-spacing: 0.18em; color: var(--soft); }

.t-title { margin: clamp(18px, 3vw, 26px) 0 0; display: flex; flex-direction: column; line-height: 0.95; }
.t-title { font-size: clamp(26px, 4.6vw, 42px); letter-spacing: -0.02em; }
.t-title span { color: var(--accent); }

.t-rows {
  margin: clamp(20px, 3vw, 30px) 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(118px, 1fr));
  gap: 16px;
}
.t-rows dt { font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--soft); }
.t-rows dd { margin: 5px 0 0; font-size: clamp(16px, 2.2vw, 19px); }

.t-fine {
  margin: clamp(20px, 3vw, 28px) 0 0;
  font-size: 14px;
  line-height: 1.7;
  color: #4C4E57;
  max-width: 54ch;
}

/* perforation between pass and stub */
.t-tear { position: relative; width: 2px; background: transparent; }
.t-perf {
  position: absolute;
  inset: 14px 0;
  width: 2px;
  background: repeating-linear-gradient(180deg, var(--ink) 0 7px, transparent 7px 14px);
  opacity: 0.45;
}
.t-notch {
  position: absolute;
  left: -9px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--bg);
}
.t-notch-top { top: -10px; }
.t-notch-bottom { bottom: -10px; }
@media (max-width: 640px) {
  .t-tear { width: auto; height: 2px; }
  .t-perf { inset: 0 14px; width: auto; height: 2px; background: repeating-linear-gradient(90deg, var(--ink) 0 7px, transparent 7px 14px); }
  .t-notch { left: auto; top: -10px; }
  .t-notch-top { left: -10px; }
  .t-notch-bottom { right: -10px; }
}

.t-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 20px 12px;
  text-align: center;
}
.t-side-label { font-size: 18px; letter-spacing: 0.04em; }
.t-side-date { font-size: 13px; letter-spacing: 0.2em; color: var(--soft); }
.t-side-note { font-size: 22px; color: var(--accent); }

/* secret */
.t-secret { width: min(100%, 760px); }
.t-h2 { margin: 0 0 10px; font-size: clamp(21px, 3.2vw, 28px); letter-spacing: -0.01em; }
.t-secret p { margin: 0; font-size: 15.5px; line-height: 1.75; color: rgba(251,249,244,0.74); max-width: 62ch; }

/* form */
.t-form {
  width: min(100%, 620px);
  align-self: center;
  background: rgba(251,249,244,0.05);
  border: 1px solid rgba(251,249,244,0.16);
  padding: clamp(24px, 4vw, 36px);
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.t-field { display: flex; flex-direction: column; gap: 7px; }
.t-field > span, .t-status legend, .t-reveal > p {
  font-size: 10.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-weight: 700;
  color: rgba(251,249,244,0.58);
}
.t-field em { font-style: normal; font-size: 20px; color: var(--accent); }
.t-field input, .t-field textarea {
  font: inherit;
  font-size: 15.5px;
  background: rgba(251,249,244,0.06);
  border: 1px solid rgba(251,249,244,0.2);
  padding: 13px 14px;
  color: var(--card);
  resize: vertical;
  border-radius: 0;
}
.t-field input::placeholder, .t-field textarea::placeholder { color: rgba(251,249,244,0.36); }
.t-field input:focus, .t-field textarea:focus { outline: none; border-color: var(--accent); }

.t-status { border: 0; margin: 0; padding: 0; }
.t-status legend { padding: 0 0 10px; }
.t-status > div, .t-reveal > div { display: flex; gap: 9px; flex-wrap: wrap; }
.t-chip {
  cursor: pointer;
  font: inherit;
  font-size: 14.5px;
  padding: 10px 19px;
  border: 1px solid rgba(251,249,244,0.26);
  background: transparent;
  color: rgba(251,249,244,0.78);
  transition: background 140ms ease, color 140ms ease, border-color 140ms ease;
}
.t-chip:hover { border-color: var(--card); color: var(--card); }
.t-chip.is-on { background: var(--card); border-color: var(--card); color: var(--ink); }
.t-early { margin: 11px 0 0; font-size: 21px; color: var(--mint); }

.t-reveal { display: flex; flex-direction: column; gap: 11px; }
.t-reveal > p { margin: 0; }

.t-photo {
  display: flex;
  gap: 11px;
  align-items: flex-start;
  font-size: 14.5px;
  line-height: 1.6;
  color: rgba(251,249,244,0.78);
  cursor: pointer;
}
.t-photo input { margin-top: 3px; accent-color: var(--accent); cursor: pointer; }

.t-send {
  cursor: pointer;
  align-self: flex-start;
  font-size: 17px;
  letter-spacing: 0.06em;
  padding: 14px 34px;
  border: 0;
  background: var(--accent);
  color: #FFF6F4;
  transition: transform 140ms ease, background 140ms ease;
}
.t-send:hover { background: #C8463C; transform: translateY(-2px); }

/* wall */
.t-wall { width: min(100%, 760px); }
.t-wall ul { list-style: none; margin: 16px 0 0; padding: 0; }
.t-wall li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 0;
  border-bottom: 1px solid rgba(251,249,244,0.12);
  flex-wrap: wrap;
}
.t-stub { width: 10px; height: 22px; background: var(--accent); flex: none; }
.t-wall-name { font-size: 15.5px; font-weight: 600; }
.t-wall-real { font-size: 13.5px; color: rgba(251,249,244,0.5); flex: 1; }
.t-tag {
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  padding: 4px 11px;
  background: rgba(79,178,134,0.18);
  color: var(--mint);
}
.t-tag-maybe { background: rgba(226,87,76,0.16); color: var(--accent); }
.t-tag-cant { background: rgba(251,249,244,0.1); color: rgba(251,249,244,0.6); }

@media (prefers-reduced-motion: reduce) {
  .t-root * { transition: none !important; animation: none !important; }
}
`;
