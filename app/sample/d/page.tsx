"use client";

/* THROWAWAY PREVIEW — direction D "Tilt". Delete once a direction is picked. */

import { useRef, useState } from "react";
import { Playfair_Display, Jost } from "next/font/google";

const display = Playfair_Display({ subsets: ["latin"], weight: ["500", "700"] });
const body = Jost({ subsets: ["latin"] });

const GUESTS = [
  { secret: "Aux Gremlin", status: "coming", revealed: true, real: "Rehk" },
  { secret: "Bench Philosopher", status: "coming", revealed: false },
  { secret: "Room 3B", status: "coming", revealed: true, real: "Tobi" },
  { secret: "Perpetually Late", status: "maybe", revealed: false },
  { secret: "Uni Days Witness", status: "cant", revealed: false },
];

const STATUS_LABEL: Record<string, string> = {
  coming: "Attending",
  maybe: "Maybe",
  cant: "Can't",
};

export default function TiltSample() {
  const [flipped, setFlipped] = useState(false);
  const [status, setStatus] = useState("coming");
  const [reveal, setReveal] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Pointer tilt. Writes CSS vars straight to the node so the card tracks the
  // cursor without a React render per mousemove.
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 13).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 16).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
  };

  const reset = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div className={`v-root ${body.className}`}>
      <style>{CSS}</style>

      <section className="v-stage">
        <p className="v-above">An invitation</p>

        <div
          ref={cardRef}
          className={`v-card${flipped ? " is-flipped" : ""}`}
          onPointerMove={onMove}
          onPointerLeave={reset}
        >
          <div className="v-inner">
            <div className="v-face v-front">
              <span className="v-sheen" aria-hidden="true" />
              <p className="v-small">You&apos;re invited to</p>
              <h1 className={`v-name ${display.className}`}>
                Faleti
                <span>Hannah&apos;s</span>
                <em>birthday hangout</em>
              </h1>
              <div className="v-rule" />
              <p className={`v-date ${display.className}`}>Saturday, 24 October</p>
              <button type="button" className="v-flip" onClick={() => setFlipped(true)}>
                Turn it over
              </button>
            </div>

            <div className="v-face v-back">
              <span className="v-sheen" aria-hidden="true" />
              <dl className="v-details">
                <div>
                  <dt>Where</dt>
                  <dd>Within her estate. Exact address closer to the day.</dd>
                </div>
                <div>
                  <dt>Food</dt>
                  <dd>Handled. Food and drinks are on her, bring nothing.</dd>
                </div>
                <div>
                  <dt>Plan</dt>
                  <dd>Games, gist and pictures. Someone will be filming.</dd>
                </div>
                <div className="v-deadline">
                  <dt>Reply by</dt>
                  <dd>Saturday 17 October, especially if you can&apos;t make it.</dd>
                </div>
              </dl>
              <button type="button" className="v-flip" onClick={() => setFlipped(false)}>
                Turn back
              </button>
            </div>
          </div>
        </div>

        <p className="v-below">
          {flipped ? "The details." : "Move your cursor across it. Then turn it over."}
        </p>
      </section>

      <section className="v-secret">
        <h2 className={`v-h2 ${display.className}`}>Leave her one memory</h2>
        <p>
          Signed with a secret name. Hannah reads the memory, never who sent it, until she opens
          them all at once and has to guess who wrote what.
        </p>
      </section>

      <section className="v-form-wrap">
        <form onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <legend>Are you coming</legend>
            <div className="v-row">
              {Object.entries(STATUS_LABEL).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setStatus(key)}
                  className={`v-chip${status === key ? " is-on" : ""}`}
                >
                  {label}
                </button>
              ))}
            </div>
            {status === "cant" && (
              <p className="v-early">Thank you for saying early. It genuinely helps her plan.</p>
            )}
          </fieldset>

          <label className="v-field">
            <span>Secret name</span>
            <input placeholder="Aux Gremlin, Room 3B, Person From Church" />
          </label>

          <label className="v-field">
            <span>A memory of you and Hannah</span>
            <textarea rows={4} placeholder="She can't read it until she opens them." />
          </label>

          <fieldset>
            <legend>Should she know it&apos;s you</legend>
            <div className="v-row">
              <button
                type="button"
                onClick={() => setReveal(false)}
                className={`v-chip${!reveal ? " is-on" : ""}`}
              >
                Keep me a mystery
              </button>
              <button
                type="button"
                onClick={() => setReveal(true)}
                className={`v-chip${reveal ? " is-on" : ""}`}
              >
                Tell her
              </button>
            </div>
            {reveal && (
              <label className="v-field v-field-reveal">
                <span>Your real name</span>
                <input placeholder="Shown next to your secret name" />
              </label>
            )}
          </fieldset>

          <label className="v-photo">
            <input type="checkbox" />
            <span>I&apos;d rather not be in the photos or videos.</span>
          </label>

          <button type="submit" className={`v-send ${display.className}`}>
            Send it
          </button>
        </form>
      </section>

      <section className="v-wall">
        <h2 className={`v-h2 ${display.className}`}>{GUESTS.length} replies, all sealed</h2>
        <ul className="v-stack">
          {GUESTS.map((g, i) => (
            <li key={g.secret} style={{ "--i": i } as React.CSSProperties}>
              <span className={`v-stack-name ${display.className}`}>{g.secret}</span>
              <span className="v-stack-real">
                {g.revealed ? `aka ${g.real}` : "still a mystery"}
              </span>
              <span className={`v-tag v-tag-${g.status}`}>{STATUS_LABEL[g.status]}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const CSS = `
.v-root {
  --paper: #F4F1EC;
  --navy: #141A2B;
  --gold: #B08647;
  --dim: #767388;

  position: relative;
  z-index: 10;
  min-height: 100vh;
  background:
    radial-gradient(60% 45% at 50% 0%, rgba(176,134,71,0.16) 0%, transparent 65%),
    var(--paper);
  color: var(--navy);
  padding-bottom: 90px;
}

/* stage */
.v-stage {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(16px, 3vw, 28px);
  padding: clamp(30px, 6vw, 70px) 20px;
  perspective: 1400px;
}
.v-above, .v-below {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--dim);
}

.v-card {
  --rx: 0deg;
  --ry: 0deg;
  --gx: 50%;
  --gy: 50%;
  width: min(100%, 460px);
  aspect-ratio: 0.72;
  transform: rotateX(var(--rx)) rotateY(var(--ry));
  transform-style: preserve-3d;
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}
.v-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 760ms cubic-bezier(0.22, 1, 0.36, 1);
}
.v-card.is-flipped .v-inner { transform: rotateY(180deg); }

.v-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  padding: clamp(26px, 5vw, 40px);
  box-shadow: 0 30px 60px -28px rgba(20,26,43,0.6);
  overflow: hidden;
}
.v-front { background: #FFFDFA; border: 1px solid rgba(20,26,43,0.14); }
.v-back { background: var(--navy); color: var(--paper); transform: rotateY(180deg); }

/* specular highlight follows the pointer */
.v-sheen {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    30% 30% at var(--gx) var(--gy),
    rgba(255,255,255,0.5) 0%,
    transparent 70%
  );
}
.v-back .v-sheen { background: radial-gradient(30% 30% at var(--gx) var(--gy), rgba(176,134,71,0.3) 0%, transparent 70%); }

.v-small { margin: 0; font-size: 10.5px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); }
.v-name { margin: auto 0 0; display: flex; flex-direction: column; line-height: 1.02; font-weight: 500; }
.v-name, .v-name span { font-size: clamp(2.1rem, 6vw, 3rem); }
.v-name em { font-style: italic; font-size: clamp(1.3rem, 3.6vw, 1.75rem); color: var(--gold); margin-top: 8px; }
.v-rule { height: 1px; background: rgba(20,26,43,0.18); margin: clamp(16px, 3vw, 24px) 0; }
.v-date { margin: 0; font-size: clamp(1.05rem, 2.6vw, 1.35rem); }

.v-flip {
  cursor: pointer;
  align-self: flex-start;
  margin-top: 18px;
  font: inherit;
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  padding: 11px 22px;
  border: 1px solid currentColor;
  background: transparent;
  color: inherit;
  border-radius: 999px;
  transition: background 200ms ease, color 200ms ease;
}
.v-front .v-flip:hover { background: var(--navy); color: var(--paper); }
.v-back .v-flip:hover { background: var(--paper); color: var(--navy); }

.v-details { margin: auto 0 0; display: flex; flex-direction: column; gap: 16px; }
.v-details dt { font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--gold); }
.v-details dd { margin: 5px 0 0; font-size: 14.5px; line-height: 1.55; color: rgba(244,241,236,0.84); }
.v-deadline dd { color: #FFFFFF; }

/* sections */
.v-secret, .v-form-wrap, .v-wall {
  max-width: 760px;
  margin: 0 auto;
  padding: 0 20px;
}
.v-secret { padding-top: clamp(30px, 5vw, 60px); }
.v-h2 { margin: 0 0 10px; font-size: clamp(1.6rem, 3.6vw, 2.4rem); font-weight: 500; }
.v-secret p { margin: 0; font-size: 16px; line-height: 1.75; color: var(--dim); max-width: 54ch; }

.v-form-wrap { padding-top: clamp(30px, 5vw, 58px); }
.v-form-wrap form { display: flex; flex-direction: column; gap: 22px; max-width: 560px; }
.v-form-wrap fieldset { border: 0; margin: 0; padding: 0; }
.v-form-wrap legend, .v-field > span {
  font-size: 10.5px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--dim);
  padding: 0 0 10px;
}
.v-field { display: flex; flex-direction: column; gap: 8px; }
.v-field > span { padding: 0; }
.v-field input, .v-field textarea {
  font: inherit;
  font-size: 16px;
  background: #FFFDFA;
  border: 1px solid rgba(20,26,43,0.2);
  padding: 13px 15px;
  color: var(--navy);
  resize: vertical;
  border-radius: 2px;
}
.v-field input::placeholder, .v-field textarea::placeholder { color: #ABA7B6; }
.v-field input:focus, .v-field textarea:focus { outline: none; border-color: var(--gold); }

.v-row { display: flex; gap: 9px; flex-wrap: wrap; }
.v-chip {
  cursor: pointer;
  font: inherit;
  font-size: 14.5px;
  padding: 11px 20px;
  border: 1px solid rgba(20,26,43,0.24);
  background: transparent;
  color: var(--dim);
  border-radius: 999px;
  transition: border-color 180ms ease, color 180ms ease, background 180ms ease;
}
.v-chip:hover { border-color: var(--navy); color: var(--navy); }
.v-chip.is-on { background: var(--navy); border-color: var(--navy); color: var(--paper); }
.v-early { margin: 11px 0 0; font-size: 14px; color: var(--gold); }

.v-photo {
  display: flex;
  gap: 11px;
  align-items: flex-start;
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--dim);
  cursor: pointer;
}
.v-photo input { margin-top: 3px; accent-color: var(--gold); cursor: pointer; }

.v-send {
  cursor: pointer;
  align-self: flex-start;
  font-size: 17px;
  padding: 14px 36px;
  border: 0;
  border-radius: 999px;
  background: var(--navy);
  color: var(--paper);
  transition: background 180ms ease, transform 180ms ease;
}
.v-send:hover { background: var(--gold); transform: translateY(-2px); }

/* wall */
.v-wall { padding-top: clamp(34px, 5vw, 62px); }
.v-stack { list-style: none; margin: 18px 0 0; padding: 0; }
.v-stack li {
  display: flex;
  align-items: baseline;
  gap: 14px;
  flex-wrap: wrap;
  background: #FFFDFA;
  border: 1px solid rgba(20,26,43,0.14);
  padding: 15px 18px;
  margin-top: -1px;
  transition: transform 220ms ease, box-shadow 220ms ease;
}
.v-stack li:hover {
  transform: translateX(6px);
  box-shadow: 0 14px 28px -18px rgba(20,26,43,0.55);
  z-index: 2;
  position: relative;
}
.v-stack-name { font-size: 1.1rem; }
.v-stack-real { flex: 1; font-size: 13px; color: var(--dim); }
.v-tag {
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 4px 11px;
  border-radius: 999px;
  background: rgba(20,26,43,0.08);
  color: var(--dim);
}
.v-tag-coming { background: rgba(176,134,71,0.18); color: #7A5A28; }

@media (prefers-reduced-motion: reduce) {
  .v-root * { transition: none !important; animation: none !important; }
}
`;
