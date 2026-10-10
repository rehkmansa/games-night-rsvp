"use client";

import { useState } from "react";
import { GAME_LABEL, PHOTO_LABEL, type Rsvp, type RsvpStatus } from "../lib/types";

const STATUS_LABEL: Record<RsvpStatus, string> = {
  coming: "Coming",
  maybe: "Maybe",
  cant: "Can't",
};

/*
 * [FIX-2026-10-10-03] Memories are hidden here until you ask for them.
 *
 * This list used to print every memory in full, unconditionally. /admin is the
 * page the host opens to count heads and brief the photographer, and Hannah is
 * one of the two people who will ever open it — so the page built to answer
 * "who is coming" was quietly spoiling the one surprise the whole site exists
 * to protect, on every visit, before she had chosen to look.
 *
 * The default view is now the RSVP facts: status, game, photo policy, name.
 * Memories appear only after an explicit click, and the control says what it
 * will do so nobody trips over it.
 *
 * This is a SPOILER guard, not a security boundary, and the distinction
 * matters: the text is already in this page's payload, because an authenticated
 * host is allowed to read it. The boundary that stops *guests* reading memories
 * early is toPublicRsvps() in lib/reveal.ts, which strips the text server-side
 * before it is ever serialised. Do not weaken that one on the strength of this
 * one. Removing this toggle re-exposes the spoiler; removing that one leaks to
 * the public.
 */
export function EntryList({ entries }: { entries: Rsvp[] }) {
  const [showMemories, setShowMemories] = useState(false);

  if (entries.length === 0) {
    return <p className="mt-3 text-[15px] text-soft">Nobody has replied yet.</p>;
  }

  return (
    <>
      <div className="mt-4 flex items-center justify-between gap-4">
        <h2 className="font-display text-xl font-extrabold">
          {entries.length} {entries.length === 1 ? "reply" : "replies"}
        </h2>
        <button
          type="button"
          onClick={() => setShowMemories((v) => !v)}
          className="cursor-pointer rounded-full border-2 border-ink/30 px-4 py-2 text-sm font-semibold transition-colors hover:border-ink"
        >
          {showMemories ? "Hide memories" : "Show memories"}
        </button>
      </div>

      {!showMemories && (
        <p className="mt-2 text-[13px] text-soft">
          Memories stay hidden here so you don&apos;t spoil them by accident.
        </p>
      )}

      <ul className="mt-4 flex list-none flex-col gap-3 p-0">
        {entries.map((e) => (
          <li key={e.id} className="bg-card p-5 text-ink paper-shadow">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-display text-lg font-extrabold">
                {e.secretName}
                {e.realName && (
                  <span className="font-body text-sm font-normal text-soft"> · {e.realName}</span>
                )}
              </p>
              <span className="rounded-full bg-ink/8 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-soft">
                {STATUS_LABEL[e.status]}
              </span>
            </div>

            <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-soft">Game</dt>
                <dd className="mt-0.5 text-[15px]">{GAME_LABEL[e.game]}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-soft">
                  Photos
                </dt>
                <dd
                  className={`mt-0.5 text-[15px] ${e.photoPolicy === "no" ? "font-semibold text-plum" : ""}`}
                >
                  {PHOTO_LABEL[e.photoPolicy]}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-soft">
                  Replied
                </dt>
                <dd className="mt-0.5 text-[15px] tabular-nums">
                  {new Date(e.createdAt).toISOString().slice(0, 10)}
                </dd>
              </div>
            </dl>

            {showMemories && (
              <p className="mt-3 border-t border-dashed border-ink/20 pt-3 text-[15px] leading-relaxed text-soft">
                {e.memory}
              </p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
