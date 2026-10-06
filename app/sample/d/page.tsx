"use client";

/* THROWAWAY PREVIEW — direction D "Envelope". Delete once a direction is picked. */

import { useEffect, useState } from "react";
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

const DETAILS = [
  { k: "Where", v: "Within her estate", n: "Exact address closer to the day" },
  { k: "Food", v: "Handled", n: "Food and drinks are on her" },
  { k: "Plan", v: "Games and gist", n: "Pictures too" },
  { k: "Reply by", v: "Sat 17 October", n: "Especially if you can't come" },
];

export default function EnvelopeSample() {
  const [open, setOpen] = useState(false);

  // Opens itself shortly after load. Nobody should have to work out that the
  // envelope is a button before they can read the invite; the toggle below is
  // only there to replay it.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(true);
      return;
    }
    const t = setTimeout(() => setOpen(true), 650);
    return () => clearTimeout(t);
  }, []);
  const [status, setStatus] = useState("coming");
  const [reveal, setReveal] = useState(false);

  return (
    <div className={`v-root ${body.className}`}>
      <style>{CSS}</style>

      <section className="v-stage">
        <p className="v-above">An invitation</p>

        {/* landscape envelope: flap lifts, card slides out */}
        <div className={`v-env${open ? " is-open" : ""}`}>
          <div className="v-env-body" aria-hidden="true" />

          <div className="v-card">
              <p className="v-card-k">You&apos;re invited to</p>
              <h1 className={`v-card-title ${display.className}`}>
                Birthday Hangout
                <span>for Hannah</span>
              </h1>
              <p className={`v-card-date ${display.className}`}>Saturday, 24 October</p>
              <dl className="v-card-rows">
                {DETAILS.map((d) => (
                  <div key={d.k}>
                    <dt>{d.k}</dt>
                    <dd>
                      {d.v}
                      <em>{d.n}</em>
                    </dd>
                  </div>
                ))}
              </dl>
          </div>

          <div className="v-flap" aria-hidden="true">
            <span className="v-wax" />
          </div>
          <div className="v-pocket" aria-hidden="true" />
        </div>

        <button type="button" className="v-open" onClick={() => setOpen((o) => !o)}>
          {open ? "Close it" : "Open it again"}
        </button>
      </section>

      <section className="v-secret">
        <h2 className={`v-h2 ${display.className}`}>Leave a fond memory</h2>
        <p>
          Leave Hannah a memory from the two of you. Keep it personal, and sign it with a secret
          name. She&apos;ll see the name, but not who it belongs to, until she opens them all and
          starts guessing.
        </p>
      </section>

      <section className="v-form-wrap">
        <form onSubmit={(e) => e.preventDefault()}>
          <h2 className={`v-h2 ${display.className}`}>RSVP</h2>

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
          {GUESTS.map((g) => (
            <li key={g.secret}>
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

.v-stage {
  min-height: 100svh;
  padding-top: clamp(60px, 10vw, 120px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(16px, 3vw, 26px);
  padding: clamp(28px, 5vw, 60px) 20px;
  perspective: 1600px;
}
.v-above { margin: 0; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--dim); }

/* landscape envelope */
.v-env {
  position: relative;
  width: min(100%, 720px);
  aspect-ratio: 1.62;
  transform-style: preserve-3d;
}
.v-env-body {
  position: absolute;
  inset: 0;
  background: var(--navy);
  box-shadow: 0 30px 60px -30px rgba(20,26,43,0.65);
}

/* the card rides up out of the pocket when the flap lifts */
/* The card is a sibling of the envelope wall, not a child of it: inside an
   overflow:hidden body it got clipped, and the pocket ate the last row. Out
   here it can ride clear of the top edge the way a real card would. */
.v-card {
  position: absolute;
  left: 4%;
  right: 4%;
  bottom: 7%;
  z-index: 1;
  background: #FFFDFA;
  border: 1px solid rgba(20,26,43,0.12);
  padding: clamp(16px, 2.6vw, 26px) clamp(18px, 3vw, 32px);
  transform: translateY(8%);
  opacity: 0;
  transition: transform 780ms cubic-bezier(0.22, 1, 0.36, 1) 180ms, opacity 360ms ease 180ms;
  box-shadow: 0 -14px 34px -20px rgba(20,26,43,0.55);
}
.v-env.is-open .v-card { transform: translateY(-64%); opacity: 1; }

.v-card-k { margin: 0; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); }
.v-card-title { margin: 6px 0 0; display: flex; flex-direction: column; font-weight: 500; line-height: 1.04; }
.v-card-title { font-size: clamp(1.5rem, 3.4vw, 2.3rem); }
.v-card-title span { font-size: clamp(0.95rem, 1.9vw, 1.2rem); font-style: italic; color: var(--gold); margin-top: 4px; }
.v-card-date { margin: 10px 0 0; font-size: clamp(0.95rem, 2vw, 1.15rem); }

.v-card-rows {
  margin: clamp(10px, 1.6vw, 14px) 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px 20px;
  border-top: 1px solid rgba(20,26,43,0.14);
  padding-top: clamp(12px, 2vw, 16px);
}
.v-card-rows dt { font-size: 9.5px; letter-spacing: 0.26em; text-transform: uppercase; color: var(--gold); }
.v-card-rows dd { margin: 3px 0 0; font-size: 14px; line-height: 1.3; }
.v-card-rows em { display: block; font-style: normal; font-size: 11.5px; color: var(--dim); margin-top: 2px; }

/* flap folds up and back */
.v-flap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 56%;
  background: linear-gradient(170deg, #1B2238, #141A2B);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  transform-origin: top center;
  transform: rotateX(0deg);
  transition: transform 780ms cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 3;
  backface-visibility: hidden;
}
.v-env.is-open .v-flap { transform: rotateX(-172deg); z-index: 0; }
.v-env.is-open .v-env-body { box-shadow: 0 24px 46px -28px rgba(20,26,43,0.5); }

.v-wax {
  position: absolute;
  left: 50%;
  top: 76%;
  width: 46px;
  height: 46px;
  margin-left: -23px;
  border-radius: 50%;
  background: radial-gradient(circle at 36% 32%, #C9974F, var(--gold));
  box-shadow: 0 3px 10px rgba(0,0,0,0.35);
}

/* front pocket of the envelope, sits over the card's lower edge */
.v-pocket {
  position: absolute;
  inset: auto 0 0;
  height: 44%;
  background: linear-gradient(0deg, #171E31, #1B2238);
  z-index: 2;
  clip-path: polygon(0 36%, 50% 0, 100% 36%, 100% 100%, 0 100%);
}

.v-open {
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  padding: 13px 30px;
  border: 1px solid var(--navy);
  background: transparent;
  color: var(--navy);
  border-radius: 999px;
  transition: background 200ms ease, color 200ms ease;
}
.v-open:hover { background: var(--navy); color: var(--paper); }

/* sections */
.v-secret, .v-form-wrap, .v-wall { max-width: 760px; margin: 0 auto; padding: 0 20px; }
.v-secret { padding-top: clamp(26px, 4vw, 50px); }
.v-h2 { margin: 0 0 10px; font-size: clamp(1.6rem, 3.6vw, 2.3rem); font-weight: 500; }
.v-secret p { margin: 0; font-size: 16px; line-height: 1.75; color: var(--dim); max-width: 58ch; }

.v-form-wrap { padding-top: clamp(30px, 5vw, 58px); }
.v-form-wrap form { display: flex; flex-direction: column; gap: 22px; }
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
  position: relative;
  z-index: 2;
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
  .v-root *, .v-flap, .v-card { transition: none !important; animation: none !important; }
  .v-card { transform: translateY(-64%); opacity: 1; }
}
`;
