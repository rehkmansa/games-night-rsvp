"use client";

/* THROWAWAY PREVIEW — picnic direction A "Memory Board". Delete once a direction is picked. */

import { useState } from "react";
import { Bricolage_Grotesque, Caveat, Work_Sans } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"] });
const hand = Caveat({ subsets: ["latin"] });
const body = Work_Sans({ subsets: ["latin"] });

const GUESTS = [
  { secret: "Bench Philosopher", status: "coming", revealed: false },
  { secret: "Aux Gremlin", status: "coming", revealed: true, real: "Rehk" },
  { secret: "Brings The Watermelon", status: "coming", revealed: false },
  { secret: "Perpetually Late", status: "maybe", revealed: false },
  { secret: "Room 3B", status: "coming", revealed: true, real: "Tobi" },
  { secret: "Uni Days Witness", status: "cant", revealed: false },
];

const STATUS_LABEL: Record<string, string> = {
  coming: "I'm in",
  maybe: "Maybe",
  cant: "Can't",
};

function Squiggle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 20" aria-hidden="true">
      <path d="M4 14 C34 2, 64 22, 96 10 C128 -2, 160 18, 196 6" />
    </svg>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 80" aria-hidden="true">
      <path d="M6 8 C40 4, 84 20, 96 60" />
      <path d="M84 46 L98 66 L108 44" />
    </svg>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 4 C56 36, 64 44, 96 50 C64 56, 56 64, 50 96 C44 64, 36 56, 4 50 C36 44, 44 36, 50 4 Z" />
    </svg>
  );
}

