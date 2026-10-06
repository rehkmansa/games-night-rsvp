"use client";

/* THROWAWAY PREVIEW — hangout direction D "Postcard". Delete once a direction is picked. */

import { useState } from "react";
import { Courier_Prime, Caveat } from "next/font/google";

const type = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"] });
const hand = Caveat({ subsets: ["latin"] });

const GUESTS = [
  { secret: "Bench Philosopher", status: "coming", revealed: false },
  { secret: "Aux Gremlin", status: "coming", revealed: true, real: "Rehk" },
  { secret: "Brings The Watermelon", status: "coming", revealed: false },
  { secret: "Perpetually Late", status: "maybe", revealed: false },
  { secret: "Room 3B", status: "coming", revealed: true, real: "Tobi" },
  { secret: "Uni Days Witness", status: "cant", revealed: false },
];

const STATUS_LABEL: Record<string, string> = {
  coming: "coming",
  maybe: "maybe",
  cant: "can't",
};

function Stamp({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="d-stamp">
      <div className="d-stamp-inner">
        <span className={`d-stamp-label ${type.className}`}>{label}</span>
        <span className={`d-stamp-sub ${type.className}`}>{sub}</span>
      </div>
    </div>
  );
}

export default function PostcardSample() {
  const [status, setStatus] = useState("coming");
  const [reveal, setReveal] = useState(false);

  return (
    <div className={`d-root ${type.className}`}>
      <style>{CSS}</style>

      {/* front of the card */}
      <section className="d-card d-front">
        <div className="d-tape d-tape-1" aria-hidden="true" />
        <div className="d-tape d-tape-2" aria-hidden="true" />

        <p className={`d-from ${type.className}`}>A POSTCARD FROM A DAY THAT HASN'T HAPPENED YET</p>

        <h1 className={`d-title ${hand.className}`}>
          Hannah&apos;s
          <span>birthday hangout</span>
        </h1>

        <p className="d-blurb">
          Food, drinks, games and gist, all handled. Just tell her early if you can't make it,
          because she's counting heads.
        </p>

        <div className="d-postmark" aria-hidden="true">
          <span className={type.className}>DATE</span>
          <span className={`d-postmark-big ${type.className}`}>TBC</span>
          <span className={type.className}>PLACE TBC</span>
        </div>
      </section>

      {/* address block details */}
      <section className="d-details">
        <div className="d-lines">
          <div className="d-line">
            <span className={`d-line-label ${type.className}`}>DATE</span>
            <span className={`d-line-fill ${hand.className}`}>saturday 24 october</span>
          </div>
          <div className="d-line">
            <span className={`d-line-label ${type.className}`}>PLACE</span>
            <span className={`d-line-fill ${hand.className}`}>her estate, address to follow</span>
          </div>
          <div className="d-line">
            <span className={`d-line-label ${type.className}`}>FOOD</span>
            <span className={`d-line-fill ${hand.className}`}>food and drinks are sorted</span>
          </div>
          <div className="d-line">
            <span className={`d-line-label ${type.className}`}>PLAN</span>
            <span className={`d-line-fill ${hand.className}`}>reply by sat 17 october</span>
          </div>
        </div>

        <div className="d-stamps">
          <Stamp label="RSVP" sub="now" />
          <Stamp label="BYO" sub="anything" />
        </div>
      </section>

      {/* the mechanic */}
      <section className="d-note">
        <div className="d-tape d-tape-3" aria-hidden="true" />
        <h2 className={`d-h2 ${type.className}`}>THE SECRET QUESTION</h2>
        <p>
          Every reply carries a memory of you and Hannah, signed with a secret name. She sees the
          memory, never who sent it.
        </p>
        <p className={`d-note-hand ${hand.className}`}>
          she opens them all at once and has to guess every single one
        </p>
      </section>

      {/* reply card */}
      <section className="d-reply">
        <form className="d-card d-back" onSubmit={(e) => e.preventDefault()}>
          <div className="d-back-grid">
            <div className="d-message">
              <p className={`d-back-head ${type.className}`}>YOUR REPLY</p>

              <label className="d-field">
                <span>SECRET NAME</span>
                <input placeholder="Bench Philosopher" />
                <em className={hand.className}>this is all she sees</em>
              </label>

              <label className="d-field">
                <span>A MEMORY OF YOU AND HANNAH</span>
                <textarea rows={5} placeholder="She can't read it until the hangout." />
              </label>
            </div>

            <div className="d-side">
              <div className="d-stamp-slot">
                <Stamp label="SEAL" sub="until the day" />
              </div>

              <fieldset className="d-status">
                <legend>ARE YOU COMING</legend>
                <div>
                  {Object.entries(STATUS_LABEL).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setStatus(key)}
                      className={`d-check${status === key ? " is-on" : ""}`}
                    >
                      <span className="d-box" aria-hidden="true">
                        ×
                      </span>
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="d-reveal">
                <p>SHOULD SHE KNOW IT'S YOU?</p>
                <div>
                  <button
                    type="button"
                    onClick={() => setReveal(false)}
                    className={`d-check${!reveal ? " is-on" : ""}`}
                  >
                    <span className="d-box" aria-hidden="true">
                      ×
                    </span>
                    no
                  </button>
                  <button
                    type="button"
                    onClick={() => setReveal(true)}
                    className={`d-check${reveal ? " is-on" : ""}`}
                  >
                    <span className="d-box" aria-hidden="true">
                      ×
                    </span>
                    yes
                  </button>
                </div>
                {reveal && (
                  <label className="d-field d-field-reveal">
                    <span>REAL NAME</span>
                    <input placeholder="Beside your secret name" />
                  </label>
                )}
              </div>
            </div>
          </div>

          <label className="d-photo">
            <input type="checkbox" />
            <span>
              Someone will be taking photos and videos. Tick this if you&apos;d rather not be in
              them.
            </span>
          </label>

          <button type="submit" className={`d-submit ${type.className}`}>
            POST IT
          </button>
        </form>
      </section>

      {/* pile of replies */}
      <section className="d-pile">
        <h2 className={`d-h2 d-pile-head ${type.className}`}>
          {GUESTS.length} REPLIES, ALL SEALED
        </h2>

        <ul className="d-cards">
          {GUESTS.map((g, i) => (
            <li key={g.secret} className={`d-mini d-mini-${i % 3}`}>
              <div className="d-mini-stamp" aria-hidden="true" />
              <p className={`d-mini-name ${hand.className}`}>{g.secret}</p>
              <p className={`d-mini-real ${type.className}`}>
                {g.revealed ? `SIGNED ${g.real?.toUpperCase()}` : "UNSIGNED"}
              </p>
              <div className="d-mini-lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span className={`d-mini-tag d-tag-${g.status} ${type.className}`}>
                {STATUS_LABEL[g.status]}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <footer className={`d-foot ${hand.className}`}>
        <p>see you on the grass, whenever that turns out to be</p>
      </footer>
    </div>
  );
}

const CSS = `
.d-root {
  --desk: #6E6152;
  --paper: #F4EDDD;
  --kraft: #E2D0AE;
  --ink: #2E2A24;
  --soft: #7C7263;
  --red: #B23A2E;
  --blue: #3A5A8C;

  position: relative;
  z-index: 10;
  min-height: 100vh;
  background-color: var(--desk);
  background-image:
    repeating-linear-gradient(91deg, rgba(0,0,0,0.05) 0 3px, transparent 3px 9px),
    radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.14) 0%, transparent 60%);
  color: var(--ink);
  padding: clamp(24px, 5vw, 56px) 20px 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(24px, 4vw, 44px);
}

.d-card {
  position: relative;
  width: min(100%, 820px);
  background: var(--paper);
  box-shadow: 0 18px 34px -18px rgba(0,0,0,0.6);
  border: 1px solid rgba(46,42,36,0.18);
}

/* front */
.d-front {
  padding: clamp(30px, 5vw, 52px) clamp(22px, 4vw, 48px) clamp(34px, 5vw, 56px);
  background:
    repeating-linear-gradient(45deg, rgba(178,58,46,0.05) 0 10px, transparent 10px 20px),
    var(--paper);
}
.d-from {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.22em;
  color: var(--soft);
}
.d-title {
  margin: 12px 0 0;
  display: flex;
  flex-direction: column;
  line-height: 0.86;
  color: var(--ink);
  font-size: clamp(56px, 13vw, 122px);
}
.d-title span { color: var(--red); font-size: clamp(40px, 9.5vw, 92px); }
.d-blurb {
  margin: clamp(20px, 3vw, 28px) 0 0;
  max-width: 48ch;
  font-size: 14px;
  line-height: 1.85;
  color: #4A443B;
}
.d-postmark {
  position: absolute;
  top: clamp(18px, 3vw, 34px);
  right: clamp(18px, 3vw, 40px);
  width: clamp(96px, 15vw, 132px);
  aspect-ratio: 1;
  border: 3px double var(--blue);
  border-radius: 50%;
  color: var(--blue);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  transform: rotate(-11deg);
  opacity: 0.85;
}
.d-postmark span { font-size: 10px; letter-spacing: 0.18em; }
.d-postmark-big { font-size: clamp(24px, 4vw, 34px) !important; letter-spacing: 0.06em !important; font-weight: 700; }

/* tape */
.d-tape {
  position: absolute;
  width: 96px;
  height: 26px;
  background: rgba(226,208,174,0.85);
  border-left: 1px dashed rgba(46,42,36,0.25);
  border-right: 1px dashed rgba(46,42,36,0.25);
}
.d-tape-1 { top: -12px; left: 6%; transform: rotate(-5deg); }
.d-tape-2 { bottom: -12px; right: 9%; transform: rotate(4deg); }
.d-tape-3 { top: -13px; left: 30px; transform: rotate(-3deg); }

/* details */
.d-details {
  width: min(100%, 820px);
  display: grid;
  grid-template-columns: 1fr auto;
  gap: clamp(18px, 3vw, 34px);
  align-items: start;
  background: var(--kraft);
  padding: clamp(22px, 4vw, 34px);
  box-shadow: 0 18px 34px -18px rgba(0,0,0,0.55);
}
@media (max-width: 640px) { .d-details { grid-template-columns: 1fr; } }
.d-lines { display: flex; flex-direction: column; gap: 14px; }
.d-line { display: flex; align-items: baseline; gap: 14px; }
.d-line-label {
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--soft);
  min-width: 62px;
  flex: none;
}
.d-line-fill {
  flex: 1;
  font-size: clamp(22px, 3.2vw, 28px);
  color: var(--ink);
  border-bottom: 1px dashed rgba(46,42,36,0.4);
  line-height: 1.5;
}
.d-stamps { display: flex; gap: 10px; }

.d-stamp {
  width: 84px;
  padding: 5px;
  background: var(--paper);
  filter: drop-shadow(0 2px 3px rgba(0,0,0,0.25));
  clip-path: polygon(
    0% 4%, 4% 0%, 8% 4%, 12% 0%, 16% 4%, 20% 0%, 24% 4%, 28% 0%, 32% 4%, 36% 0%, 40% 4%,
    44% 0%, 48% 4%, 52% 0%, 56% 4%, 60% 0%, 64% 4%, 68% 0%, 72% 4%, 76% 0%, 80% 4%, 84% 0%,
    88% 4%, 92% 0%, 96% 4%, 100% 0%, 100% 100%, 0% 100%
  );
}
.d-stamp-inner {
  border: 1.5px solid var(--red);
  padding: 12px 6px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.d-stamp-label { font-size: 17px; font-weight: 700; color: var(--red); letter-spacing: 0.06em; }
.d-stamp-sub { font-size: 9px; letter-spacing: 0.14em; color: var(--soft); }

/* note */
.d-note {
  position: relative;
  width: min(100%, 820px);
  background: #FFFBF0;
  padding: clamp(22px, 4vw, 34px);
  transform: rotate(-0.7deg);
  box-shadow: 0 14px 26px -16px rgba(0,0,0,0.55);
}
.d-h2 { margin: 0 0 10px; font-size: clamp(16px, 2.4vw, 20px); letter-spacing: 0.2em; font-weight: 700; }
.d-note p { margin: 0 0 8px; font-size: 14px; line-height: 1.85; color: #4A443B; }
.d-note-hand { font-size: 25px !important; color: var(--red); line-height: 1.3 !important; }

/* reply card */
.d-reply { width: min(100%, 820px); }
.d-back { padding: clamp(22px, 4vw, 38px); }
.d-back-grid {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: clamp(20px, 4vw, 38px);
}
@media (max-width: 700px) { .d-back-grid { grid-template-columns: 1fr; } }
.d-side { border-left: 1px dashed rgba(46,42,36,0.35); padding-left: clamp(16px, 3vw, 28px); display: flex; flex-direction: column; gap: 18px; }
@media (max-width: 700px) { .d-side { border-left: 0; padding-left: 0; border-top: 1px dashed rgba(46,42,36,0.35); padding-top: 20px; } }
.d-stamp-slot { display: flex; justify-content: flex-end; }
@media (max-width: 700px) { .d-stamp-slot { justify-content: flex-start; } }

.d-back-head { margin: 0 0 16px; font-size: 12px; letter-spacing: 0.24em; color: var(--soft); }
.d-message { display: flex; flex-direction: column; gap: 18px; }
.d-field { display: flex; flex-direction: column; gap: 6px; }
.d-field > span, .d-status legend, .d-reveal > p {
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--soft);
}
.d-field em { font-style: normal; font-size: 19px; color: var(--red); }
.d-field input, .d-field textarea {
  font: inherit;
  font-size: 14px;
  background: transparent;
  border: 0;
  border-bottom: 1px solid rgba(46,42,36,0.45);
  padding: 8px 2px;
  color: var(--ink);
  border-radius: 0;
  resize: vertical;
}
.d-field textarea {
  background:
    repeating-linear-gradient(180deg, transparent 0 27px, rgba(46,42,36,0.28) 27px 28px);
  border-bottom: 0;
  line-height: 28px;
  padding: 0 2px;
}
.d-field input::placeholder, .d-field textarea::placeholder { color: #A79C8B; }
.d-field input:focus, .d-field textarea:focus { outline: none; border-color: var(--red); }

.d-status { border: 0; margin: 0; padding: 0; }
.d-status legend { padding: 0 0 10px; }
.d-status > div, .d-reveal > div { display: flex; gap: 14px; flex-wrap: wrap; }
.d-check {
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  letter-spacing: 0.1em;
  background: transparent;
  border: 0;
  padding: 0;
  color: var(--soft);
  display: inline-flex;
  align-items: center;
  gap: 7px;
}
.d-check:hover { color: var(--ink); }
.d-box {
  width: 17px;
  height: 17px;
  border: 1.5px solid var(--ink);
  display: grid;
  place-items: center;
  font-size: 13px;
  color: transparent;
  line-height: 1;
}
.d-check.is-on { color: var(--ink); font-weight: 700; }
.d-check.is-on .d-box { color: var(--red); }

.d-reveal { display: flex; flex-direction: column; gap: 10px; }
.d-reveal > p { margin: 0; }

.d-photo {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-top: 18px;
  font-size: 12px;
  line-height: 1.65;
  color: #4A443B;
  cursor: pointer;
}
.d-photo input { margin-top: 2px; accent-color: var(--red); cursor: pointer; }

.d-submit {
  cursor: pointer;
  margin-top: clamp(20px, 3vw, 30px);
  font-size: 15px;
  letter-spacing: 0.24em;
  font-weight: 700;
  padding: 14px 32px;
  border: 1.5px solid var(--ink);
  background: var(--ink);
  color: var(--paper);
  transition: background 140ms ease;
}
.d-submit:hover { background: var(--red); border-color: var(--red); }

/* pile */
.d-pile { width: min(100%, 1000px); }
.d-pile-head { color: var(--paper); text-align: center; margin-bottom: 20px; }
.d-cards {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 16px;
}
.d-mini {
  position: relative;
  background: var(--paper);
  padding: 16px 16px 18px;
  box-shadow: 0 12px 24px -14px rgba(0,0,0,0.6);
  transition: transform 170ms ease;
}
.d-mini-0 { transform: rotate(-1.2deg); }
.d-mini-1 { transform: rotate(1deg); }
.d-mini-2 { transform: rotate(-0.4deg); }
.d-mini:hover { transform: rotate(0deg) translateY(-3px); }
.d-mini-stamp {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 26px;
  height: 30px;
  border: 1.5px dashed var(--red);
  opacity: 0.7;
}
.d-mini-name { margin: 0; font-size: 23px; line-height: 1.1; padding-right: 34px; }
.d-mini-real { margin: 4px 0 0; font-size: 9.5px; letter-spacing: 0.16em; color: var(--soft); }
.d-mini-lines { margin-top: 14px; display: flex; flex-direction: column; gap: 7px; }
.d-mini-lines span { height: 1px; background: rgba(46,42,36,0.22); }
.d-mini-lines span:last-child { width: 55%; }
.d-mini-tag {
  display: inline-block;
  margin-top: 14px;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 3px 10px;
  border: 1px solid var(--ink);
  color: var(--ink);
}
.d-tag-maybe { border-color: var(--red); color: var(--red); }
.d-tag-cant { border-style: dashed; color: var(--soft); border-color: var(--soft); }

.d-foot { text-align: center; }
.d-foot p { margin: 0; font-size: 28px; color: var(--paper); transform: rotate(-1deg); }

@media (prefers-reduced-motion: reduce) {
  .d-root * { transition: none !important; animation: none !important; }
}
`;
