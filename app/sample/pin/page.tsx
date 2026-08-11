"use client";

/* THROWAWAY PREVIEW — direction F "Pinterest board". Delete once a direction is picked. */

import { useState } from "react";
import { Bricolage_Grotesque, DM_Sans, Caveat } from "next/font/google";

const serif = Bricolage_Grotesque({ subsets: ["latin"] });
const sans = DM_Sans({ subsets: ["latin"] });
const hand = Caveat({ subsets: ["latin"] });

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

function Bow({ className }: { className?: string }) {
  /* four-point sparkle, replaces the earlier bow mark */
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 2 C56 34, 66 44, 98 50 C66 56, 56 66, 50 98 C44 66, 34 56, 2 50 C34 44, 44 34, 50 2 Z" />
    </svg>
  );
}

function Pin({
  children,
  tall,
  className = "",
}: {
  children: React.ReactNode;
  tall?: boolean;
  className?: string;
}) {
  return (
    <article className={`f-pin ${tall ? "f-pin-tall" : ""} ${className}`}>
      <div className="f-pin-body">{children}</div>
      <div className="f-pin-hover">
        <button type="button" className="f-save">
          Save
        </button>
      </div>
    </article>
  );
}

export default function PinSample() {
  const [status, setStatus] = useState("coming");
  const [reveal, setReveal] = useState(false);

  return (
    <div className={`f-root ${sans.className}`}>
      <style>{CSS}</style>

      {/* app chrome */}
      <header className="f-chrome">
        <Bow className="f-logo" />
        <div className="f-search">oshioke&apos;s birthday</div>
        <div className="f-avatar">O</div>
      </header>

      {/* board header */}
      <section className="f-board">
        <h1 className={`f-board-title ${serif.className}`}>
          oshioke&apos;s birthday <Bow className="f-title-bow" />
        </h1>
        <p className={`f-board-sub ${hand.className}`}>
          saturday 22 august · 12 till 4 · iyeru okin, at the radisson blu
        </p>
        <div className="f-board-meta">
          <span>{GUESTS.length} pins</span>
          <span className="f-dot" />
          <span>1 birthday man</span>
          <span className="f-dot" />
          <span>invite only</span>
        </div>
      </section>

      {/* masonry */}
      <section className="f-grid">
        <Pin tall className="f-pin-hero">
          <div className="f-hero">
            <span className={`f-hero-eyebrow ${sans.className}`}>you&apos;re invited to</span>
            <span className={`f-hero-name ${serif.className}`}>Oshioke</span>
            <span className={`f-hero-sub ${hand.className}`}>a birthday, obviously</span>
            <div className="f-lace" />
          </div>
        </Pin>

        <Pin>
          <div className="f-swatch">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <p className={`f-cap ${hand.className}`}>the colours of the day</p>
        </Pin>

        <Pin>
          <div className="f-card f-card-cherry">
            <p className="f-kicker">the date</p>
            <p className={`f-big ${serif.className}`}>
              22<sup>nd</sup>
            </p>
            <p className="f-under">saturday, august</p>
          </div>
        </Pin>

        <Pin tall>
          <div className="f-card f-card-blush f-gag">
            <p className={`f-gag-line ${sans.className}`}>
              the birthday{" "}
              <span className="f-old">
                boy
                <svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 20 C26 8, 54 26, 76 12 C84 7, 93 15, 98 11" />
                </svg>
              </span>
            </p>
            <p className={`f-gag-man ${serif.className}`}>man</p>
            <p className={`f-cap ${hand.className}`}>he&apos;s grown, apparently</p>
          </div>
        </Pin>

        <Pin>
          <div className="f-card f-card-butter">
            <p className="f-kicker">doors</p>
            <p className={`f-big f-big-sm ${serif.className}`}>12 till 4</p>
            <p className="f-under">four hours, then home</p>
          </div>
        </Pin>

        <Pin tall>
          <div className="f-card f-card-map">
            <p className="f-kicker">the place</p>
            <p className={`f-place ${serif.className}`}>Iyeru Okin</p>
            <p className="f-under">at the Radisson Blu</p>
            <div className="f-map" aria-hidden="true">
              <span className="f-pinmark" />
            </div>
          </div>
        </Pin>

        <Pin>
          <div className="f-card f-card-cream f-rule">
            <p className={`f-rule-num ${serif.className}`}>1</p>
            <p>
              Leave your wish under a <b>secret name</b>.
            </p>
          </div>
        </Pin>

        <Pin>
          <div className="f-card f-card-electric f-rule f-rule-last">
            <p className={`f-rule-num ${serif.className}`}>2</p>
            <p>He reads them all at noon and guesses who is who.</p>
          </div>
        </Pin>

        <Pin>
          <div className="f-card f-card-cherry f-rule f-rule-last">
            <p className={`f-rule-num ${serif.className}`}>3</p>
            <p>Reveal yourself only if you feel like it.</p>
          </div>
        </Pin>
      </section>

      {/* rsvp pin, expanded */}
      <section className="f-rsvp">
        <form className="f-sheet" onSubmit={(e) => e.preventDefault()}>
          <Bow className="f-sheet-bow" />
          <h2 className={`f-sheet-title ${serif.className}`}>Save your seat</h2>
          <p className={`f-sheet-sub ${hand.className}`}>it takes twenty seconds</p>

          <label className="f-field">
            <span>your secret name</span>
            <input placeholder="Aux Gremlin · Person From Church · Jollof Enthusiast" />
            <em className={hand.className}>this is the only name he sees</em>
          </label>

          <fieldset className="f-status">
            <legend>are you coming</legend>
            <div>
              {Object.entries(STATUS_LABEL).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setStatus(key)}
                  className={`f-chip${status === key ? " is-on" : ""}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="f-field">
            <span>your birthday wish</span>
            <textarea rows={4} placeholder="Sealed until noon on the 22nd." />
          </label>

          <div className="f-reveal">
            <p>do you want him to know?</p>
            <div>
              <button
                type="button"
                onClick={() => setReveal(false)}
                className={`f-chip${!reveal ? " is-on" : ""}`}
              >
                keep me a mystery
              </button>
              <button
                type="button"
                onClick={() => setReveal(true)}
                className={`f-chip${reveal ? " is-on" : ""}`}
              >
                fine, tell him
              </button>
            </div>
            {reveal && (
              <label className="f-field f-field-reveal">
                <span>your real name</span>
                <input placeholder="Shown beside your secret name on the day" />
              </label>
            )}
          </div>

          <button type="submit" className="f-submit">
            Seal it
          </button>
        </form>
      </section>

      {/* wish pins */}
      <section className="f-wishes">
        <h2 className={`f-wishes-head ${serif.className}`}>
          {GUESTS.length} sealed wishes
          <span className={hand.className}>they open at noon on the 22nd</span>
        </h2>

        <div className="f-grid f-grid-tight">
          {GUESTS.map((g, i) => (
            <Pin key={g.secret} tall={i % 3 === 1}>
              <div className={`f-wish f-wish-${i % 3}`}>
                <Bow className="f-wish-bow" />
                <span className={`f-wish-q ${serif.className}`}>?</span>
              </div>
              <p className={`f-wish-name ${serif.className}`}>{g.secret}</p>
              <p className="f-wish-real">
                {g.revealed ? `aka ${g.real}` : "identity withheld"}
                <span className={`f-tag f-tag-${g.status}`}>{STATUS_LABEL[g.status]}</span>
              </p>
            </Pin>
          ))}
        </div>
      </section>

      <footer className={`f-foot ${hand.className}`}>
        see you at iyeru okin, 22 august
      </footer>
    </div>
  );
}

const CSS = `
.f-root {
  --cream: #FAF8F3;
  --blush: #BFDCFF;
  --cherry: #FF3B2F;
  --tangerine: #FF7A1A;
  --butter: #FFC93C;
  --mint: #17C3A2;
  --electric: #2B5BFF;
  --cocoa: #1B1B1F;
  --soft: #77767F;
  --sage: #8FE3CC;

  position: relative;
  z-index: 10;
  min-height: 100vh;
  background: var(--cream);
  color: var(--cocoa);
  padding-bottom: 70px;
}

/* chrome */
.f-chrome {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px clamp(14px, 3vw, 28px);
  background: rgba(255,248,244,0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(59,43,43,0.08);
}
.f-logo { width: 26px; height: 26px; fill: var(--cherry); flex: none; }
.f-logo path, .f-logo circle { fill: var(--cherry); }
.f-search {
  flex: 1;
  background: #EFEDE7;
  border-radius: 999px;
  padding: 11px 20px;
  font-size: 14px;
  color: var(--soft);
}
.f-avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--electric);
  color: #FFF;
  display: grid;
  place-items: center;
  font-size: 15px;
  font-weight: 700;
  flex: none;
}

/* board header */
.f-board { text-align: center; padding: clamp(30px, 6vw, 58px) 20px clamp(20px, 4vw, 34px); }
.f-board-title {
  margin: 0;
  font-size: clamp(38px, 8vw, 78px);
 
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.05;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}
.f-title-bow { width: clamp(24px, 3vw, 36px); height: auto; fill: var(--butter); flex: none; }
.f-title-bow path { fill: var(--butter); }
.f-board-sub { margin: 10px 0 0; font-size: clamp(20px, 2.6vw, 26px); color: var(--electric); }
.f-board-meta {
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 12.5px;
  color: var(--soft);
  flex-wrap: wrap;
}
.f-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--soft); display: inline-block; }

