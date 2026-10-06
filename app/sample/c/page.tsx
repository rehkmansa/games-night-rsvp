"use client";

/* THROWAWAY PREVIEW — direction C "Split". Delete once a direction is picked. */

import { useState } from "react";
import { Anton, Inter } from "next/font/google";

const display = Anton({ subsets: ["latin"], weight: "400" });
const body = Inter({ subsets: ["latin"] });

const GUESTS = [
  { secret: "Aux Gremlin", status: "coming", revealed: true, real: "Rehk" },
  { secret: "Bench Philosopher", status: "coming", revealed: false },
  { secret: "Room 3B", status: "coming", revealed: true, real: "Tobi" },
  { secret: "Perpetually Late", status: "maybe", revealed: false },
  { secret: "Uni Days Witness", status: "cant", revealed: false },
];

const STATUS_LABEL: Record<string, string> = {
  coming: "In",
  maybe: "Maybe",
  cant: "Out",
};

const FACTS = [
  { n: "01", k: "Date", v: "Saturday 24 October", d: "Clear the whole afternoon." },
  { n: "02", k: "Place", v: "Within her estate", d: "She sends the exact address closer to the day." },
  { n: "03", k: "Food", v: "Handled", d: "Food and drinks are on her. Bring nothing." },
  { n: "04", k: "Plan", v: "Games, gist, pictures", d: "There's someone shooting photos and video." },
  { n: "05", k: "Deadline", v: "Saturday 17 October", d: "Tell her by then, especially if you can't come." },
];

