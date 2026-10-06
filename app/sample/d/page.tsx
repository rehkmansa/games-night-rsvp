"use client";

/* THROWAWAY PREVIEW — direction D "Envelope". Delete once a direction is picked. */

import { useState } from "react";
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
  const [status, setStatus] = useState("coming");
  const [reveal, setReveal] = useState(false);

  return (
    <div className={`v-root ${body.className}`}>
      <style>{CSS}</style>

      <section className="v-stage">
        <div className="v-banner">
          <div className="v-banner-main">
            <p className="v-card-k">You&apos;re invited to</p>
            <h1 className={`v-card-title ${display.className}`}>
              Birthday Hangout
              <span>for Hannah</span>
            </h1>
            <p className={`v-card-date ${display.className}`}>Saturday, 24 October</p>
          </div>

          <dl className="v-banner-rows">
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
  /* was 88svh of envelope; a banner that ends well inside the first screen so
     the memory copy and the form are visible without scrolling */
  padding: clamp(26px, 5vw, 56px) 20px 0;
  max-width: 820px;
  margin: 0 auto;
}

.v-banner {
  display: flex;
  flex-direction: column;
  background: var(--navy);
  color: var(--paper);
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 24px 50px -30px rgba(20,26,43,0.7);
}
.v-banner-main { padding: clamp(22px, 4vw, 34px) clamp(20px, 3.6vw, 36px) clamp(18px, 3vw, 26px); }

.v-card-k { margin: 0; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); }
.v-card-title { margin: 8px 0 0; display: flex; flex-direction: column; font-weight: 500; line-height: 1.04; }
.v-card-title { font-size: clamp(1.75rem, 5.4vw, 2.6rem); }
.v-card-title span { font-size: clamp(1rem, 2.4vw, 1.2rem); font-style: italic; color: var(--gold); margin-top: 4px; }
.v-card-date { margin: 12px 0 0; font-size: clamp(1rem, 2.4vw, 1.2rem); color: rgba(244,241,236,0.9); }

.v-banner-rows {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  background: rgba(244,241,236,0.1);
}
.v-banner-rows > div {
  padding: clamp(14px, 2.4vw, 18px) clamp(16px, 3vw, 22px);
  border-top: 1px solid rgba(244,241,236,0.14);
  border-right: 1px solid rgba(244,241,236,0.14);
}
.v-banner-rows > div:last-child { border-right: 0; }
.v-banner-rows dt { font-size: 9.5px; letter-spacing: 0.26em; text-transform: uppercase; color: var(--gold); }
.v-banner-rows dd { margin: 4px 0 0; font-size: 14.5px; line-height: 1.25; }
.v-banner-rows em { display: block; font-style: normal; font-size: 11.5px; color: rgba(244,241,236,0.6); margin-top: 3px; }

/* sections */
.v-secret, .v-form-wrap, .v-wall { max-width: 760px; margin: 0 auto; padding: 0 20px; }
.v-secret { padding-top: clamp(26px, 4vw, 50px); }
.v-h2 { margin: 0 0 10px; font-size: clamp(1.6rem, 3.6vw, 2.3rem); font-weight: 500; }
.v-secret p { margin: 0; font-size: 16px; line-height: 1.75; color: var(--dim); max-width: 58ch; }

.v-form-wrap { padding-top: clamp(30px, 5vw, 58px); scroll-margin-top: 24px; }
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
  .v-root * { transition: none !important; animation: none !important; }
}
`;
