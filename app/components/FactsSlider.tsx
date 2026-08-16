"use client";

import { useEffect, useRef, useState } from "react";
import type { Rsvp } from "../lib/types";

const CARD_COLORS = ["bg-yellow", "bg-cyan", "bg-lime", "bg-violet/80", "bg-orange/90"];
const TILTS = ["tilt-left", "tilt-right", "tilt-more-left", "tilt-more-right"];

const STATUS_LABEL: Record<Rsvp["status"], string> = {
  coming: "🔥 locked in",
  maybe: "🤔 on the fence",
  cant: "💀 bailed",
};

const AUTO_ADVANCE_MS = 4000;

export function FactsSlider({ rsvps }: { rsvps: Rsvp[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    if (slides.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setActive(idx);
          }
        }
      },
      { root: trackRef.current, threshold: 0.6 }
    );

    slides.forEach((slide) => {
      observer.observe(slide);
    });
    return () => observer.disconnect();
  }, [rsvps.length]);

  const goTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(rsvps.length - 1, idx));
    slideRefs.current[clamped]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  // Auto-advance through the slides, wrapping back to the start. Re-arms each
  // time the active slide changes; pauses while the user is interacting.
  useEffect(() => {
    if (paused || rsvps.length <= 1) return;
    const next = (active + 1) % rsvps.length;
    const timer = setTimeout(() => {
      slideRefs.current[next]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [active, paused, rsvps.length]);

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {rsvps.map((rsvp, idx) => {
          const color = CARD_COLORS[idx % CARD_COLORS.length];
          const tilt = TILTS[idx % TILTS.length];
          return (
            <div
              key={rsvp.id}
              data-index={idx}
              ref={(el) => {
                slideRefs.current[idx] = el;
              }}
              className="snap-start shrink-0 w-full px-2 sm:px-6 py-4 flex justify-center"
            >
              <div
                className={`${color} ${tilt} w-full max-w-2xl border-[3px] border-ink rounded-3xl p-6 sm:p-10 hard-shadow-lg flex flex-col`}
              >
                <div className="font-marker text-xs uppercase tracking-wide bg-ink text-paper self-start px-3 py-1 rounded-full">
                  {STATUS_LABEL[rsvp.status]}
                </div>

                <div className="font-display uppercase text-5xl sm:text-7xl leading-none mt-5">
                  {rsvp.secretName}
                </div>
                <div className="font-marker text-sm sm:text-base text-ink/70 mt-2">
                  a.k.a. {rsvp.realName ?? "identity withheld"}
                </div>

                <div className="mt-6 border-t-2 border-dashed border-ink/40 pt-5">
                  <div className="font-marker text-xs uppercase text-ink/60 mb-2">
                    the unsealed fact 🔓
                  </div>
                  <p className="font-body text-xl sm:text-3xl leading-snug">
                    {rsvp.wish}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous fact"
          className="font-display text-2xl bg-paper border-[3px] border-ink rounded-full w-12 h-12 flex items-center justify-center hard-shadow disabled:opacity-30 disabled:hard-shadow active:translate-x-[2px] active:translate-y-[2px] transition-transform"
        >
          ←
        </button>

        <div className="flex items-center gap-2 flex-wrap justify-center max-w-xs">
          {rsvps.map((rsvp, idx) => (
            <button
              key={rsvp.id}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`Go to ${rsvp.secretName}`}
              className={`rounded-full border-2 border-ink transition-all ${
                idx === active ? "w-5 h-5 bg-hot-pink" : "w-3 h-3 bg-paper"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(active + 1)}
          disabled={active === rsvps.length - 1}
          aria-label="Next fact"
          className="font-display text-2xl bg-paper border-[3px] border-ink rounded-full w-12 h-12 flex items-center justify-center hard-shadow disabled:opacity-30 disabled:hard-shadow active:translate-x-[2px] active:translate-y-[2px] transition-transform"
        >
          →
        </button>
      </div>

      <div className="text-center font-marker text-ink/60 mt-3">
        {active + 1} / {rsvps.length}
      </div>
    </div>
  );
}