export default function SplitSample() {
  const [status, setStatus] = useState("coming");
  const [reveal, setReveal] = useState(false);

  return (
    <div className={`s-root ${body.className}`}>
      <style>{CSS}</style>

      <aside className="s-left">
        <div className="s-left-top">
          <span className="s-mark" />
          <span className="s-kicker">Faleti Hannah</span>
        </div>

        <h1 className={`s-name ${display.className}`}>
          <span>BIRTH</span>
          <span>DAY</span>
          <span className="s-name-accent">HANG</span>
          <span className="s-name-accent">OUT</span>
        </h1>

        <div className="s-left-foot">
          <p className={`s-bigdate ${display.className}`}>24 / 10</p>
          <p className="s-left-note">Reply by 17 Oct</p>
        </div>
      </aside>

      <main className="s-right">
        <div className="s-marquee" aria-hidden="true">
          <div className={`s-marquee-track ${display.className}`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i}>RSVP BY 17 OCT — RSVP BY 17 OCT — </span>
            ))}
          </div>
        </div>

        <section className="s-facts">
          {FACTS.map((f) => (
            <article key={f.n} className="s-fact">
              <span className="s-fact-n">{f.n}</span>
              <div>
                <span className="s-fact-k">{f.k}</span>
                <h2 className={`s-fact-v ${display.className}`}>{f.v}</h2>
                <p>{f.d}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="s-secret">
          <h2 className={`s-h2 ${display.className}`}>ONE MEMORY, NO NAME ON IT</h2>
          <p>
            Sign your reply with a secret name. Hannah reads the memory, never who sent it, until
            she opens them all at once and has to work out who wrote what.
          </p>
        </section>

        <section className="s-form-wrap">
          <form onSubmit={(e) => e.preventDefault()}>
            <h2 className={`s-h2 ${display.className}`}>REPLY</h2>

            <fieldset>
              <legend>Are you coming</legend>
              <div className="s-row">
                {Object.entries(STATUS_LABEL).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setStatus(key)}
                    className={`s-chip${status === key ? " is-on" : ""} ${display.className}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {status === "cant" && (
                <p className="s-early">Thanks for saying early. That's exactly what she asked for.</p>
              )}
            </fieldset>

            <label className="s-field">
              <span>Secret name</span>
              <input placeholder="Aux Gremlin, Room 3B, Person From Church" />
            </label>

            <label className="s-field">
              <span>A memory of you and Hannah</span>
              <textarea rows={4} placeholder="She can't read it until she opens them." />
            </label>

            <fieldset>
              <legend>Should she know it&apos;s you</legend>
              <div className="s-row">
                <button
                  type="button"
                  onClick={() => setReveal(false)}
                  className={`s-chip${!reveal ? " is-on" : ""} ${display.className}`}
                >
                  No
                </button>
                <button
                  type="button"
                  onClick={() => setReveal(true)}
                  className={`s-chip${reveal ? " is-on" : ""} ${display.className}`}
                >
                  Yes
                </button>
              </div>
              {reveal && (
                <label className="s-field s-field-reveal">
                  <span>Your real name</span>
                  <input placeholder="Shown next to your secret name" />
                </label>
              )}
            </fieldset>

            <label className="s-photo">
              <input type="checkbox" />
              <span>I&apos;d rather not be in the photos or videos.</span>
            </label>

            <button type="submit" className={`s-send ${display.className}`}>
              SEND IT
            </button>
          </form>
        </section>

        <section className="s-wall">
          <h2 className={`s-h2 ${display.className}`}>{GUESTS.length} REPLIES</h2>
          <ul>
            {GUESTS.map((g) => (
              <li key={g.secret}>
                <span className={`s-wall-name ${display.className}`}>{g.secret}</span>
                <span className="s-wall-real">
                  {g.revealed ? `aka ${g.real}` : "still a mystery"}
                </span>
                <span className={`s-wall-tag s-tag-${g.status}`}>{STATUS_LABEL[g.status]}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

const CSS = `
.s-root {
  --bone: #EDEAE3;
  --ink: #101014;
  --accent: #FF3B30;
  --dim: #6F6C66;

  position: relative;
  z-index: 10;
  min-height: 100vh;
  background: var(--bone);
  color: var(--ink);
  display: grid;
  grid-template-columns: minmax(300px, 38%) 1fr;
}
@media (max-width: 860px) { .s-root { grid-template-columns: 1fr; } }

/* fixed type column */
.s-left {
  position: sticky;
  top: 0;
  align-self: start;
  height: 100svh;
  background: var(--ink);
  color: var(--bone);
  padding: clamp(20px, 2.6vw, 38px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
@media (max-width: 860px) { .s-left { position: static; height: auto; } }

.s-left-top { display: flex; align-items: center; gap: 11px; }
.s-mark { width: 10px; height: 10px; background: var(--accent); border-radius: 50%; }
.s-kicker { font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; opacity: 0.7; }

.s-name { margin: 0; display: flex; flex-direction: column; line-height: 0.84; }
.s-name span { font-size: clamp(2.6rem, 7vw, 5.4rem); letter-spacing: 0.005em; }
.s-name-accent { color: var(--accent); }

.s-left-foot { display: flex; align-items: baseline; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
.s-bigdate { margin: 0; font-size: clamp(2.2rem, 5vw, 3.6rem); }
.s-left-note { margin: 0; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); }

/* scrolling column */
.s-right { min-width: 0; }

.s-marquee { overflow: hidden; border-bottom: 1.5px solid var(--ink); padding: 11px 0; }
.s-marquee-track {
  display: flex;
  white-space: nowrap;
  font-size: 15px;
  letter-spacing: 0.1em;
  animation: s-slide 24s linear infinite;
}
@keyframes s-slide { to { transform: translateX(-50%); } }

.s-facts { border-bottom: 1.5px solid var(--ink); }
.s-fact {
  display: flex;
  gap: clamp(14px, 2.4vw, 30px);
  padding: clamp(20px, 3vw, 34px) clamp(20px, 3vw, 44px);
  border-bottom: 1px solid rgba(16,16,20,0.14);
  transition: background 220ms ease;
}
.s-fact:last-child { border-bottom: 0; }
.s-fact:hover { background: rgba(16,16,20,0.04); }
.s-fact-n { font-size: 11px; letter-spacing: 0.2em; color: var(--accent); padding-top: 5px; flex: none; }
.s-fact-k { font-size: 10.5px; letter-spacing: 0.26em; text-transform: uppercase; color: var(--dim); }
.s-fact-v { margin: 5px 0 6px; font-size: clamp(1.4rem, 3vw, 2.2rem); line-height: 1.04; }
.s-fact p { margin: 0; font-size: 14.5px; line-height: 1.6; color: var(--dim); max-width: 46ch; }

.s-secret {
  padding: clamp(26px, 4vw, 50px) clamp(20px, 3vw, 44px);
  background: var(--accent);
  color: #FFF4F3;
}
.s-h2 { margin: 0 0 12px; font-size: clamp(1.5rem, 3.4vw, 2.4rem); letter-spacing: 0.01em; }
.s-secret p { margin: 0; font-size: 15.5px; line-height: 1.7; max-width: 56ch; }

.s-form-wrap { padding: clamp(26px, 4vw, 50px) clamp(20px, 3vw, 44px); }
.s-form-wrap form { max-width: 560px; display: flex; flex-direction: column; gap: 22px; }
.s-form-wrap fieldset { border: 0; margin: 0; padding: 0; }
.s-form-wrap legend, .s-field > span {
  font-size: 10.5px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--dim);
  padding: 0 0 10px;
}
.s-field { display: flex; flex-direction: column; gap: 8px; }
.s-field > span { padding: 0; }
.s-field input, .s-field textarea {
  font: inherit;
  font-size: 16px;
  background: transparent;
  border: 0;
  border-bottom: 1.5px solid var(--ink);
  padding: 11px 2px;
  color: var(--ink);
  border-radius: 0;
  resize: vertical;
}
.s-field textarea { border: 1.5px solid var(--ink); padding: 13px; }
.s-field input::placeholder, .s-field textarea::placeholder { color: #AEAAA3; }
.s-field input:focus, .s-field textarea:focus { outline: none; border-color: var(--accent); }

.s-row { display: flex; gap: 8px; flex-wrap: wrap; }
.s-chip {
  cursor: pointer;
  font-size: 15px;
  letter-spacing: 0.06em;
  padding: 11px 24px;
  border: 1.5px solid var(--ink);
  background: transparent;
  color: var(--ink);
  transition: background 160ms ease, color 160ms ease;
}
.s-chip:hover { background: rgba(16,16,20,0.08); }
.s-chip.is-on { background: var(--ink); color: var(--bone); }
.s-early { margin: 11px 0 0; font-size: 14px; color: var(--accent); }

.s-photo {
  display: flex;
  gap: 11px;
  align-items: flex-start;
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--dim);
  cursor: pointer;
}
.s-photo input { margin-top: 3px; accent-color: var(--accent); cursor: pointer; }

.s-send {
  cursor: pointer;
  align-self: flex-start;
  font-size: 18px;
  letter-spacing: 0.08em;
  padding: 15px 40px;
  border: 0;
  background: var(--accent);
  color: #FFF4F3;
  transition: background 160ms ease;
}
.s-send:hover { background: #D92B21; }

.s-wall { padding: clamp(26px, 4vw, 50px) clamp(20px, 3vw, 44px) clamp(50px, 7vw, 90px); border-top: 1.5px solid var(--ink); }
.s-wall ul { list-style: none; margin: 16px 0 0; padding: 0; }
.s-wall li {
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 15px 0;
  border-bottom: 1px solid rgba(16,16,20,0.14);
  flex-wrap: wrap;
}
.s-wall-name { font-size: clamp(1.05rem, 2vw, 1.3rem); }
.s-wall-real { flex: 1; font-size: 13px; color: var(--dim); }
.s-wall-tag {
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 4px 11px;
  border: 1.5px solid var(--ink);
}
.s-tag-coming { background: var(--ink); color: var(--bone); }
.s-tag-cant { border-style: dashed; color: var(--dim); }

@media (prefers-reduced-motion: reduce) {
  .s-root *, .s-marquee-track { animation: none !important; transition: none !important; }
}
`;
