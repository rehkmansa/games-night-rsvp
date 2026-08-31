"use client";

/* THROWAWAY PREVIEW — picnic direction C "Risograph". Delete once a direction is picked. */

import { useState } from "react";
import { Archivo_Black, Space_Mono } from "next/font/google";

const display = Archivo_Black({ subsets: ["latin"], weight: "400" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

const GUESTS = [
  { secret: "Bench Philosopher", status: "coming", revealed: false },
  { secret: "Aux Gremlin", status: "coming", revealed: true, real: "Rehk" },
  { secret: "Brings The Watermelon", status: "coming", revealed: false },
  { secret: "Perpetually Late", status: "maybe", revealed: false },
  { secret: "Room 3B", status: "coming", revealed: true, real: "Tobi" },
  { secret: "Uni Days Witness", status: "cant", revealed: false },
];

const STATUS_LABEL: Record<string, string> = {
  coming: "in",
  maybe: "maybe",
  cant: "out",
};

const FACTS = [
  { k: "01", head: "Date", value: "Not yet", note: "it'll be a saturday, we're still picking." },
  { k: "02", head: "Spot", value: "Not yet", note: "somewhere green. we'll send the pin." },
  { k: "03", head: "Food", value: "Potluck", note: "everyone brings something." },
  { k: "04", head: "Plan", value: "Games", note: "yes, you're playing." },
];

export default function RisoSample() {
  const [status, setStatus] = useState("coming");
  const [reveal, setReveal] = useState(false);

  return (
    <div className={`r-root ${mono.className}`}>
      <style>{CSS}</style>

      <div className="r-grain" aria-hidden="true" />

      <header className="r-hero">
        <div className="r-shapes" aria-hidden="true">
          <svg className="r-wedge" viewBox="0 0 200 120" preserveAspectRatio="none">
            <path d="M0 120 L200 0 L200 120 Z" />
          </svg>
          <svg className="r-waves" viewBox="0 0 300 90" preserveAspectRatio="none">
            <path d="M0 16 C50 40, 100 -8, 150 16 C200 40, 250 -8, 300 16" />
            <path d="M0 46 C50 70, 100 22, 150 46 C200 70, 250 22, 300 46" />
            <path d="M0 76 C50 100, 100 52, 150 76 C200 100, 250 52, 300 76" />
          </svg>
          <span className="r-halftone" />
        </div>

        <p className={`r-kicker ${mono.className}`}>YOU ARE INVITED OUTSIDE</p>

        <h1 className={`r-title ${display.className}`}>
          <span className="r-line" data-text="MEERA'S">
            MEERA&apos;S
          </span>
          <span className="r-line r-line-2" data-text="BIRTHDAY">
            BIRTHDAY
          </span>
          <span className="r-line r-line-3" data-text="PICNIC">
            PICNIC
          </span>
        </h1>

        <p className="r-strap">
          A blanket, a crowd, and a pile of food nobody coordinated. Date and place still landing.
        </p>
      </header>

      <section className="r-facts">
        {FACTS.map((f, i) => (
          <div key={f.k} className={`r-fact r-fact-${i % 4}`}>
            <span className={`r-fact-k ${mono.className}`}>{f.k}</span>
            <span className={`r-fact-head ${mono.className}`}>{f.head}</span>
            <strong className={`r-fact-value ${display.className}`}>{f.value}</strong>
            <span className="r-fact-note">{f.note}</span>
          </div>
        ))}
      </section>

      <section className="r-game">
        <h2 className={`r-h2 ${display.className}`}>ONE MEMORY. NO NAME.</h2>
        <div className="r-game-grid">
          <p>
            Your RSVP asks for a memory the two of you share. You sign it with a secret name,
            so that is all Meera gets to see.
          </p>
          <p className="r-game-b">
            On the day they all unlock at once and she has to work out who wrote what one. You can
            tell her it was you. You don't have to.
          </p>
        </div>
      </section>

      <section className="r-rsvp">
        <form className="r-form" onSubmit={(e) => e.preventDefault()}>
          <p className={`r-form-head ${display.className}`}>RSVP</p>

          <label className="r-field">
            <span>SECRET NAME</span>
            <input placeholder="Bench Philosopher / Room 3B / Aux Gremlin" />
            <em>this is all she sees</em>
          </label>

          <fieldset className="r-status">
            <legend>ARE YOU COMING</legend>
            <div>
              {Object.entries(STATUS_LABEL).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setStatus(key)}
                  className={`r-chip${status === key ? " is-on" : ""} ${display.className}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="r-field">
            <span>A MEMORY OF YOU AND MEERA</span>
            <textarea rows={4} placeholder="She can't read it until the picnic." />
          </label>

          <div className="r-reveal">
            <p>SHOULD SHE KNOW IT'S YOU?</p>
            <div>
              <button
                type="button"
                onClick={() => setReveal(false)}
                className={`r-chip${!reveal ? " is-on" : ""} ${display.className}`}
              >
                mystery
              </button>
              <button
                type="button"
                onClick={() => setReveal(true)}
                className={`r-chip${reveal ? " is-on" : ""} ${display.className}`}
              >
                tell her
              </button>
            </div>
            {reveal && (
              <label className="r-field r-field-reveal">
                <span>REAL NAME</span>
                <input placeholder="Shown beside your secret name on the day" />
              </label>
            )}
          </div>

          <button type="submit" className={`r-submit ${display.className}`}>
            SEAL IT
          </button>
        </form>
      </section>

      <section className="r-wall">
        <h2 className={`r-h2 ${display.className}`}>{GUESTS.length} SEALED</h2>
        <ul className="r-cards">
          {GUESTS.map((g, i) => (
            <li key={g.secret} className={`r-card r-card-${i % 3}`}>
              <span className={`r-card-dot ${mono.className}`} aria-hidden="true">
                ?
              </span>
              <p className={`r-card-name ${display.className}`}>{g.secret}</p>
              <p className="r-card-real">
                {g.revealed ? `AKA ${g.real?.toUpperCase()}` : "STILL A MYSTERY"}
              </p>
              <span className={`r-tag r-tag-${g.status}`}>{STATUS_LABEL[g.status]}</span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="r-foot">
        <span>BRING SOMETHING</span>
        <span>PLAY SOMETHING</span>
        <span>DATE TO FOLLOW</span>
      </footer>
    </div>
  );
}

const CSS = `
.r-root {
  --paper: #F0EADA;
  --pink: #FF3D7F;
  --purple: #6A3FBF;
  --orange: #FF6A13;
  --teal: #0E8F8F;
  --clay: #D9481F;
  --ink: #17161A;

  position: relative;
  z-index: 10;
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
  overflow-x: hidden;
  padding-bottom: 70px;
}

/* paper grain + halftone */
.r-grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 3;
  background-image: radial-gradient(rgba(23,22,26,0.16) 0.6px, transparent 0.7px);
  background-size: 3px 3px;
  opacity: 0.55;
  mix-blend-mode: multiply;
}

/* hero */
.r-hero {
  position: relative;
  max-width: 1060px;
  margin: 0 auto;
  padding: clamp(34px, 6vw, 70px) 20px clamp(20px, 4vw, 40px);
}
.r-shapes { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.r-wedge {
  position: absolute;
  top: 0;
  right: 0;
  width: clamp(220px, 34vw, 460px);
  height: clamp(150px, 24vw, 300px);
  mix-blend-mode: multiply;
}
.r-wedge path { fill: var(--orange); opacity: 0.9; }
.r-waves {
  position: absolute;
  top: clamp(140px, 22vw, 250px);
  right: -20px;
  width: clamp(200px, 30vw, 380px);
  height: clamp(70px, 10vw, 110px);
  mix-blend-mode: multiply;
}
.r-waves path { fill: none; stroke: var(--teal); stroke-width: 7; stroke-linecap: round; }
.r-halftone {
  position: absolute;
  top: clamp(30px, 5vw, 60px);
  right: clamp(150px, 24vw, 330px);
  width: clamp(120px, 18vw, 210px);
  height: clamp(120px, 18vw, 210px);
  background-image: radial-gradient(var(--pink) 30%, transparent 31%);
  background-size: 11px 11px;
  mix-blend-mode: multiply;
  opacity: 0.95;
}

.r-kicker {
  position: relative;
  z-index: 2;
  margin: 0;
  font-size: 13px;
  letter-spacing: 0.3em;
  font-weight: 700;
  color: var(--purple);
}

.r-title { position: relative; z-index: 2; margin: 14px 0 0; display: flex; flex-direction: column; }
.r-line {
  position: relative;
  font-size: clamp(44px, 11.5vw, 130px);
  line-height: 0.9;
  letter-spacing: -0.035em;
  color: var(--ink);
}
/* misregistration: a second impression offset in another ink */
.r-line::after {
  content: attr(data-text);
  position: absolute;
  left: 3px;
  top: 3px;
  color: var(--pink);
  mix-blend-mode: multiply;
  z-index: -1;
}
.r-line-2::after { color: var(--purple); left: -4px; top: 4px; }
.r-line-3 { color: var(--orange); }
.r-line-3::after { color: var(--teal); left: 5px; top: -3px; }

.r-strap {
  position: relative;
  z-index: 2;
  margin: clamp(20px, 3vw, 30px) 0 0;
  max-width: 46ch;
  font-size: 15px;
  line-height: 1.75;
}

/* facts */
.r-facts {
  max-width: 1060px;
  margin: clamp(26px, 4vw, 44px) auto 0;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 12px;
}
.r-fact {
  position: relative;
  padding: 0 0 18px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  border: 3px solid var(--ink);
  background: #FDFAF0;
  overflow: hidden;
}
.r-fact > * { padding-left: 16px; padding-right: 16px; }
.r-fact::before {
  content: "";
  display: block;
  height: 26px;
  margin-bottom: 12px;
  border-bottom: 3px solid var(--ink);
  padding: 0;
  background-image: radial-gradient(rgba(23,22,26,0.55) 32%, transparent 33%);
  background-size: 7px 7px;
}
.r-fact-0::before { background-color: var(--orange); }
.r-fact-1::before { background-color: var(--pink); }
.r-fact-2::before { background-color: var(--teal); }
.r-fact-3::before { background-color: var(--purple); }
.r-fact-0 .r-fact-value { color: var(--clay); }
.r-fact-1 .r-fact-value { color: var(--pink); }
.r-fact-2 .r-fact-value { color: var(--teal); }
.r-fact-3 .r-fact-value { color: var(--purple); }
.r-fact-k { font-size: 12px; letter-spacing: 0.2em; font-weight: 700; color: #8E8779; }
.r-fact-head { font-size: 12px; letter-spacing: 0.24em; text-transform: uppercase; font-weight: 700; }
.r-fact-value { font-size: clamp(22px, 3.4vw, 30px); line-height: 1.1; text-transform: uppercase; }
.r-fact-note { font-size: 13px; line-height: 1.6; color: #6B6960; margin-top: 4px; }

/* game */
.r-game { max-width: 1060px; margin: clamp(30px, 5vw, 54px) auto 0; padding: 0 20px; }
.r-h2 { margin: 0 0 16px; font-size: clamp(26px, 5.4vw, 56px); line-height: 1; letter-spacing: -0.02em; }
.r-game-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
.r-game-grid p { margin: 0; font-size: 15px; line-height: 1.8; }
.r-game-b { color: var(--purple); }

/* form */
.r-rsvp { max-width: 1060px; margin: clamp(30px, 5vw, 54px) auto 0; padding: 0 20px; }
.r-form {
  width: min(100%, 620px);
  border: 3px solid var(--ink);
  background: #FFFDF4;
  padding: clamp(22px, 4vw, 34px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 10px 10px 0 var(--pink);
}
.r-form-head { margin: 0; font-size: clamp(30px, 5vw, 44px); letter-spacing: 0.06em; }
.r-field { display: flex; flex-direction: column; gap: 6px; }
.r-field > span, .r-status legend, .r-reveal > p {
  font-size: 11px;
  letter-spacing: 0.2em;
  font-weight: 700;
  color: #6B6960;
}
.r-field em { font-style: normal; font-size: 12px; letter-spacing: 0.1em; color: var(--pink); }
.r-field input, .r-field textarea {
  font: inherit;
  font-size: 14px;
  background: var(--paper);
  border: 2px solid var(--ink);
  padding: 12px 14px;
  color: var(--ink);
  resize: vertical;
  border-radius: 0;
}
.r-field input::placeholder, .r-field textarea::placeholder { color: #9C978A; }
.r-field input:focus, .r-field textarea:focus { outline: none; border-color: var(--pink); background: #FFFFFF; }

.r-status { border: 0; margin: 0; padding: 0; }
.r-status legend { padding: 0 0 10px; }
.r-status > div, .r-reveal > div { display: flex; gap: 10px; flex-wrap: wrap; }
.r-chip {
  cursor: pointer;
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 10px 22px;
  border: 2px solid var(--ink);
  background: transparent;
  color: var(--ink);
  transition: background 130ms ease, color 130ms ease;
}
.r-chip:hover { background: var(--orange); }
.r-chip.is-on { background: var(--ink); color: var(--paper); }

.r-reveal { border: 2px dashed var(--ink); padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.r-reveal > p { margin: 0; }

.r-submit {
  cursor: pointer;
  align-self: flex-start;
  font-size: 20px;
  letter-spacing: 0.08em;
  padding: 14px 36px;
  border: 3px solid var(--ink);
  background: var(--orange);
  color: #FFF7F0;
  transition: transform 140ms ease;
}
.r-submit:hover { transform: translate(-2px, -2px); }

/* wall */
.r-wall { max-width: 1060px; margin: clamp(34px, 5vw, 60px) auto 0; padding: 0 20px; }
.r-cards {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
}
.r-card {
  border: 2px solid var(--ink);
  padding: 18px;
  background: #FFFDF4;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: transform 160ms ease;
}
.r-card:hover { transform: translate(-2px, -2px); }
.r-card-dot {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 22px;
  font-weight: 700;
  background: var(--orange);
  color: var(--ink);
  mix-blend-mode: multiply;
}
.r-card-1 .r-card-dot { background: var(--pink); color: #FFF6FA; }
.r-card-2 .r-card-dot { background: var(--purple); color: #F2F8FF; }
.r-card-name { margin: 6px 0 0; font-size: 17px; line-height: 1.2; text-transform: uppercase; }
.r-card-real { margin: 0; font-size: 11px; letter-spacing: 0.14em; color: #6B6960; }
.r-tag {
  align-self: flex-start;
  margin-top: 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 4px 12px;
  border: 2px solid var(--ink);
  background: var(--teal);
  color: #F2FFF8;
}
.r-tag-maybe { background: var(--orange); color: #FFF7F0; }
.r-tag-cant { background: transparent; color: #6B6960; }

.r-foot {
  max-width: 1060px;
  margin: clamp(30px, 5vw, 54px) auto 0;
  padding: 14px 20px 0;
  border-top: 3px solid var(--ink);
  display: flex;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  font-size: 12px;
  letter-spacing: 0.2em;
  font-weight: 700;
}

@media (prefers-reduced-motion: reduce) {
  .r-root * { transition: none !important; animation: none !important; }
}
`;
