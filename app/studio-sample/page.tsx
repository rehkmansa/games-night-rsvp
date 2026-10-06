"use client";

/* THROWAWAY PREVIEW — direction A "Kinetic". Delete once a direction is picked. */

import { useEffect, useRef, useState } from "react";
import { Syne, Archivo } from "next/font/google";

const display = Syne({ subsets: ["latin"], weight: ["600", "700", "800"] });
const body = Archivo({ subsets: ["latin"] });

const GUESTS = [
  { secret: "Aux Gremlin", status: "coming", revealed: true, real: "Rehk" },
  { secret: "Bench Philosopher", status: "coming", revealed: false },
  { secret: "Room 3B", status: "coming", revealed: true, real: "Tobi" },
  { secret: "Perpetually Late", status: "maybe", revealed: false },
  { secret: "Uni Days Witness", status: "cant", revealed: false },
];

const STATUS_LABEL: Record<string, string> = {
  coming: "I'm in",
  maybe: "Maybe",
  cant: "Can't",
};

const STRIP = [
  { k: "01", h: "The date", v: "Sat 24 Oct", n: "Clear the day." },
  { k: "02", h: "The place", v: "Her estate", n: "Address drops closer to the day." },
  { k: "03", h: "The food", v: "Sorted", n: "She's handling food and drinks." },
  { k: "04", h: "The plan", v: "Games & gist", n: "Pictures too. Just bring yourself." },
  { k: "05", h: "Reply by", v: "Sat 17 Oct", n: "Especially if you can't come." },
];

const HERO = "HANNAH";