/* masonry */
.f-grid {
  columns: 4 220px;
  column-gap: 16px;
  padding: 0 clamp(14px, 3vw, 28px);
}
.f-grid-tight { columns: 4 190px; padding: 0; }

.f-pin {
  position: relative;
  break-inside: avoid;
  margin-bottom: 16px;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  background: transparent;
}
.f-pin-body { border-radius: 18px; overflow: hidden; }
.f-pin-hover {
  position: absolute;
  inset: 0;
  background: rgba(59,43,43,0.34);
  opacity: 0;
  transition: opacity 150ms ease;
  padding: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  border-radius: 18px;
  pointer-events: none;
}
.f-pin:hover .f-pin-hover, .f-pin:focus-within .f-pin-hover { opacity: 1; pointer-events: auto; }
.f-save {
  cursor: pointer;
  border: 0;
  background: var(--cherry);
  color: #FFF;
  font: inherit;
  font-weight: 700;
  font-size: 13px;
  padding: 9px 16px;
  border-radius: 999px;
}
.f-save:hover { background: #A50C25; }

/* hero pin */
.f-hero {
  position: relative;
  background: linear-gradient(158deg, #2B5BFF 0%, #17C3A2 62%, #C8F03C 100%);
  padding: 40px 22px 46px;
  text-align: center;
  min-height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
}
.f-hero-eyebrow { font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(255,255,255,0.85); }
.f-hero-name { font-size: clamp(40px, 6vw, 58px); line-height: 1; color: #FFFFFF; }
.f-hero-sub { font-size: 25px; color: var(--butter); }
.f-lace {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 14px;
  background: repeating-linear-gradient(90deg, var(--cream) 0 10px, transparent 10px 20px);
}

/* swatch pin */
.f-swatch { display: flex; height: 128px; }
.f-swatch span { flex: 1; }
.f-swatch span:nth-child(1) { background: var(--cherry); }
.f-swatch span:nth-child(2) { background: var(--tangerine); }
.f-swatch span:nth-child(3) { background: var(--butter); }
.f-swatch span:nth-child(4) { background: var(--mint); }
.f-swatch span:nth-child(5) { background: var(--electric); }
.f-cap { margin: 8px 2px 0; font-size: 20px; color: var(--soft); }

/* cards */
.f-card { padding: 26px 22px; }
.f-card-cherry { background: var(--cherry); color: #FFFFFF; }
.f-card-blush { background: var(--blush); }
.f-card-butter { background: var(--butter); color: #4A3200; }
.f-card-cream { background: #FFFFFF; }
.f-card-electric { background: var(--electric); color: #FFFFFF; }
.f-kicker { margin: 0; font-size: 10px; letter-spacing: 0.26em; text-transform: uppercase; opacity: 0.72; }
.f-big { margin: 6px 0 2px; font-size: 76px; line-height: 0.9; }
.f-big sup { font-size: 26px; font-style: normal; }
.f-big-sm { font-size: 46px; }
.f-under { margin: 0; font-size: 13px; opacity: 0.78; }

.f-gag { min-height: 240px; display: flex; flex-direction: column; justify-content: center; }
.f-gag-line { margin: 0; font-size: 17px; color: #8A6070; }
.f-old { position: relative; display: inline-block; }
.f-old svg { position: absolute; left: -8%; top: 16%; width: 116%; height: 72%; overflow: visible; }
.f-old path {
  fill: none;
  stroke: var(--cherry);
  stroke-width: 3;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
}
.f-gag-man { margin: 2px 0 0; font-size: 66px; line-height: 1; color: var(--cherry); }

/* map pin */
.f-card-map { background: #FFFFFF; min-height: 300px; }
.f-place { margin: 6px 0 2px; font-size: 34px; line-height: 1.05; }
.f-map {
  margin-top: 16px;
  height: 140px;
  border-radius: 12px;
  background:
    linear-gradient(rgba(59,43,43,0.09) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59,43,43,0.09) 1px, transparent 1px),
    var(--sage);
  background-size: 22px 22px;
  position: relative;
}
.f-pinmark {
  position: absolute;
  left: 52%; top: 46%;
  width: 16px; height: 16px;
  border-radius: 50% 50% 50% 0;
  background: var(--cherry);
  transform: rotate(-45deg);
  box-shadow: 0 3px 6px rgba(0,0,0,0.2);
}

/* rules */
.f-rule { display: flex; gap: 14px; align-items: flex-start; min-height: 130px; }
.f-rule p:last-child { margin: 0; font-size: 14px; line-height: 1.6; }
.f-rule-num { margin: 0; font-size: 46px; line-height: 0.8; color: var(--cherry); flex: none; }
.f-rule-last .f-rule-num { color: #FFFFFF; }
.f-card-butter .f-kicker, .f-card-butter .f-under { opacity: 0.85; }

/* rsvp sheet */
.f-rsvp { display: flex; justify-content: center; padding: clamp(40px, 7vw, 72px) clamp(14px, 3vw, 28px) 0; }
.f-sheet {
  position: relative;
  width: min(100%, 560px);
  background: #FFFFFF;
  border-radius: 26px;
  padding: clamp(30px, 5vw, 46px) clamp(22px, 4vw, 40px) clamp(28px, 4vw, 40px);
  box-shadow: 0 22px 44px -22px rgba(59,43,43,0.35);
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.f-sheet-bow {
  position: absolute;
  top: -18px; left: 50%;
  width: 36px; height: 36px;
  transform: translateX(-50%);
}
.f-sheet-bow path { fill: var(--butter); }
.f-sheet-title { margin: 6px 0 0; font-size: clamp(30px, 5vw, 42px); text-align: center; }
.f-sheet-sub { margin: -14px 0 0; text-align: center; font-size: 22px; color: var(--cherry); }

.f-field { display: flex; flex-direction: column; gap: 7px; }
.f-field > span, .f-status legend, .f-reveal > p {
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--soft);
  font-weight: 700;
}
.f-field em { font-style: normal; font-size: 19px; color: var(--cherry); }
.f-field input, .f-field textarea {
  font: inherit;
  font-size: 14.5px;
  background: #F2F1EC;
  border: 1.5px solid transparent;
  border-radius: 14px;
  padding: 13px 16px;
  color: var(--cocoa);
  resize: vertical;
}
.f-field input::placeholder, .f-field textarea::placeholder { color: #A9A8A0; }
.f-field input:focus, .f-field textarea:focus { outline: none; border-color: var(--cherry); background: #FFF; }

.f-status { border: 0; margin: 0; padding: 0; }
.f-status legend { padding: 0 0 10px; }
.f-status > div, .f-reveal > div { display: flex; gap: 9px; flex-wrap: wrap; }
.f-chip {
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 999px;
  border: 1.5px solid #E2E1DA;
  background: #FFF;
  color: var(--soft);
  transition: background 140ms ease, color 140ms ease, border-color 140ms ease;
}
.f-chip:hover { border-color: var(--cherry); color: var(--cherry); }
.f-chip.is-on { background: var(--cherry); border-color: var(--cherry); color: #FFF; }

.f-reveal {
  background: #F2F1EC;
  border-radius: 18px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.f-reveal > p { margin: 0; }
.f-field-reveal input { background: #FFF; }

.f-submit {
  cursor: pointer;
  font: inherit;
  font-size: 16px;
  font-weight: 700;
  padding: 15px;
  border-radius: 999px;
  border: 0;
  background: var(--cherry);
  color: #FFF;
  transition: background 140ms ease, transform 140ms ease;
}
.f-submit:hover { background: #A50C25; transform: translateY(-1px); }

/* wishes */
.f-wishes { padding: clamp(44px, 7vw, 74px) clamp(14px, 3vw, 28px) 0; }
.f-wishes-head {
  margin: 0 0 22px;
  font-size: clamp(26px, 4.4vw, 40px);
 
  display: flex;
  align-items: baseline;
  gap: 14px;
  flex-wrap: wrap;
}
.f-wishes-head span { font-size: 22px; font-style: normal; color: var(--cherry); }

.f-wish {
  position: relative;
  height: 150px;
  display: grid;
  place-items: center;
  background: var(--blush);
}
.f-wish-1 { height: 210px; background: var(--butter); }
.f-wish-2 { background: var(--sage); }
.f-wish-bow { position: absolute; top: 12px; left: 12px; width: 18px; height: 18px; opacity: 0.5; }
.f-wish-bow path, .f-wish-bow circle { fill: #FFFFFF; }
.f-wish-q { font-size: 58px; color: rgba(59,43,43,0.34); }
.f-wish-name { margin: 9px 3px 0; font-size: 19px; line-height: 1.2; }
.f-wish-real {
  margin: 3px 3px 0;
  font-size: 11px;
  color: var(--soft);
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.f-tag {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 9px;
  border-radius: 999px;
  background: var(--mint);
  color: #08402F;
}
.f-tag-maybe { background: var(--tangerine); color: #FFFFFF; }
.f-tag-cant { background: #F0E2E9; color: #9A8894; }

.f-foot { text-align: center; margin-top: clamp(36px, 6vw, 60px); font-size: 27px; color: var(--cherry); }

@media (prefers-reduced-motion: reduce) {
  .f-root * { transition: none !important; animation: none !important; }
}
`;
