"use client";

/* THROWAWAY PREVIEW — direction A "Birthday Card, Opened". Delete once a direction is picked. */

import { useState } from "react";
import { Fraunces, Caveat, Karla } from "next/font/google";

const display = Fraunces({ subsets: ["latin"], axes: ["SOFT", "WONK", "opsz"] });
const hand = Caveat({ subsets: ["latin"] });
const body = Karla({ subsets: ["latin"] });

const GUESTS = [
  { secret: "Jollof Enthusiast", status: "coming", revealed: false },
  { secret: "Aux Gremlin", status: "coming", revealed: true, real: "Rehk" },
  { secret: "Cake Courier", status: "coming", revealed: false },
  { secret: "Perpetually Late", status: "maybe", revealed: false },
  { secret: "Cousin, Allegedly", status: "coming", revealed: true, real: "Bayo" },
  { secret: "Uni Days Witness", status: "cant", revealed: false },
];

const STATUS_LABEL: Record<string, string> = {
  coming: "Coming",
  maybe: "Maybe",
  cant: "Can't make it",
};

export default function CardSample() {
  const [status, setStatus] = useState("coming");
  const [reveal, setReveal] = useState(false);

  return (
    <div className={`a-root ${body.className}`}>
      <style>{CSS}</style>

      <div className="a-card">
        <div className="a-ribbon" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <p className="a-eyebrow">You are invited</p>

        <h1 className={`a-title ${display.className}`}>
          Happy Birthday,
          <span className="a-name">Oshioke</span>
        </h1>

        <p className="a-gag">
          the birthday{" "}
          <span className="a-strike">
            boy
            <svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 21 C24 9, 52 25, 74 12 C82 7, 92 14, 98 10" />
            </svg>
          </span>{" "}
          <span className={`a-man ${hand.className}`}>man</span>
        </p>

        <div className="a-rule" />

        <dl className="a-details">
          <div>
            <dt>The day</dt>
            <dd>Saturday 22 August</dd>
          </div>
          <div>
            <dt>The hours</dt>
            <dd>12 till 4</dd>
          </div>
          <div>
            <dt>The place</dt>
            <dd>
              Iyeru Okin
              <em>at the Radisson Blu</em>
            </dd>
          </div>
        </dl>

        <div className="a-rule" />

        <div className="a-game">
          <p className={`a-game-head ${display.className}`}>He has to guess who you are</p>
          <p>
            Your wish goes up under a secret name. That is all he sees. At noon on the 22nd they all
            unlock at once and he has to work out who wrote what.
          </p>
        </div>

        <form className="a-form" onSubmit={(e) => e.preventDefault()}>
          <div className="a-field">
            <label htmlFor="a-secret">Your secret name</label>
            <input id="a-secret" placeholder="Aux Gremlin. Person From Church. Jollof Enthusiast." />
            <p className="a-hint">The only name on your wish. Make it guessable, or don&apos;t.</p>
          </div>

          <fieldset className="a-status">
            <legend>Are you coming</legend>
            <div className="a-chips">
              {Object.entries(STATUS_LABEL).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className={`a-chip${status === key ? " is-on" : ""}`}
                  onClick={() => setStatus(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="a-field">
            <label htmlFor="a-wish">Your birthday wish</label>
            <textarea
              id="a-wish"
              rows={4}
              placeholder="Sealed until noon on the 22nd. Say the sweet thing."
            />
          </div>

          <div className="a-reveal">
            <p className="a-reveal-q">Do you want him to know?</p>
            <div className="a-chips">
              <button
                type="button"
                className={`a-chip${!reveal ? " is-on" : ""}`}
                onClick={() => setReveal(false)}
              >
                Keep me a mystery
              </button>
              <button
                type="button"
                className={`a-chip${reveal ? " is-on" : ""}`}
                onClick={() => setReveal(true)}
              >
                Fine, tell him
              </button>
            </div>
            {reveal && (
              <div className="a-field a-field-reveal">
                <label htmlFor="a-real">Your real name</label>
                <input id="a-real" placeholder="Sits beside your secret name on the day" />
              </div>
            )}
          </div>

          <button type="submit" className="a-submit">
            Seal it
          </button>
        </form>
      </div>

      <section className="a-wall">
        <header className="a-wall-head">
          <h2 className={display.className}>{GUESTS.length} wishes sealed</h2>
          <p>Every one opens at noon on the 22nd. No peeking, not even him.</p>
        </header>

        <ul className="a-envelopes">
          {GUESTS.map((g) => (
            <li key={g.secret} className={`a-env a-env-${g.status}`}>
              <div className="a-flap" />
              <div className="a-seal" />
              <p className="a-env-name">{g.secret}</p>
              <p className={`a-env-tag ${hand.className}`}>
                {g.revealed ? `aka ${g.real}` : "identity withheld"}
              </p>
              <p className="a-env-status">{STATUS_LABEL[g.status]}</p>
            </li>
          ))}
        </ul>
      </section>

      <footer className="a-footer">
        <p className={hand.className}>see you at Iyeru Okin</p>
      </footer>
    </div>
  );
}

const CSS = `
.a-root {
  --pine: #10362E;
  --pine-deep: #0B2721;
  --stock: #FBF3E2;
  --ink: #17130E;
  --ink-soft: #5B5245;
  --red: #C9302B;
  --marigold: #E9A317;
  --teal: #1C7C7C;

  position: relative;
  z-index: 10;
  min-height: 100vh;
  background:
    radial-gradient(ellipse at 20% 0%, rgba(233,163,23,0.18) 0%, transparent 55%),
    radial-gradient(ellipse at 85% 20%, rgba(28,124,124,0.22) 0%, transparent 50%),
    linear-gradient(180deg, var(--pine) 0%, var(--pine-deep) 100%);
  color: var(--stock);
  padding: clamp(28px, 6vw, 72px) 20px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(40px, 7vw, 88px);
}

.a-card {
  width: min(100%, 780px);
  background: var(--stock);
  color: var(--ink);
  border-radius: 4px;
  padding: clamp(34px, 5vw, 60px) clamp(24px, 5vw, 60px) clamp(28px, 5vw, 56px);
  box-shadow: 0 1px 0 rgba(255,255,255,0.5) inset, 0 26px 60px -20px rgba(0,0,0,0.55);
  position: relative;
  overflow: hidden;
}

.a-ribbon { position: absolute; inset: 0 0 auto; height: 9px; display: flex; }
.a-ribbon span { flex: 1; }
.a-ribbon span:nth-child(1) { background: var(--red); }
.a-ribbon span:nth-child(2) { background: var(--marigold); }
.a-ribbon span:nth-child(3) { background: var(--teal); }
.a-ribbon span:nth-child(4) { background: var(--pine); }

.a-eyebrow {
  font-size: 12px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--teal);
  margin: 0 0 clamp(16px, 3vw, 26px);
  font-weight: 700;
}

.a-title {
  margin: 0;
  font-size: clamp(28px, 4.6vw, 42px);
  line-height: 1.05;
  font-weight: 400;
  letter-spacing: -0.01em;
}
.a-name {
  display: block;
  font-size: clamp(54px, 12.5vw, 116px);
  line-height: 0.92;
  font-weight: 700;
  letter-spacing: -0.035em;
  margin-top: 6px;
  font-variation-settings: "SOFT" 40, "WONK" 1;
}

.a-gag {
  margin: clamp(20px, 3vw, 30px) 0 0;
  font-size: clamp(24px, 3.6vw, 34px);
  color: var(--ink-soft);
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  line-height: 1.1;
}
.a-strike { position: relative; display: inline-block; }
.a-strike svg { position: absolute; left: -6%; top: 14%; width: 112%; height: 82%; overflow: visible; }
.a-strike path {
  fill: none;
  stroke: var(--red);
  stroke-width: 4;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
}
.a-man {
  color: var(--red);
  font-size: clamp(52px, 8.5vw, 82px);
  line-height: 0.72;
  transform: rotate(-4deg);
  display: inline-block;
}

.a-rule {
  height: 1px;
  background: repeating-linear-gradient(90deg, rgba(23,19,14,0.30) 0 6px, transparent 6px 12px);
  margin: clamp(26px, 4vw, 38px) 0;
}

.a-details {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 24px;
}
.a-details dt {
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--teal);
  font-weight: 700;
  margin-bottom: 6px;
}
.a-details dd {
  margin: 0;
  font-size: clamp(19px, 2.3vw, 22px);
  font-weight: 600;
  color: var(--ink);
  line-height: 1.25;
}
.a-details dd em {
  display: block;
  font-style: normal;
  font-size: 14px;
  font-weight: 400;
  color: var(--ink-soft);
  margin-top: 3px;
}

.a-game {
  background: rgba(28,124,124,0.10);
  border-left: 4px solid var(--teal);
  padding: 18px 20px;
  margin-bottom: clamp(26px, 4vw, 34px);
}
.a-game-head { margin: 0 0 6px; font-size: clamp(20px, 2.8vw, 26px); font-weight: 700; }
.a-game p:last-child { margin: 0; font-size: 15px; line-height: 1.65; color: var(--ink-soft); }

.a-form { display: flex; flex-direction: column; gap: 24px; }
.a-field { display: flex; flex-direction: column; gap: 8px; }
.a-field label,
.a-status legend,
.a-reveal-q {
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-soft);
  font-weight: 700;
}
.a-field input,
.a-field textarea {
  font: inherit;
  font-size: 16px;
  color: var(--ink);
  background: rgba(255,255,255,0.55);
  border: 1.5px solid rgba(23,19,14,0.28);
  padding: 13px 15px;
  border-radius: 3px;
  resize: vertical;
}
.a-field input::placeholder,
.a-field textarea::placeholder { color: rgba(91,82,69,0.5); }
.a-field input:focus,
.a-field textarea:focus { outline: none; border-color: var(--red); background: #FFF; }
.a-hint { margin: 0; font-size: 13px; color: var(--ink-soft); font-style: italic; }

.a-status { border: 0; padding: 0; margin: 0; }
.a-status legend { padding: 0; margin-bottom: 10px; }
.a-chips { display: flex; gap: 10px; flex-wrap: wrap; }
.a-chip {
  cursor: pointer;
  font: inherit;
  font-weight: 600;
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 999px;
  border: 1.5px solid rgba(23,19,14,0.28);
  background: transparent;
  color: var(--ink-soft);
  transition: background 140ms ease, color 140ms ease, border-color 140ms ease;
}
.a-chip:hover { border-color: var(--ink); color: var(--ink); }
.a-chip.is-on { background: var(--pine); border-color: var(--pine); color: var(--stock); }

.a-reveal {
  background: rgba(233,163,23,0.14);
  border: 1.5px dashed rgba(233,163,23,0.7);
  border-radius: 4px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.a-reveal-q { margin: 0; }
.a-field-reveal { margin-top: 4px; }

.a-submit {
  cursor: pointer;
  align-self: flex-start;
  font: inherit;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 14px;
  padding: 16px 38px;
  border-radius: 999px;
  border: 0;
  background: var(--red);
  color: var(--stock);
  transition: transform 140ms ease, background 140ms ease;
}
.a-submit:hover { background: #A9241F; transform: translateY(-1px); }

.a-wall { width: min(100%, 1000px); }
.a-wall-head { text-align: center; margin-bottom: clamp(24px, 4vw, 40px); }
.a-wall-head h2 {
  margin: 0 0 8px;
  font-size: clamp(26px, 4.4vw, 40px);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--stock);
}
.a-wall-head p { margin: 0; color: rgba(251,243,226,0.66); font-size: 15px; }

.a-envelopes {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 18px;
}
.a-env {
  position: relative;
  background: var(--stock);
  color: var(--ink);
  border-radius: 3px;
  padding: 46px 18px 18px;
  overflow: hidden;
  box-shadow: 0 14px 30px -16px rgba(0,0,0,0.6);
  transition: transform 180ms ease;
}
.a-env:hover { transform: translateY(-3px) rotate(-0.4deg); }
.a-flap {
  position: absolute;
  inset: 0 0 auto;
  height: 62px;
  background: linear-gradient(175deg, rgba(23,19,14,0.10), rgba(23,19,14,0.03));
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}
.a-seal {
  position: absolute;
  top: 44px;
  left: 50%;
  width: 26px;
  height: 26px;
  margin-left: -13px;
  border-radius: 50%;
  background: var(--red);
  box-shadow: 0 2px 5px rgba(0,0,0,0.25);
}
.a-env-maybe .a-seal { background: var(--marigold); }
.a-env-cant .a-seal { background: #8C8378; }
.a-env-name { margin: 16px 0 2px; font-weight: 700; font-size: 18px; line-height: 1.25; }
.a-env-tag { margin: 0; font-size: 21px; color: var(--teal); line-height: 1; }
.a-env-status {
  margin: 12px 0 0;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-soft);
  font-weight: 700;
}

.a-footer { color: rgba(251,243,226,0.75); }
.a-footer p { margin: 0; font-size: 30px; transform: rotate(-2deg); }

@media (prefers-reduced-motion: reduce) {
  .a-root * { transition: none !important; animation: none !important; }
}
`;
