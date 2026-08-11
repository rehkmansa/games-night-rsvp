"use client";

/* THROWAWAY PREVIEW — direction E "Cutout Collage". Delete once a direction is picked. */

import { useState } from "react";
import { Archivo_Black, Permanent_Marker, Playfair_Display, Space_Mono, Caveat } from "next/font/google";

const black = Archivo_Black({ subsets: ["latin"], weight: "400" });
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400" });
const serif = Playfair_Display({ subsets: ["latin"] });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });
const hand = Caveat({ subsets: ["latin"] });

const LETTERS = [
  { ch: "O", bg: "#E9EDF2", fg: "#1E2A3A", font: "serif", rot: -6, pad: 14 },
  { ch: "S", bg: "#D9534A", fg: "#FFF7F0", font: "black", rot: 4, pad: 10 },
  { ch: "H", bg: "#2E4374", fg: "#F3EFE6", font: "black", rot: -3, pad: 12 },
  { ch: "I", bg: "#F0C9C4", fg: "#3A2A28", font: "serif", rot: 7, pad: 16 },
  { ch: "O", bg: "#4F7F63", fg: "#F3EFE6", font: "black", rot: -5, pad: 11 },
  { ch: "K", bg: "#EFE9DC", fg: "#1E2A3A", font: "mono", rot: 3, pad: 13 },
  { ch: "E", bg: "#E8892C", fg: "#241B12", font: "black", rot: -4, pad: 12 },
];

const BANDS = [
  { label: "the date", value: "Sat 22 August", scrawl: "put it in your phone", bg: "#232323", fg: "#FFFFFF", side: "left" },
  { label: "the time", value: "12 till 4", scrawl: "come early, stay late", bg: "#2E4374", fg: "#FFFFFF", side: "right" },
  { label: "the place", value: "Iyeru Okin", scrawl: "at the Radisson Blu", bg: "#E8892C", fg: "#241B12", side: "left" },
];

const GUESTS = [
  { secret: "Jollof Enthusiast", status: "coming", revealed: false },
  { secret: "Aux Gremlin", status: "coming", revealed: true, real: "Rehk" },
  { secret: "Cake Courier", status: "coming", revealed: false },
  { secret: "Perpetually Late", status: "maybe", revealed: false },
  { secret: "Cousin, Allegedly", status: "coming", revealed: true, real: "Bayo" },
  { secret: "Uni Days Witness", status: "cant", revealed: false },
];

const STATUS_LABEL: Record<string, string> = {
  coming: "coming",
  maybe: "maybe",
  cant: "can't",
};

const FONT_CLASS: Record<string, string> = {
  black: black.className,
  serif: serif.className,
  mono: mono.className,
  marker: marker.className,
};