export default function KineticSample() {
  const [status, setStatus] = useState("coming");
  const [reveal, setReveal] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Horizontal strip driven by vertical scroll. One rAF-throttled listener
  // writes a CSS var; nothing re-renders React on scroll.
  useEffect(() => {
    const section = stripRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = section.getBoundingClientRect();
        const span = rect.height - window.innerHeight;
        if (span <= 0) return;
        const p = Math.min(1, Math.max(0, -rect.top / span));
        const distance = track.scrollWidth - window.innerWidth + 40;
        track.style.transform = `translate3d(${-p * Math.max(0, distance)}px,0,0)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Trailing cursor ring. Fine pointers only, so phones keep the native one.
  useEffect(() => {
    const dot = cursorRef.current;
    if (!dot) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const over = (e.target as HTMLElement)?.closest("button, a, input, textarea, label");
      dot.dataset.hot = over ? "1" : "0";
    };
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    dot.dataset.on = "1";
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`k-root ${body.className}`}>
      <style>{CSS}</style>

      <div ref={cursorRef} className="k-cursor" data-on="0" aria-hidden="true" />
      <div className="k-blobs" aria-hidden="true">
        <span className="k-blob k-blob-1" />
        <span className="k-blob k-blob-2" />
        <span className="k-blob k-blob-3" />
      </div>
      <div className="k-grain" aria-hidden="true" />

      {/* hero */}
      <header className="k-hero">
        <p className="k-eyebrow">
          <span>Birthday hangout</span>
          <i />
          <span>Faleti Hannah</span>
        </p>

        <h1 className={`k-title ${display.className}`} aria-label="Hannah">
          {HERO.split("").map((ch, i) => (
            <span key={`${ch}-${i}`} style={{ animationDelay: `${0.06 * i + 0.1}s` }}>
              {ch}
            </span>
          ))}
        </h1>

        <div className="k-hero-foot">
          <p className={`k-hero-date ${display.className}`}>24.10.26</p>
          <p className="k-hero-note">
            Food, drinks, games and gist are handled. The only thing she needs is an early answer.
          </p>
        </div>

        <div className="k-scroll" aria-hidden="true">
          <span>scroll</span>
          <i />
        </div>
      </header>

      {/* scroll-driven strip */}
      <section ref={stripRef} className="k-strip">
        <div className="k-strip-sticky">
          <div ref={trackRef} className="k-track">
            {STRIP.map((s) => (
              <article key={s.k} className="k-panel">
                <span className="k-panel-k">{s.k}</span>
                <span className="k-panel-h">{s.h}</span>
                <strong className={`k-panel-v ${display.className}`}>{s.v}</strong>
                <span className="k-panel-n">{s.n}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* mechanic */}
      <section className="k-secret">
        <h2 className={`k-h2 ${display.className}`}>
          Leave a fond
          <span>memory.</span>
        </h2>
        <p>
          Your reply carries a memory of the two of you, signed with a secret name. Hannah sees the
          memory, never who sent it, until she opens them all at once and has to guess who wrote
          what.
        </p>
      </section>

      {/* rsvp */}
      <section className="k-rsvp">
        <form onSubmit={(e) => e.preventDefault()}>
          <h2 className={`k-h2 k-form-h2 ${display.className}`}>Reply</h2>

          <fieldset className="k-status">
            <legend>Are you coming</legend>
            <div>
              {Object.entries(STATUS_LABEL).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setStatus(key)}
                  className={`k-chip${status === key ? " is-on" : ""}`}
                >
                  {label}
                </button>
              ))}
            </div>
            {status === "cant" && (
              <p className="k-early">Thanks for saying early. It genuinely helps her plan.</p>
            )}
          </fieldset>

          <label className="k-field">
            <span>Secret name</span>
            <input placeholder="Aux Gremlin, Room 3B, Person From Church" />
          </label>

          <label className="k-field">
            <span>A memory of you and Hannah</span>
            <textarea rows={4} placeholder="She can't read it until she opens them." />
          </label>

          <div className="k-reveal">
            <p>Should she know it&apos;s you?</p>
            <div>
              <button
                type="button"
                onClick={() => setReveal(false)}
                className={`k-chip${!reveal ? " is-on" : ""}`}
              >
                Keep me a mystery
              </button>
              <button
                type="button"
                onClick={() => setReveal(true)}
                className={`k-chip${reveal ? " is-on" : ""}`}
              >
                Tell her
              </button>
            </div>
            {reveal && (
              <label className="k-field k-field-reveal">
                <span>Your real name</span>
                <input placeholder="Shown next to your secret name" />
              </label>
            )}
          </div>

          <label className="k-photo">
            <input type="checkbox" />
            <span>Photos and videos are happening. Tick if you&apos;d rather not be in them.</span>
          </label>

          <button type="submit" className={`k-send ${display.className}`}>
            Send it
            <i aria-hidden="true">→</i>
          </button>
        </form>
      </section>

      {/* wall */}
      <section className="k-wall">
        <h2 className={`k-h2 ${display.className}`}>{GUESTS.length} replies</h2>
        <ul>
          {GUESTS.map((g) => (
            <li key={g.secret}>
              <span className={`k-wall-name ${display.className}`}>{g.secret}</span>
              <span className="k-wall-real">
                {g.revealed ? `aka ${g.real}` : "still a mystery"}
              </span>
              <span className={`k-wall-tag k-tag-${g.status}`}>{STATUS_LABEL[g.status]}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const CSS = `
.k-root {
  --ink: #08080C;
  --bone: #EFEAE1;
  --molten: #FF4D17;
  --violet: #6C4DF6;
  --dim: rgba(239,234,225,0.52);

  position: relative;
  z-index: 10;
  min-height: 100vh;
  background: var(--ink);
  color: var(--bone);
  /* clip, NOT hidden: overflow-x:hidden makes the block axis a scroll
     container, which silently breaks position:sticky on .k-strip-sticky and
     the horizontal panels never pin. clip contains the blobs without that. */
  overflow-x: clip;
}
@media (pointer: fine) {
  .k-root, .k-root * { cursor: none; }
}

/* atmosphere */
.k-blobs { position: fixed; inset: 0; pointer-events: none; overflow: hidden; }
.k-blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.5; }
.k-blob-1 { width: 46vw; height: 46vw; background: var(--molten); top: -12%; left: -8%; animation: k-drift-a 22s ease-in-out infinite; }
.k-blob-2 { width: 38vw; height: 38vw; background: var(--violet); bottom: -10%; right: -6%; animation: k-drift-b 28s ease-in-out infinite; }
.k-blob-3 { width: 28vw; height: 28vw; background: #1FBFA0; top: 44%; left: 52%; opacity: 0.32; animation: k-drift-a 34s ease-in-out infinite reverse; }
@keyframes k-drift-a { 0%,100% { transform: translate(0,0); } 50% { transform: translate(8vw, 6vh); } }
@keyframes k-drift-b { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-7vw, -5vh); } }

.k-grain {
  position: fixed;
  inset: -50%;
  pointer-events: none;
  z-index: 2;
  opacity: 0.17;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: k-shift 0.6s steps(3) infinite;
}
@keyframes k-shift {
  0% { transform: translate(0,0); }
  33% { transform: translate(-3%, 2%); }
  66% { transform: translate(2%, -3%); }
  100% { transform: translate(0,0); }
}

/* cursor */
.k-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 26px;
  height: 26px;
  border: 1.5px solid var(--bone);
  border-radius: 50%;
  pointer-events: none;
  z-index: 90;
  opacity: 0;
  mix-blend-mode: difference;
  transition: width 200ms ease, height 200ms ease, background 200ms ease;
}
.k-cursor[data-on="1"] { opacity: 1; }
.k-cursor[data-hot="1"] { width: 54px; height: 54px; background: var(--bone); }

