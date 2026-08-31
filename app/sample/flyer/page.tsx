"use client";

/* THROWAWAY PREVIEW — picnic direction B "Flyer". Delete once a direction is picked. */

import { useEffect, useState } from "react";
import { Anton, DM_Sans } from "next/font/google";

const display = Anton({ subsets: ["latin"], weight: "400" });
const body = DM_Sans({ subsets: ["latin"] });

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

const ROWS = [
  { k: "When", v: "Still deciding", note: "it'll be a Saturday, we're picking", pending: true },
  { k: "Where", v: "Still deciding", note: "somewhere green with shade", pending: true },
  { k: "Bring", v: "Something", note: "it's a potluck, no empty hands", pending: false },
  { k: "Expect", v: "Games", note: "yes, you're playing", pending: false },
];

export default function FlyerSample() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("coming");
  const [reveal, setReveal] = useState(false);

  // Escape to close, and lock the page behind the sheet so the flyer does not
  // scroll under the user's thumb while the sheet is up.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={`y-root ${body.className}`}>
      <style>{CSS}</style>

      <div className="y-strip" aria-hidden="true">
        <div className={`y-strip-track ${display.className}`}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>PICNIC · MEERA · PICNIC · MEERA ·</span>
          ))}
        </div>
      </div>

      <div className="y-page">
        <header className="y-head">
          <p className={`y-eyebrow ${display.className}`}>You are invited to</p>
          <h1 className={`y-title ${display.className}`}>
            <span>MEERA&apos;S</span>
            <span className="y-title-out">BIRTHDAY</span>
            <span className="y-title-hit">PICNIC</span>
          </h1>
          <p className="y-strap">
            One afternoon on the grass. Bring something, play something, and answer one question in
            secret.
          </p>
        </header>

        <dl className="y-rows">
          {ROWS.map((r) => (
            <div key={r.k} className={`y-row${r.pending ? " is-pending" : ""}`}>
              <dt className={display.className}>{r.k}</dt>
              <dd>
                <strong className={display.className}>{r.v}</strong>
                <span>{r.note}</span>
              </dd>
              {r.pending && <span className={`y-pending ${display.className}`}>TBC</span>}
            </div>
          ))}
        </dl>

        <section className="y-secret">
          <h2 className={`y-h2 ${display.className}`}>One memory, no name on it</h2>
          <p>
            You leave a memory of the two of you, signed with a secret name. Meera sees the
            memory, never who sent it. On the day they all open at once and she has to work out who
            wrote what.
          </p>
        </section>

        <div className="y-cta">
          <button type="button" className={`y-big ${display.className}`} onClick={() => setOpen(true)}>
            RSVP
          </button>
          <p className="y-cta-note">
            {GUESTS.length} people in so far. Takes about twenty seconds.
          </p>
        </div>

        <section className="y-sealed">
          <p className={`y-sealed-k ${display.className}`}>Sealed so far</p>
          <ul>
            {GUESTS.map((g) => (
              <li key={g.secret}>
                <span className="y-sealed-name">{g.secret}</span>
                <span className={`y-sealed-tag y-tag-${g.status}`}>{STATUS_LABEL[g.status]}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* tear-off tabs, the one bit of flyer furniture that earns its place */}
        <div className="y-tear" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={display.className}>
              MEERA
              <br />
              PICNIC
            </span>
          ))}
        </div>
      </div>

      {/* sticky bar, phone only */}
      <div className="y-sticky">
        <button type="button" className={`y-sticky-btn ${display.className}`} onClick={() => setOpen(true)}>
          RSVP
        </button>
      </div>

      {/* sheet on phones, modal on desktop */}
      {open && (
        <div className="y-overlay" onClick={() => setOpen(false)}>
          <div
            className="y-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="y-sheet-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="y-grab" aria-hidden="true" />
            <div className="y-sheet-head">
              <h2 id="y-sheet-title" className={`y-h2 ${display.className}`}>
                RSVP
              </h2>
              <button type="button" className="y-close" onClick={() => setOpen(false)} aria-label="Close">
                ×
              </button>
            </div>

            <form className="y-form" onSubmit={(e) => e.preventDefault()}>
              <label className="y-field">
                <span>Your secret name</span>
                <input placeholder="Bench Philosopher, Room 3B, Aux Gremlin" />
                <em>This is all she sees</em>
              </label>

              <fieldset className="y-status">
                <legend>Are you coming</legend>
                <div>
                  {Object.entries(STATUS_LABEL).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setStatus(key)}
                      className={`y-pill${status === key ? " is-on" : ""}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="y-field">
                <span>A memory of you and Meera</span>
                <textarea rows={4} placeholder="She can't read it until the picnic." />
              </label>

              <div className="y-reveal">
                <p>Should she know it's you?</p>
                <div>
                  <button
                    type="button"
                    onClick={() => setReveal(false)}
                    className={`y-pill${!reveal ? " is-on" : ""}`}
                  >
                    Keep me a mystery
                  </button>
                  <button
                    type="button"
                    onClick={() => setReveal(true)}
                    className={`y-pill${reveal ? " is-on" : ""}`}
                  >
                    Fine, tell her
                  </button>
                </div>
                {reveal && (
                  <label className="y-field y-field-reveal">
                    <span>Your real name</span>
                    <input placeholder="Shown next to your secret name on the day" />
                  </label>
                )}
              </div>

              <button type="submit" className={`y-send ${display.className}`}>
                Seal it
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const CSS = `
.y-root {
  --yellow: #FFD23F;
  --cream: #FFF8E3;
  --ink: #17130D;
  --red: #E8402A;
  --blue: #1B4D8F;
  --soft: #7A7264;

  position: relative;
  z-index: 10;
  min-height: 100vh;
  background: var(--yellow);
  color: var(--ink);
  overflow-x: hidden;
  padding-bottom: 90px;
}

.y-strip { background: var(--ink); color: var(--yellow); overflow: hidden; padding: 8px 0; }
.y-strip-track {
  display: flex;
  gap: 22px;
  white-space: nowrap;
  font-size: 15px;
  letter-spacing: 0.14em;
  animation: y-slide 26s linear infinite;
}
@keyframes y-slide { to { transform: translateX(-50%); } }

.y-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

/* head */
.y-head { padding: clamp(28px, 5vw, 54px) 0 clamp(20px, 3vw, 32px); }
.y-eyebrow { margin: 0; font-size: clamp(14px, 2vw, 18px); letter-spacing: 0.3em; text-transform: uppercase; color: var(--red); }
.y-title { margin: 10px 0 0; display: flex; flex-direction: column; line-height: 0.84; }
.y-title span { font-size: clamp(52px, 15vw, 156px); letter-spacing: 0.005em; }
.y-title-out {
  color: transparent;
  -webkit-text-stroke: 2.5px var(--ink);
}
.y-title-hit { color: var(--red); }
.y-strap {
  margin: clamp(20px, 3vw, 28px) 0 0;
  max-width: 52ch;
  font-size: 16.5px;
  line-height: 1.7;
  font-weight: 500;
}

/* rows */
.y-rows { margin: 0; border-top: 3px solid var(--ink); }
.y-row {
  position: relative;
  display: grid;
  grid-template-columns: minmax(84px, 130px) 1fr auto;
  gap: 16px;
  align-items: baseline;
  padding: 16px 0;
  border-bottom: 3px solid var(--ink);
}
.y-row dt { font-size: clamp(17px, 2.4vw, 22px); text-transform: uppercase; letter-spacing: 0.06em; }
.y-row dd { margin: 0; display: flex; flex-direction: column; gap: 2px; }
.y-row dd strong { font-size: clamp(21px, 3.2vw, 32px); font-weight: 400; line-height: 1.05; }
.y-row dd span { font-size: 13.5px; color: var(--soft); }
.is-pending dd strong { color: var(--red); }
.y-pending {
  align-self: center;
  font-size: 13px;
  letter-spacing: 0.16em;
  padding: 4px 10px;
  border: 2.5px solid var(--red);
  color: var(--red);
  transform: rotate(-4deg);
}

/* secret */
.y-secret {
  margin-top: clamp(26px, 4vw, 40px);
  background: var(--ink);
  color: var(--cream);
  padding: clamp(22px, 4vw, 34px);
}
.y-h2 { margin: 0 0 10px; font-size: clamp(24px, 4vw, 38px); letter-spacing: 0.01em; text-transform: uppercase; }
.y-secret p { margin: 0; font-size: 15.5px; line-height: 1.75; max-width: 60ch; color: rgba(255,248,227,0.86); }

/* cta */
.y-cta { margin-top: clamp(26px, 4vw, 40px); display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
.y-big {
  cursor: pointer;
  font-size: clamp(30px, 5vw, 46px);
  letter-spacing: 0.06em;
  padding: 18px 56px;
  border: 4px solid var(--ink);
  background: var(--red);
  color: var(--cream);
  box-shadow: 8px 8px 0 var(--ink);
  transition: transform 140ms ease, box-shadow 140ms ease;
}
.y-big:hover { transform: translate(-3px, -3px); box-shadow: 11px 11px 0 var(--ink); }
.y-big:active { transform: translate(3px, 3px); box-shadow: 3px 3px 0 var(--ink); }
.y-cta-note { margin: 0; font-size: 14.5px; color: var(--soft); max-width: 26ch; }

/* sealed */
.y-sealed { margin-top: clamp(26px, 4vw, 40px); border-top: 3px solid var(--ink); padding-top: 16px; }
.y-sealed-k { margin: 0 0 12px; font-size: 15px; letter-spacing: 0.24em; text-transform: uppercase; }
.y-sealed ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
.y-sealed li {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  border: 2.5px solid var(--ink);
  background: var(--cream);
  padding: 7px 12px;
}
.y-sealed-name { font-size: 14px; font-weight: 600; }
.y-sealed-tag {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 3px 8px;
  background: var(--ink);
  color: var(--cream);
}
.y-tag-maybe { background: var(--red); }
.y-tag-cant { background: #C9C2B4; color: var(--ink); }

/* tear-off tabs */
.y-tear {
  margin-top: clamp(30px, 4vw, 46px);
  display: flex;
  gap: 0;
  border-top: 3px dashed var(--ink);
  overflow: hidden;
}
.y-tear span {
  flex: 1;
  min-width: 0;
  text-align: center;
  font-size: 11px;
  line-height: 1.35;
  letter-spacing: 0.08em;
  padding: 14px 4px;
  border-right: 2px dashed var(--ink);
  color: var(--soft);
}
.y-tear span:last-child { border-right: 0; }

/* sticky phone bar */
.y-sticky { display: none; }
@media (max-width: 640px) {
  .y-sticky {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
    display: block;
    padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
    background: rgba(255,210,63,0.94);
    backdrop-filter: blur(8px);
    border-top: 3px solid var(--ink);
  }
  .y-sticky-btn {
    cursor: pointer;
    width: 100%;
    font-size: 24px;
    letter-spacing: 0.06em;
    padding: 14px;
    border: 3px solid var(--ink);
    background: var(--red);
    color: var(--cream);
  }
}

/* overlay + sheet */
.y-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(23,19,13,0.55);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: y-fade 180ms ease;
}
@keyframes y-fade { from { opacity: 0; } to { opacity: 1; } }

.y-sheet {
  position: relative;
  width: min(100%, 520px);
  max-height: 88vh;
  overflow-y: auto;
  background: var(--cream);
  border: 4px solid var(--ink);
  box-shadow: 12px 12px 0 var(--ink);
  padding: clamp(22px, 4vw, 32px);
  animation: y-pop 220ms cubic-bezier(0.22, 1, 0.36, 1);
}
@keyframes y-pop { from { opacity: 0; transform: scale(0.94) translateY(10px); } to { opacity: 1; transform: none; } }

.y-grab { display: none; }
.y-sheet-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
.y-sheet-head .y-h2 { margin: 0; }
.y-close {
  cursor: pointer;
  width: 38px;
  height: 38px;
  font-size: 26px;
  line-height: 1;
  border: 3px solid var(--ink);
  background: transparent;
  color: var(--ink);
  transition: background 130ms ease, color 130ms ease;
}
.y-close:hover { background: var(--ink); color: var(--cream); }

/* phones: dock it to the bottom and slide up */
@media (max-width: 640px) {
  .y-overlay { align-items: flex-end; padding: 0; }
  .y-sheet {
    width: 100%;
    max-height: 90vh;
    border-width: 3px 0 0;
    box-shadow: none;
    border-radius: 22px 22px 0 0;
    padding-bottom: calc(24px + env(safe-area-inset-bottom));
    animation: y-up 260ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  @keyframes y-up { from { transform: translateY(100%); } to { transform: none; } }
  .y-grab {
    display: block;
    width: 46px;
    height: 5px;
    border-radius: 999px;
    background: rgba(23,19,13,0.28);
    margin: 0 auto 14px;
  }
}

/* form inside the sheet */
.y-form { display: flex; flex-direction: column; gap: 18px; }
.y-field { display: flex; flex-direction: column; gap: 6px; }
.y-field > span, .y-status legend, .y-reveal > p {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--soft);
}
.y-field em { font-style: normal; font-size: 13px; color: var(--red); font-weight: 600; }
.y-field input, .y-field textarea {
  font: inherit;
  font-size: 15.5px;
  background: #FFFFFF;
  border: 2.5px solid var(--ink);
  padding: 12px 14px;
  color: var(--ink);
  resize: vertical;
  border-radius: 0;
}
.y-field input::placeholder, .y-field textarea::placeholder { color: #ADA593; }
.y-field input:focus, .y-field textarea:focus { outline: none; box-shadow: 0 0 0 3px var(--yellow); }

.y-status { border: 0; margin: 0; padding: 0; }
.y-status legend { padding: 0 0 10px; }
.y-status > div, .y-reveal > div { display: flex; gap: 8px; flex-wrap: wrap; }
.y-pill {
  cursor: pointer;
  font: inherit;
  font-size: 14.5px;
  font-weight: 600;
  padding: 10px 18px;
  border: 2.5px solid var(--ink);
  background: transparent;
  color: var(--ink);
  transition: background 130ms ease, color 130ms ease;
}
.y-pill:hover { background: var(--yellow); }
.y-pill.is-on { background: var(--ink); color: var(--cream); }

.y-reveal { border: 2.5px dashed var(--ink); padding: 14px; display: flex; flex-direction: column; gap: 11px; }
.y-reveal > p { margin: 0; }

.y-send {
  cursor: pointer;
  font-size: 21px;
  letter-spacing: 0.06em;
  padding: 14px;
  border: 3px solid var(--ink);
  background: var(--red);
  color: var(--cream);
  transition: transform 130ms ease;
}
.y-send:hover { transform: translateY(-2px); }

@media (prefers-reduced-motion: reduce) {
  .y-root *, .y-strip-track, .y-sheet, .y-overlay { animation: none !important; transition: none !important; }
}
`;