export default function CollageSample() {
  const [status, setStatus] = useState("coming");
  const [reveal, setReveal] = useState(false);

  return (
    <div className={`e-root ${mono.className}`}>
      <style>{CSS}</style>

      <div className="e-sheet">
        {/* torn header strip */}
        <div className="e-torn">
          <div className="e-torn-inner">
            <p className={`e-torn-left ${mono.className}`}>
              A BIRTHDAY
              <br />
              FOR OSHIOKE
            </p>
            <p className={`e-torn-mid ${hand.className}`}>you&apos;re invited ♡</p>
            <p className={`e-torn-right ${black.className}`}>22.08.26</p>
          </div>
        </div>

        {/* ransom headline */}
        <section className="e-hero">
          <h1 className="e-ransom" aria-label="Oshioke">
            {LETTERS.map((l, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`e-letter ${FONT_CLASS[l.font]}`}
                style={{
                  background: l.bg,
                  color: l.fg,
                  transform: `rotate(${l.rot}deg)`,
                  padding: `${l.pad}px ${l.pad + 4}px`,
                }}
              >
                {l.ch}
              </span>
            ))}
          </h1>

          <p className={`e-sub ${black.className}`}>BIRTHDAY</p>

          <div className="e-note">
            <div className="e-tape e-tape-a" />
            <div className="e-tape e-tape-b" />
            <p className={mono.className}>
              the birthday{" "}
              <span className="e-old">
                boy
                <svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 20 C26 8, 54 26, 76 12 C84 7, 93 15, 98 11" />
                </svg>
              </span>
            </p>
            <p className={`e-man ${marker.className}`}>MAN now.</p>
          </div>

          <span className={`e-badge e-badge-1 ${marker.className}`}>no gifts, just show up</span>
          <span className={`e-badge e-badge-2 ${marker.className}`}>4 hours only</span>
        </section>

        {/* bands */}
        <section className="e-bands">
          {BANDS.map((b, i) => (
            <div key={b.label} className={`e-band-row e-band-${b.side}`}>
              <div className="e-band" style={{ background: b.bg, color: b.fg }}>
                <span className={`e-band-label ${black.className}`}>{b.label}</span>
                <strong className={`e-band-value ${black.className}`}>{b.value}</strong>
              </div>
              <p className={`e-scrawl ${hand.className}`}>{b.scrawl}</p>
              {i < BANDS.length - 1 && (
                <svg className="e-arrow" viewBox="0 0 120 60" aria-hidden="true">
                  <path d="M6 6 C40 26, 80 14, 108 48" />
                  <path d="M96 44 L110 50 L102 36" />
                </svg>
              )}
            </div>
          ))}
        </section>

        {/* the game */}
        <section className="e-game">
          <div className="e-game-card">
            <div className="e-tape e-tape-c" />
            <h2 className={`e-h2 ${black.className}`}>Sign it with a fake name</h2>
            <p>
              Your wish goes up under a <b>secret name</b>. He does not get to know who wrote what
              until he guesses it, and he only gets one shot per person.
            </p>
            <p className={`e-game-hand ${hand.className}`}>
              feeling generous? you can reveal yourself.
            </p>
          </div>
        </section>

        {/* rsvp */}
        <section className="e-rsvp">
          <form className="e-pad" onSubmit={(e) => e.preventDefault()}>
            <p className={`e-pad-head ${black.className}`}>RSVP</p>

            <label className="e-field">
              <span className={mono.className}>YOUR SECRET NAME</span>
              <input placeholder="Aux Gremlin, Person From Church, Jollof Enthusiast" />
              <em className={hand.className}>this is all he sees</em>
            </label>

            <fieldset className="e-status">
              <legend className={mono.className}>ARE YOU COMING</legend>
              <div>
                {Object.entries(STATUS_LABEL).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setStatus(key)}
                    className={`e-chip ${marker.className}${status === key ? " is-on" : ""}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="e-field">
              <span className={mono.className}>YOUR BIRTHDAY WISH</span>
              <textarea rows={4} placeholder="Sealed until noon on the 22nd." />
            </label>

            <div className="e-reveal">
              <p className={mono.className}>DO YOU WANT HIM TO KNOW?</p>
              <div>
                <button
                  type="button"
                  onClick={() => setReveal(false)}
                  className={`e-chip ${marker.className}${!reveal ? " is-on" : ""}`}
                >
                  keep me a mystery
                </button>
                <button
                  type="button"
                  onClick={() => setReveal(true)}
                  className={`e-chip ${marker.className}${reveal ? " is-on" : ""}`}
                >
                  fine, tell him
                </button>
              </div>
              {reveal && (
                <label className="e-field e-field-reveal">
                  <span className={mono.className}>YOUR REAL NAME</span>
                  <input placeholder="Shown beside your secret name on the day" />
                </label>
              )}
            </div>

            <button type="submit" className={`e-send ${black.className}`}>
              SEAL IT
            </button>
          </form>
        </section>

        {/* wall */}
        <section className="e-wall">
          <h2 className={`e-wall-head ${black.className}`}>
            {GUESTS.length} sealed wishes
            <span className={hand.className}>all of them open at noon</span>
          </h2>

          <ul className="e-cards">
            {GUESTS.map((g, i) => (
              <li key={g.secret} className={`e-card e-card-${i % 3}`}>
                <div className="e-tape e-tape-card" />
                <div className="e-card-window">
                  <span className={`e-qmark ${black.className}`}>?</span>
                </div>
                <p className={`e-card-name ${marker.className}`}>{g.secret}</p>
                <p className={`e-card-real ${mono.className}`}>
                  {g.revealed ? `AKA ${g.real!.toUpperCase()}` : "IDENTITY WITHHELD"}
                </p>
                <span className={`e-card-status e-status-${g.status} ${mono.className}`}>
                  {STATUS_LABEL[g.status]}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <footer className={`e-foot ${mono.className}`}>
          <span>IYERU OKIN · RADISSON BLU</span>
          <span>22.08.26 · 12:00 TO 16:00</span>
        </footer>
      </div>
    </div>
  );
}

const CSS = `
.e-root {
  --paper: #EFEDE4;
  --line: rgba(30,42,58,0.13);
  --ink: #1E2A3A;
  --red: #D9534F;
  --navy: #2E4374;
  --orange: #E8892C;
  --green: #4F7F63;
  --blush: #F0C9C4;

  position: relative;
  z-index: 10;
  min-height: 100vh;
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 34px 34px;
  color: var(--ink);
  padding-bottom: 70px;
}

.e-sheet { max-width: 1080px; margin: 0 auto; padding: 0 clamp(14px, 4vw, 34px); }

/* torn strip */
.e-torn {
  background: #FBFAF6;
  margin: 0 calc(clamp(14px, 4vw, 34px) * -1);
  padding: 20px clamp(20px, 5vw, 48px) 30px;
  clip-path: polygon(0 0, 100% 0, 100% 82%, 96% 92%, 92% 84%, 87% 95%, 81% 86%, 75% 96%, 68% 87%, 61% 97%, 54% 88%, 47% 96%, 40% 87%, 33% 96%, 26% 88%, 19% 97%, 13% 88%, 7% 95%, 0 86%);
}
.e-torn-inner { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.e-torn-left { margin: 0; font-size: 10px; letter-spacing: 0.16em; line-height: 1.6; color: #5A6472; }
.e-torn-mid { margin: 0; font-size: 26px; color: var(--red); transform: rotate(-3deg); }
.e-torn-right { margin: 0; font-size: 15px; letter-spacing: 0.06em; }

/* hero */
.e-hero { position: relative; padding: clamp(30px, 6vw, 58px) 0 clamp(20px, 4vw, 36px); text-align: center; }
.e-ransom {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: clamp(4px, 1vw, 10px);
}
.e-letter {
  display: inline-block;
  font-size: clamp(38px, 9vw, 96px);
  line-height: 0.92;
  box-shadow: 2px 3px 0 rgba(30,42,58,0.22);
  clip-path: polygon(2% 4%, 97% 0, 100% 94%, 60% 100%, 3% 97%);
}
.e-sub {
  margin: clamp(10px, 2vw, 18px) 0 0;
  font-size: clamp(30px, 8.6vw, 92px);
  letter-spacing: 0.14em;
  color: var(--ink);
  -webkit-text-stroke: 2px var(--ink);
  color: transparent;
}

.e-note {
  position: relative;
  display: inline-block;
  margin-top: clamp(22px, 4vw, 36px);
  background: #FFFDF7;
  border: 1px solid rgba(30,42,58,0.2);
  padding: 20px 34px 18px;
  transform: rotate(-1.5deg);
  box-shadow: 3px 4px 0 rgba(30,42,58,0.16);
}
.e-note p { margin: 0; font-size: clamp(15px, 2vw, 18px); letter-spacing: 0.04em; }
.e-old { position: relative; display: inline-block; color: rgba(30,42,58,0.45); }
.e-old svg { position: absolute; left: -8%; top: 14%; width: 116%; height: 76%; overflow: visible; }
.e-old path {
  fill: none;
  stroke: var(--red);
  stroke-width: 3.4;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
}
.e-man { margin-top: 4px !important; font-size: clamp(30px, 5vw, 46px) !important; color: var(--red); transform: rotate(-2deg); }

.e-tape {
  position: absolute;
  width: 84px;
  height: 24px;
  background: rgba(240, 201, 196, 0.75);
  border-left: 1px dashed rgba(30,42,58,0.22);
  border-right: 1px dashed rgba(30,42,58,0.22);
}
.e-tape-a { top: -12px; left: -18px; transform: rotate(-28deg); }
.e-tape-b { bottom: -11px; right: -20px; transform: rotate(-24deg); background: rgba(78,127,110,0.55); }
.e-tape-c { top: -13px; left: 22px; transform: rotate(-6deg); }
.e-tape-card { top: -12px; left: 18px; transform: rotate(-7deg); }

.e-badge {
  position: absolute;
  font-size: 21px;
  padding: 6px 14px;
  color: #FFF7F0;
  box-shadow: 2px 3px 0 rgba(30,42,58,0.25);
}
.e-badge-1 { background: var(--navy); top: 56%; left: 2%; transform: rotate(-9deg); }
.e-badge-2 { background: var(--green); top: 62%; right: 2%; transform: rotate(8deg); }
@media (max-width: 780px) { .e-badge { display: none; } }

/* bands */
.e-bands { display: flex; flex-direction: column; gap: clamp(14px, 3vw, 26px); margin-top: clamp(24px, 5vw, 46px); }
.e-band-row { position: relative; display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
.e-band-right { justify-content: flex-end; flex-direction: row-reverse; }
.e-band {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 16px clamp(20px, 4vw, 40px);
  min-width: min(100%, 380px);
  clip-path: polygon(0 3%, 99% 0, 100% 97%, 1% 100%);
}
.e-band-label { font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; opacity: 0.72; }
.e-band-value { font-size: clamp(24px, 4.4vw, 40px); letter-spacing: -0.01em; font-weight: 400; }
.e-scrawl { margin: 0; font-size: 24px; color: var(--navy); transform: rotate(-2deg); }
.e-arrow {
  position: absolute;
  left: 46%;
  bottom: -32px;
  width: 78px;
  height: 40px;
  overflow: visible;
}
.e-band-right .e-arrow { left: auto; right: 46%; transform: scaleX(-1); }
.e-arrow path {
  fill: none;
  stroke: var(--red);
  stroke-width: 2;
  stroke-dasharray: 6 5;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
}
@media (max-width: 780px) { .e-arrow { display: none; } }

/* game */
.e-game { margin-top: clamp(34px, 6vw, 62px); display: flex; justify-content: center; }
.e-game-card {
  position: relative;
  max-width: 620px;
  background: var(--blush);
  padding: clamp(22px, 4vw, 34px);
  transform: rotate(1deg);
  box-shadow: 4px 5px 0 rgba(30,42,58,0.2);
}
.e-h2 { margin: 0 0 12px; font-size: clamp(22px, 3.6vw, 32px); letter-spacing: -0.01em; }
.e-game-card p { margin: 0 0 8px; font-size: 14px; line-height: 1.75; }
.e-game-hand { font-size: 25px !important; color: var(--red); transform: rotate(-1deg); }

/* rsvp pad */
.e-rsvp { margin-top: clamp(34px, 6vw, 62px); display: flex; justify-content: center; }
.e-pad {
  width: min(100%, 640px);
  background:
    repeating-linear-gradient(180deg, transparent 0 33px, rgba(46,67,116,0.14) 33px 34px),
    #FFFDF7;
  border: 1px solid rgba(30,42,58,0.28);
  box-shadow: 5px 6px 0 rgba(30,42,58,0.16);
  padding: clamp(22px, 4vw, 36px);
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.e-pad-head { margin: 0; font-size: clamp(30px, 5vw, 44px); letter-spacing: 0.14em; color: var(--red); }
.e-field { display: flex; flex-direction: column; gap: 7px; }
.e-field > span, .e-status legend, .e-reveal > p {
  font-size: 10px;
  letter-spacing: 0.2em;
  color: #5A6472;
  font-weight: 700;
}
.e-field em { font-style: normal; font-size: 20px; color: var(--navy); }
.e-field input, .e-field textarea {
  font: inherit;
  font-size: 14px;
  background: transparent;
  border: 0;
  border-bottom: 1.5px solid rgba(30,42,58,0.5);
  padding: 8px 2px;
  color: var(--ink);
  border-radius: 0;
  resize: vertical;
}
.e-field textarea { border: 1.5px solid rgba(30,42,58,0.5); padding: 12px; background: rgba(255,255,255,0.6); }
.e-field input::placeholder, .e-field textarea::placeholder { color: rgba(30,42,58,0.36); }
.e-field input:focus, .e-field textarea:focus { outline: none; border-color: var(--red); }

.e-status { border: 0; margin: 0; padding: 0; }
.e-status legend { padding: 0 0 10px; }
.e-status > div, .e-reveal > div { display: flex; gap: 10px; flex-wrap: wrap; }
.e-chip {
  cursor: pointer;
  font-size: 20px;
  padding: 5px 18px;
  border: 1.5px solid var(--ink);
  background: transparent;
  color: var(--ink);
  transition: background 130ms ease, color 130ms ease, transform 130ms ease;
}
.e-chip:hover { transform: translateY(-1px); }
.e-chip.is-on { background: var(--red); border-color: var(--red); color: #FFF7F0; }

.e-reveal {
  border: 1.5px dashed rgba(30,42,58,0.45);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: rgba(240,201,196,0.28);
}
.e-reveal > p { margin: 0; }
.e-field-reveal { margin-top: 2px; }

.e-send {
  cursor: pointer;
  align-self: flex-start;
  font-size: 20px;
  letter-spacing: 0.16em;
  padding: 14px 36px;
  border: 0;
  background: var(--ink);
  color: #FFF7F0;
  clip-path: polygon(1% 6%, 99% 0, 100% 94%, 2% 100%);
  transition: background 140ms ease;
}
.e-send:hover { background: var(--red); }

/* wall */
.e-wall { margin-top: clamp(40px, 7vw, 70px); }
.e-wall-head {
  margin: 0 0 26px;
  font-size: clamp(24px, 4vw, 36px);
  display: flex;
  align-items: baseline;
  gap: 16px;
  flex-wrap: wrap;
}
.e-wall-head span { font-size: 25px; color: var(--red); font-weight: 400; transform: rotate(-1.5deg); }

.e-cards {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 20px;
}
.e-card {
  position: relative;
  background: #FFFDF7;
  padding: 16px 16px 18px;
  border: 1px solid rgba(30,42,58,0.22);
  box-shadow: 3px 4px 0 rgba(30,42,58,0.18);
  transition: transform 180ms ease;
}
.e-card-0 { transform: rotate(-1.4deg); }
.e-card-1 { transform: rotate(1.2deg); }
.e-card-2 { transform: rotate(-0.6deg); }
.e-card:hover { transform: rotate(0deg) translateY(-3px); }
.e-card-window {
  height: 116px;
  display: grid;
  place-items: center;
  background:
    repeating-linear-gradient(45deg, rgba(46,67,116,0.10) 0 8px, transparent 8px 16px),
    var(--blush);
  margin-bottom: 12px;
}
.e-qmark { font-size: 54px; color: rgba(30,42,58,0.42); }
.e-card-name { margin: 0; font-size: 21px; line-height: 1.15; }
.e-card-real { margin: 5px 0 0; font-size: 9.5px; letter-spacing: 0.16em; color: #6B7484; }
.e-card-status {
  display: inline-block;
  margin-top: 12px;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 4px 12px;
  color: #FFF7F0;
  background: var(--green);
}
.e-status-maybe { background: var(--orange); color: #241B12; }
.e-status-cant { background: #9AA0A8; }

.e-foot {
  margin-top: clamp(36px, 6vw, 60px);
  padding-top: 14px;
  border-top: 2px solid var(--ink);
  display: flex;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  font-size: 10px;
  letter-spacing: 0.18em;
  color: #5A6472;
}

@media (prefers-reduced-motion: reduce) {
  .e-root * { transition: none !important; animation: none !important; }
}
`;