/* hero */
.k-hero {
  position: relative;
  z-index: 3;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(28px, 6vw, 72px) clamp(18px, 4vw, 54px);
}
.k-eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0;
  font-size: 11.5px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--dim);
  animation: k-fade 0.9s ease both;
}
.k-eyebrow i { flex: 1; max-width: 120px; height: 1px; background: currentColor; opacity: 0.5; }
@keyframes k-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

.k-title {
  /* Syne 800 measures ~1.2x font-size per glyph, so six letters need 7.2x.
     12.2vw keeps HANNAH inside the padded viewport; space-between then
     justifies it edge to edge instead of leaving a ragged right. */
  margin: clamp(10px, 2vw, 22px) 0 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: clamp(2.6rem, 12.2vw, 11rem);
  line-height: 0.82;
  letter-spacing: -0.045em;
  font-weight: 800;
}
.k-title span {
  display: inline-block;
  animation: k-rise 1s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes k-rise { from { opacity: 0; transform: translateY(0.4em) rotate(4deg); } to { opacity: 1; transform: none; } }

.k-hero-foot {
  margin-top: clamp(20px, 3vw, 34px);
  display: flex;
  gap: clamp(18px, 4vw, 50px);
  align-items: flex-end;
  flex-wrap: wrap;
  animation: k-fade 0.9s 0.5s ease both;
}
.k-hero-date { margin: 0; font-size: clamp(1.5rem, 3.4vw, 2.6rem); color: var(--molten); letter-spacing: -0.02em; }
.k-hero-note { margin: 0; max-width: 40ch; font-size: 15px; line-height: 1.7; color: var(--dim); }

.k-scroll {
  position: absolute;
  bottom: clamp(20px, 4vw, 38px);
  right: clamp(18px, 4vw, 54px);
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 10.5px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--dim);
}
.k-scroll i { width: 46px; height: 1px; background: currentColor; transform-origin: left; animation: k-pull 1.9s ease-in-out infinite; }
@keyframes k-pull { 0%,100% { transform: scaleX(0.3); } 50% { transform: scaleX(1); } }

