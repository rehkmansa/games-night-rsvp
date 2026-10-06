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
    const t = setTimeout(() => setOpen(true), 220);
    return () => clearTimeout(t);
  }, []);
  const [status, setStatus] = useState("coming");
  const [reveal, setReveal] = useState(false);
  const [step, setStep] = useState(0);

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

        <div className="v-cta">
          <a href="#rsvp" className="v-cta-main">
            RSVP
            <i aria-hidden="true">↓</i>
          </a>
          <button type="button" className="v-open" onClick={() => setOpen((o) => !o)}>
            {open ? "Close it" : "Open it again"}
          </button>
        </div>
      </section>

      <section className="v-secret">
        <h2 className={`v-h2 ${display.className}`}>Leave a fond memory</h2>
        <p>
          Leave Hannah a memory from the two of you. Keep it personal, and sign it with a secret
          name. She&apos;ll see the name, but not who it belongs to, until she opens them all and
          starts guessing.
        </p>
      </section>

      <section className="v-form-wrap" id="rsvp">
        <form className="v-steps" onSubmit={(e) => e.preventDefault()}>
          <header className="v-steps-head">
            <span className={`v-steps-k ${display.className}`}>RSVP</span>
            <span className="v-steps-count">{step + 1} of 3</span>
            <span className="v-steps-bar" aria-hidden="true">
              <i style={{ width: `${((step + 1) / 3) * 100}%` }} />
            </span>
          </header>

          <div className="v-steps-body">
            {step === 0 && (
              <div className="v-step">
                <p className="v-step-q">Are you coming?</p>
                <div className="v-step-opts">
                  {Object.entries(STATUS_LABEL).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setStatus(key);
                        setStep(1);
                      }}
                      className={`v-opt${status === key ? " is-on" : ""}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {status === "cant" && (
                  <p className="v-early">Thank you for saying early. It really helps her plan.</p>
                )}
              </div>
            )}

            {step === 1 && (
              <div className="v-step">
                <p className="v-step-q">Sign it with a secret name</p>
                <input
                  className="v-step-input"
                  placeholder="Aux Gremlin"
                  autoFocus
                />
                <p className="v-step-hint">She sees this, not your real name.</p>
                <textarea
                  className="v-step-input v-step-area"
                  rows={3}
                  placeholder="Now the memory. Keep it personal."
                />
              </div>
            )}

            {step === 2 && (
              <div className="v-step">
                <p className="v-step-q">Should she know it&apos;s you?</p>
                <div className="v-step-opts">
                  <button
                    type="button"
                    onClick={() => setReveal(false)}
                    className={`v-opt${!reveal ? " is-on" : ""}`}
                  >
                    Keep me a mystery
                  </button>
                  <button
                    type="button"
                    onClick={() => setReveal(true)}
                    className={`v-opt${reveal ? " is-on" : ""}`}
                  >
                    Tell her
                  </button>
                </div>
                {reveal && (
                  <input className="v-step-input" placeholder="Your real name" autoFocus />
                )}
                <label className="v-photo">
                  <input type="checkbox" />
                  <span>I&apos;d rather not be in the photos or videos.</span>
                </label>
              </div>
            )}
          </div>

          <footer className="v-steps-foot">
            {step > 0 ? (
              <button type="button" className="v-back" onClick={() => setStep(step - 1)}>
                Back
              </button>
            ) : (
              <span />
            )}
            {step < 2 ? (
              <button type="button" className="v-next" onClick={() => setStep(step + 1)}>
                Next
              </button>
            ) : (
              <button type="submit" className="v-next">
                Send it
              </button>
            )}
          </footer>
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
  /* deliberately under a full viewport: the top of the next section has to
     peek above the fold or nobody scrolls and the RSVP never gets filled */
  min-height: 88svh;
  padding-top: clamp(54px, 8vw, 92px);
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
  transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1) 90ms, opacity 260ms ease 90ms;
  box-shadow: 0 -14px 34px -20px rgba(20,26,43,0.55);
}
.v-env.is-open .v-card { transform: translateY(-54%); opacity: 1; }

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
  transition: transform 540ms cubic-bezier(0.22, 1, 0.36, 1);
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

.v-cta { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.v-cta-main {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 16px 42px;
  border-radius: 999px;
  background: var(--navy);
  color: var(--paper);
  box-shadow: 0 14px 30px -14px rgba(20,26,43,0.75);
  transition: background 200ms ease, transform 200ms ease;
}
.v-cta-main:hover { background: var(--gold); transform: translateY(-2px); }
.v-cta-main i { font-style: normal; animation: v-nudge 1.8s ease-in-out infinite; }
@keyframes v-nudge { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(4px); } }

.v-open {
  cursor: pointer;
  font: inherit;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  padding: 6px 4px;
  border: 0;
  background: transparent;
  color: var(--dim);
  text-decoration: underline;
  text-underline-offset: 4px;
  transition: color 200ms ease;
}
.v-open:hover { color: var(--navy); }

/* sections */
.v-secret, .v-form-wrap, .v-wall { max-width: 760px; margin: 0 auto; padding: 0 20px; }
.v-secret { padding-top: clamp(26px, 4vw, 50px); }
.v-h2 { margin: 0 0 10px; font-size: clamp(1.6rem, 3.6vw, 2.3rem); font-weight: 500; }
.v-secret p { margin: 0; font-size: 16px; line-height: 1.75; color: var(--dim); max-width: 58ch; }

.v-form-wrap { padding-top: clamp(26px, 4vw, 48px); scroll-margin-top: 20px; }

/* One question per screen. The stacked version ran ~700px on a phone, which
   put the send button two thumb-scrolls below the question. */
.v-steps {
  background: #FFFDFA;
  border: 1px solid rgba(20,26,43,0.14);
  border-radius: 4px;
  box-shadow: 0 18px 40px -26px rgba(20,26,43,0.5);
  display: flex;
  flex-direction: column;
}
.v-steps-head {
  position: relative;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: clamp(16px, 3vw, 22px) clamp(18px, 3.4vw, 28px) 14px;
}
.v-steps-k { font-size: clamp(1.1rem, 2.6vw, 1.4rem); }
.v-steps-count { font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--dim); }
.v-steps-bar { position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: rgba(20,26,43,0.1); }
.v-steps-bar i { display: block; height: 100%; background: var(--gold); transition: width 320ms ease; }

.v-steps-body { padding: clamp(18px, 3.4vw, 26px) clamp(18px, 3.4vw, 28px); min-height: 150px; }
.v-step { display: flex; flex-direction: column; gap: 12px; animation: v-slide 320ms ease both; }
@keyframes v-slide { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: none; } }
.v-step-q { margin: 0; font-size: clamp(1.05rem, 2.4vw, 1.25rem); }
.v-step-hint { margin: -4px 0 0; font-size: 13px; color: var(--dim); }
.v-step-opts { display: flex; gap: 8px; flex-wrap: wrap; }
.v-opt {
  cursor: pointer;
  font: inherit;
  font-size: 15px;
  /* 48px tall: thumb-sized, not mouse-sized */
  padding: 14px 20px;
  min-height: 48px;
  border: 1px solid rgba(20,26,43,0.24);
  background: transparent;
  color: var(--navy);
  border-radius: 999px;
  transition: background 180ms ease, color 180ms ease, border-color 180ms ease;
}
.v-opt:hover { border-color: var(--navy); }
.v-opt.is-on { background: var(--navy); border-color: var(--navy); color: var(--paper); }

.v-step-input {
  font: inherit;
  /* 16px keeps iOS from zooming the viewport on focus */
  font-size: 16px;
  width: 100%;
  background: #FFFFFF;
  border: 1px solid rgba(20,26,43,0.22);
  border-radius: 2px;
  padding: 14px 15px;
  color: var(--navy);
}
.v-step-area { resize: vertical; line-height: 1.5; }
.v-step-input::placeholder { color: #ABA7B6; }
.v-step-input:focus { outline: none; border-color: var(--gold); }
.v-early { margin: 0; font-size: 14px; color: var(--gold); }

.v-photo {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 14px;
  line-height: 1.5;
  color: var(--dim);
  cursor: pointer;
}
.v-photo input { margin-top: 2px; accent-color: var(--gold); cursor: pointer; }

.v-steps-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 clamp(18px, 3.4vw, 28px) clamp(18px, 3vw, 24px);
}
.v-back {
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background: transparent;
  border: 0;
  color: var(--dim);
  padding: 10px 2px;
}
.v-back:hover { color: var(--navy); }
.v-next {
  cursor: pointer;
  font: inherit;
  font-size: 15px;
  min-height: 48px;
  padding: 14px 34px;
  border: 0;
  border-radius: 999px;
  background: var(--navy);
  color: var(--paper);
  transition: background 180ms ease;
}
.v-next:hover { background: var(--gold); }

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
  .v-root *, .v-flap, .v-card, .v-cta-main i { transition: none !important; animation: none !important; }
  .v-card { transform: translateY(-54%); opacity: 1; }
}
`;