export default function BoardSample() {
  const [status, setStatus] = useState("coming");
  const [reveal, setReveal] = useState(false);

  return (
    <div className={`b-root ${body.className}`}>
      <style>{CSS}</style>

      <div className="b-sheet">
        {/* headline scrap */}
        <div className="b-scrap b-scrap-title">
          <span className="b-tape b-tape-a" aria-hidden="true" />
          <span className="b-tape b-tape-b" aria-hidden="true" />
          <p className={`b-over ${hand.className}`}>keep your afternoon free</p>
          <h1 className={`b-title ${display.className}`}>
            Meera&apos;s
            <span>birthday picnic</span>
          </h1>
          <Squiggle className="b-squiggle" />
        </div>

        <Star className="b-star b-star-1" />
        <Star className="b-star b-star-2" />

        {/* colour tiles standing in for photos */}
        <div className="b-tiles">
          <figure className="b-tile b-tile-1">
            <div className="b-tile-img" aria-hidden="true" />
            <figcaption className={hand.className}>the grass</figcaption>
          </figure>
          <figure className="b-tile b-tile-2">
            <div className="b-tile-img" aria-hidden="true" />
            <figcaption className={hand.className}>the food</figcaption>
          </figure>
          <figure className="b-tile b-tile-3">
            <div className="b-tile-img" aria-hidden="true" />
            <figcaption className={hand.className}>the noise</figcaption>
          </figure>
        </div>

        {/* pinned facts */}
        <div className="b-facts">
          <div className="b-fact b-fact-open">
            <span className="b-k">when</span>
            <strong className={display.className}>Not sorted yet</strong>
            <p>A Saturday. We're still arguing about which one.</p>
            <span className={`b-scribble ${hand.className}`}>we'll text you</span>
          </div>

          <div className="b-fact b-fact-open">
            <span className="b-k">where</span>
            <strong className={display.className}>Not sorted yet</strong>
            <p>Somewhere green with shade and room to spread out.</p>
            <Arrow className="b-arrow" />
          </div>

          <div className="b-fact">
            <span className="b-k">bring</span>
            <strong className={display.className}>Something</strong>
            <p>It's a potluck. Food, drink, a mat, a speaker, a game.</p>
          </div>

          <div className="b-fact">
            <span className="b-k">expect</span>
            <strong className={display.className}>Games</strong>
            <p>Yes, you're playing. Everyone plays.</p>
          </div>
        </div>

        {/* the mechanic, as a torn note */}
        <div className="b-torn">
          <h2 className={`b-h2 ${display.className}`}>Everyone leaves one memory</h2>
          <p>
            You leave a memory of the two of you, signed with a secret name. Meera sees the memory,
            never who sent it.
          </p>
          <p className={`b-torn-hand ${hand.className}`}>
            they all open on the day and she has to guess every single one
          </p>
        </div>

        {/* form */}
        <form className="b-form" onSubmit={(e) => e.preventDefault()}>
          <span className="b-tape b-tape-c" aria-hidden="true" />
          <h2 className={`b-h2 ${display.className}`}>Add yourself</h2>

          <label className="b-field">
            <span>Your secret name</span>
            <input placeholder="Bench Philosopher, Room 3B, Aux Gremlin" />
            <em className={hand.className}>this is all she sees</em>
          </label>

          <fieldset className="b-status">
            <legend>Are you coming</legend>
            <div>
              {Object.entries(STATUS_LABEL).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setStatus(key)}
                  className={`b-pill${status === key ? " is-on" : ""}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="b-field">
            <span>A memory of you and Meera</span>
            <textarea rows={4} placeholder="The one you still bring up. She can't read it until the picnic." />
          </label>

          <div className="b-reveal">
            <p>Should she know it's you?</p>
            <div>
              <button
                type="button"
                onClick={() => setReveal(false)}
                className={`b-pill${!reveal ? " is-on" : ""}`}
              >
                Keep me a mystery
              </button>
              <button
                type="button"
                onClick={() => setReveal(true)}
                className={`b-pill${reveal ? " is-on" : ""}`}
              >
                Fine, tell her
              </button>
            </div>
            {reveal && (
              <label className="b-field b-field-reveal">
                <span>Your real name</span>
                <input placeholder="Shown next to your secret name on the day" />
              </label>
            )}
          </div>

          <button type="submit" className={`b-submit ${display.className}`}>
            Pin it up
          </button>
        </form>

        {/* wall */}
        <div className="b-wall">
          <h2 className={`b-h2 b-wall-h2 ${display.className}`}>
            {GUESTS.length} pinned so far
            <span className={hand.className}>all sealed</span>
          </h2>

          <ul className="b-notes">
            {GUESTS.map((g, i) => (
              <li key={g.secret} className={`b-note b-note-${i % 4}`}>
                <span className="b-tape b-tape-note" aria-hidden="true" />
                <p className={`b-note-name ${display.className}`}>{g.secret}</p>
                <p className={`b-note-real ${hand.className}`}>
                  {g.revealed ? `aka ${g.real}` : "still a mystery"}
                </p>
                <div className="b-note-lines" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <span className={`b-tag b-tag-${g.status}`}>{STATUS_LABEL[g.status]}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className={`b-foot ${hand.className}`}>see you on the grass</p>
      </div>
    </div>
  );
}

const CSS = `
.b-root {
  --cream: #FFF7F0;
  --card: #FFFFFF;
  --coral: #FF6B4A;
  --sun: #FFB020;
  --rasp: #E8355F;
  --plum: #A63D8F;
  --ink: #241A17;
  --soft: #8C7A72;

  position: relative;
  z-index: 10;
  min-height: 100vh;
  background:
    radial-gradient(60% 40% at 12% 4%, rgba(255,176,32,0.22) 0%, transparent 62%),
    radial-gradient(50% 36% at 92% 22%, rgba(232,53,95,0.16) 0%, transparent 60%),
    radial-gradient(50% 40% at 70% 92%, rgba(166,61,143,0.14) 0%, transparent 62%),
    var(--cream);
  color: var(--ink);
  overflow-x: hidden;
  padding: clamp(24px, 5vw, 56px) 20px 80px;
}
.b-sheet { position: relative; max-width: 900px; margin: 0 auto; }

/* shared paper bits */
.b-tape {
  position: absolute;
  width: 92px;
  height: 26px;
  background: rgba(255,176,32,0.55);
  box-shadow: 0 1px 0 rgba(36,26,23,0.08);
}
.b-tape-a { top: -13px; left: 8%; transform: rotate(-6deg); }
.b-tape-b { top: -11px; right: 10%; transform: rotate(5deg); background: rgba(255,107,74,0.5); }
.b-tape-c { top: -13px; left: 50%; margin-left: -46px; transform: rotate(-2deg); }
.b-tape-note { top: -12px; left: 16px; width: 62px; height: 20px; transform: rotate(-7deg); }

/* title scrap */
.b-scrap-title {
  position: relative;
  background: var(--card);
  padding: clamp(26px, 4vw, 42px) clamp(20px, 4vw, 40px) clamp(30px, 4vw, 44px);
  transform: rotate(-0.8deg);
  box-shadow: 0 12px 26px -18px rgba(36,26,23,0.5);
  clip-path: polygon(0 2%, 6% 0, 14% 2%, 23% 0, 33% 2%, 44% 0, 55% 2%, 66% 0, 76% 2%, 86% 0, 94% 2%, 100% 0,
    100% 98%, 93% 100%, 84% 98%, 74% 100%, 63% 98%, 52% 100%, 41% 98%, 30% 100%, 20% 98%, 10% 100%, 0 98%);
}
.b-over { margin: 0; font-size: clamp(22px, 3vw, 28px); color: var(--coral); transform: rotate(-1.5deg); }
.b-title {
  margin: 6px 0 0;
  display: flex;
  flex-direction: column;
  line-height: 0.92;
  font-size: clamp(40px, 8.6vw, 84px);
  letter-spacing: -0.03em;
  font-weight: 800;
}
.b-title span { color: var(--rasp); }
.b-squiggle { display: block; width: min(320px, 70%); height: 18px; margin-top: 14px; }
.b-squiggle path { fill: none; stroke: var(--sun); stroke-width: 4; stroke-linecap: round; }

.b-star { position: absolute; width: 34px; height: 34px; }
.b-star-1 { top: -6px; right: 2%; fill: var(--sun); }
.b-star-2 { top: 20%; left: -14px; fill: var(--plum); width: 22px; height: 22px; }
@media (max-width: 760px) { .b-star { display: none; } }

/* colour tiles */
.b-tiles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 18px;
  margin-top: clamp(26px, 4vw, 40px);
}
.b-tile {
  margin: 0;
  background: var(--card);
  padding: 10px 10px 6px;
  box-shadow: 0 10px 22px -16px rgba(36,26,23,0.55);
  transition: transform 170ms ease;
}
.b-tile-1 { transform: rotate(-2deg); }
.b-tile-2 { transform: rotate(1.4deg); margin-top: 14px; }
.b-tile-3 { transform: rotate(-1deg); }
.b-tile:hover { transform: rotate(0deg) translateY(-4px); }
.b-tile-img { height: clamp(96px, 13vw, 128px); }
.b-tile-1 .b-tile-img { background: linear-gradient(150deg, var(--sun), var(--coral)); }
.b-tile-2 .b-tile-img { background: linear-gradient(150deg, var(--coral), var(--rasp)); }
.b-tile-3 .b-tile-img { background: linear-gradient(150deg, var(--rasp), var(--plum)); }
.b-tile figcaption { font-size: 22px; color: var(--soft); padding: 6px 2px 0; }

/* facts */
.b-facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 16px;
  margin-top: clamp(30px, 4vw, 46px);
}
.b-fact {
  position: relative;
  background: var(--card);
  padding: 18px 16px 16px;
  box-shadow: 0 10px 22px -16px rgba(36,26,23,0.5);
  border-top: 5px solid var(--sun);
}
.b-fact:nth-child(2) { border-top-color: var(--coral); transform: rotate(0.8deg); }
.b-fact:nth-child(3) { border-top-color: var(--rasp); transform: rotate(-0.7deg); }
.b-fact:nth-child(4) { border-top-color: var(--plum); }
.b-k { font-size: 10.5px; font-weight: 700; letter-spacing: 0.26em; text-transform: uppercase; color: var(--soft); }
.b-fact strong { display: block; margin-top: 5px; font-size: clamp(21px, 2.8vw, 26px); line-height: 1.1; font-weight: 800; }
.b-fact p { margin: 6px 0 0; font-size: 13.5px; line-height: 1.6; color: var(--soft); }
.b-fact-open strong { color: var(--rasp); }
.b-fact-open { padding-bottom: 34px; }
.b-scribble {
  position: absolute;
  right: 10px;
  bottom: 6px;
  font-size: 21px;
  color: var(--coral);
  transform: rotate(-6deg);
}
.b-arrow { position: absolute; right: -18px; bottom: -22px; width: 56px; height: 40px; }
.b-arrow path { fill: none; stroke: var(--plum); stroke-width: 3; stroke-linecap: round; }
@media (max-width: 760px) { .b-arrow { display: none; } }

/* torn note */
.b-torn {
  margin-top: clamp(34px, 5vw, 52px);
  background: var(--ink);
  color: var(--cream);
  padding: clamp(24px, 4vw, 38px);
  transform: rotate(0.5deg);
  clip-path: polygon(0 3%, 8% 0, 18% 3%, 29% 0, 40% 3%, 51% 0, 62% 3%, 73% 0, 84% 3%, 93% 0, 100% 3%,
    100% 97%, 92% 100%, 82% 97%, 71% 100%, 60% 97%, 49% 100%, 38% 97%, 27% 100%, 16% 97%, 7% 100%, 0 97%);
}
.b-h2 { margin: 0 0 10px; font-size: clamp(23px, 3.6vw, 32px); font-weight: 800; letter-spacing: -0.02em; }
.b-torn p { margin: 0 0 8px; font-size: 15.5px; line-height: 1.75; max-width: 58ch; color: rgba(255,247,240,0.86); }
.b-torn b { color: var(--sun); }
.b-torn-hand { font-size: 24px !important; color: var(--sun); }

/* form */
.b-form {
  position: relative;
  margin: clamp(34px, 5vw, 54px) auto 0;
  width: min(100%, 600px);
  background: var(--card);
  padding: clamp(26px, 4vw, 38px);
  box-shadow: 0 16px 34px -22px rgba(36,26,23,0.6);
  display: flex;
  flex-direction: column;
  gap: 20px;
  transform: rotate(-0.4deg);
}
.b-field { display: flex; flex-direction: column; gap: 6px; }
.b-field > span, .b-status legend, .b-reveal > p {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--soft);
}
.b-field em { font-style: normal; font-size: 21px; color: var(--coral); }
.b-field input, .b-field textarea {
  font: inherit;
  font-size: 15.5px;
  background: #FFFBF7;
  border: 0;
  border-bottom: 2px solid rgba(36,26,23,0.28);
  padding: 11px 4px;
  color: var(--ink);
  resize: vertical;
  border-radius: 0;
}
.b-field textarea {
  border: 2px solid rgba(36,26,23,0.28);
  padding: 12px;
}
.b-field input::placeholder, .b-field textarea::placeholder { color: #BFAFA7; }
.b-field input:focus, .b-field textarea:focus { outline: none; border-color: var(--coral); background: #FFF; }

.b-status { border: 0; margin: 0; padding: 0; }
.b-status legend { padding: 0 0 10px; }
.b-status > div, .b-reveal > div { display: flex; gap: 9px; flex-wrap: wrap; }
.b-pill {
  cursor: pointer;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 999px;
  border: 2px solid rgba(36,26,23,0.3);
  background: transparent;
  color: var(--soft);
  transition: background 140ms ease, color 140ms ease, border-color 140ms ease;
}
.b-pill:hover { border-color: var(--ink); color: var(--ink); }
.b-pill.is-on { background: var(--coral); border-color: var(--coral); color: #FFF; }

.b-reveal {
  border: 2px dashed rgba(36,26,23,0.3);
  padding: 16px;
  background: rgba(255,176,32,0.12);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.b-reveal > p { margin: 0; }

.b-submit {
  cursor: pointer;
  align-self: flex-start;
  font-size: 18px;
  font-weight: 800;
  padding: 13px 32px;
  border-radius: 999px;
  border: 0;
  background: var(--ink);
  color: var(--cream);
  transition: transform 140ms ease, background 140ms ease;
}
.b-submit:hover { background: var(--rasp); transform: translateY(-2px); }

/* wall */
.b-wall { margin-top: clamp(36px, 5vw, 58px); }
.b-wall-h2 { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; }
.b-wall-h2 span { font-size: 23px; font-weight: 400; color: var(--coral); }
.b-notes {
  list-style: none;
  margin: 20px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(215px, 1fr));
  gap: 18px;
}
.b-note {
  position: relative;
  background: var(--card);
  padding: 22px 16px 16px;
  box-shadow: 0 10px 22px -16px rgba(36,26,23,0.5);
  transition: transform 170ms ease;
}
.b-note-0 { transform: rotate(-1.4deg); }
.b-note-1 { transform: rotate(1.1deg); }
.b-note-2 { transform: rotate(-0.5deg); }
.b-note-3 { transform: rotate(1.7deg); }
.b-note:hover { transform: rotate(0deg) translateY(-4px); }
.b-note-name { margin: 0; font-size: 17px; font-weight: 800; line-height: 1.2; }
.b-note-real { margin: 2px 0 0; font-size: 20px; color: var(--plum); }
.b-note-lines { margin: 12px 0 0; display: flex; flex-direction: column; gap: 7px; }
.b-note-lines span { height: 7px; border-radius: 999px; background: rgba(36,26,23,0.1); }
.b-note-lines span:nth-child(2) { width: 82%; }
.b-note-lines span:nth-child(3) { width: 54%; }
.b-tag {
  display: inline-block;
  margin-top: 14px;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 4px 11px;
  border-radius: 999px;
  background: var(--sun);
  color: var(--ink);
}
.b-tag-maybe { background: var(--coral); color: #FFF; }
.b-tag-cant { background: #EFE3DC; color: var(--soft); }

.b-foot {
  margin: clamp(34px, 5vw, 54px) 0 0;
  text-align: center;
  font-size: clamp(26px, 3.6vw, 34px);
  color: var(--coral);
  transform: rotate(-1deg);
}

@media (prefers-reduced-motion: reduce) {
  .b-root * { transition: none !important; animation: none !important; }
}
`;