/* horizontal strip */
.k-strip { position: relative; z-index: 3; height: 320vh; }
.k-strip-sticky {
  position: sticky;
  top: 0;
  height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.k-track {
  display: flex;
  gap: clamp(14px, 2vw, 26px);
  padding: 0 clamp(18px, 4vw, 54px);
  will-change: transform;
}
.k-panel {
  flex: none;
  width: min(78vw, 400px);
  min-height: 46vh;
  padding: clamp(22px, 3vw, 34px);
  border: 1px solid rgba(239,234,225,0.18);
  background: rgba(239,234,225,0.04);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.k-panel-k { font-size: 11px; letter-spacing: 0.26em; color: var(--molten); }
.k-panel-h { font-size: 11px; letter-spacing: 0.26em; text-transform: uppercase; color: var(--dim); }
.k-panel-v { margin-top: auto; font-size: clamp(2rem, 4.4vw, 3.2rem); line-height: 1.02; letter-spacing: -0.03em; }
.k-panel-n { font-size: 14.5px; line-height: 1.65; color: var(--dim); }

/* secret */
.k-secret {
  position: relative;
  z-index: 3;
  padding: clamp(60px, 12vw, 150px) clamp(18px, 4vw, 54px);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(20px, 4vw, 50px);
  align-items: end;
}
.k-h2 {
  margin: 0;
  font-size: clamp(2.1rem, 6vw, 4.6rem);
  line-height: 0.98;
  letter-spacing: -0.035em;
}
.k-h2 span { display: block; color: var(--molten); }
.k-secret p { margin: 0; font-size: 16px; line-height: 1.75; color: var(--dim); max-width: 46ch; }

/* form */
.k-rsvp { position: relative; z-index: 3; padding: 0 clamp(18px, 4vw, 54px) clamp(50px, 8vw, 100px); }
.k-rsvp form { max-width: 620px; display: flex; flex-direction: column; gap: 22px; }
.k-form-h2 { margin-bottom: 4px; }
.k-field { display: flex; flex-direction: column; gap: 8px; }
.k-field > span, .k-status legend, .k-reveal > p {
  font-size: 10.5px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--dim);
}
.k-field input, .k-field textarea {
  font: inherit;
  font-size: 16px;
  background: transparent;
  border: 0;
  border-bottom: 1px solid rgba(239,234,225,0.3);
  padding: 12px 2px;
  color: var(--bone);
  border-radius: 0;
  resize: vertical;
  transition: border-color 200ms ease;
}
.k-field textarea { border: 1px solid rgba(239,234,225,0.3); padding: 14px; }
.k-field input::placeholder, .k-field textarea::placeholder { color: rgba(239,234,225,0.3); }
.k-field input:focus, .k-field textarea:focus { outline: none; border-color: var(--molten); }

.k-status { border: 0; margin: 0; padding: 0; }
.k-status legend { padding: 0 0 12px; }
.k-status > div, .k-reveal > div { display: flex; gap: 10px; flex-wrap: wrap; }
.k-chip {
  font: inherit;
  font-size: 14.5px;
  padding: 11px 22px;
  border: 1px solid rgba(239,234,225,0.3);
  background: transparent;
  color: var(--dim);
  border-radius: 999px;
  transition: color 200ms ease, border-color 200ms ease, background 200ms ease;
}
.k-chip:hover { color: var(--bone); border-color: var(--bone); }
.k-chip.is-on { background: var(--bone); border-color: var(--bone); color: var(--ink); }
.k-early { margin: 12px 0 0; font-size: 14.5px; color: #1FBFA0; }

.k-reveal { display: flex; flex-direction: column; gap: 12px; }
.k-reveal > p { margin: 0; }

.k-photo {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--dim);
}
.k-photo input { margin-top: 3px; accent-color: var(--molten); }

.k-send {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-size: 17px;
  padding: 16px 34px;
  border: 0;
  border-radius: 999px;
  background: var(--molten);
  color: #FFF6F2;
  transition: gap 220ms ease, background 220ms ease;
}
.k-send:hover { gap: 24px; background: #E63F0D; }

/* wall */
.k-wall { position: relative; z-index: 3; padding: 0 clamp(18px, 4vw, 54px) clamp(60px, 10vw, 120px); }
.k-wall ul { list-style: none; margin: 22px 0 0; padding: 0; border-top: 1px solid rgba(239,234,225,0.16); }
.k-wall li {
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid rgba(239,234,225,0.16);
  flex-wrap: wrap;
  transition: padding-left 240ms ease;
}
.k-wall li:hover { padding-left: 12px; }
.k-wall-name { font-size: clamp(1.1rem, 2.2vw, 1.5rem); letter-spacing: -0.02em; }
.k-wall-real { flex: 1; font-size: 13.5px; color: var(--dim); }
.k-wall-tag {
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 999px;
  border: 1px solid rgba(239,234,225,0.3);
  color: var(--dim);
}
.k-tag-coming { border-color: var(--molten); color: var(--molten); }

@media (prefers-reduced-motion: reduce) {
  .k-root *, .k-blob, .k-grain, .k-title span, .k-scroll i { animation: none !important; transition: none !important; }
  .k-strip { height: auto; }
  .k-strip-sticky { position: static; height: auto; overflow-x: auto; }
  .k-track { transform: none !important; }
}
`;
