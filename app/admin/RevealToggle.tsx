"use client";

import { useState, useTransition } from "react";
import { setRevealed } from "./actions";

export function RevealToggle({ revealed }: { revealed: boolean }) {
  const [pending, start] = useTransition();
  const [confirming, setConfirming] = useState(false);

  if (revealed) {
    return (
      <div className="flex flex-wrap items-center gap-4 border-2 border-coral bg-coral/10 p-5">
        <p className="font-display text-lg font-extrabold">Memories are live on the site</p>
        <button
          type="button"
          disabled={pending}
          onClick={() => start(() => setRevealed(false))}
          className="cursor-pointer rounded-full border-2 border-ink px-5 py-2 text-sm font-semibold transition-colors hover:bg-ink hover:text-cream disabled:opacity-60"
        >
          {pending ? "Sealing..." : "Seal them again"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-4 border-2 border-dashed border-ink/30 p-5">
      <p className="font-display text-lg font-extrabold">Reveal memories</p>
      {confirming ? (
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-sm text-soft">Show every memory on the public page?</span>
          <button
            type="button"
            disabled={pending}
            onClick={() => start(() => setRevealed(true))}
            className="cursor-pointer rounded-full bg-coral px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-rasp disabled:opacity-60"
          >
            {pending ? "Revealing..." : "Yes, reveal"}
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="cursor-pointer rounded-full border-2 border-ink/30 px-5 py-2 text-sm font-semibold text-soft transition-colors hover:border-ink hover:text-ink"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="cursor-pointer rounded-full bg-ink px-6 py-2.5 font-display text-base font-extrabold text-cream transition-colors hover:bg-rasp"
        >
          Reveal them
        </button>
      )}
    </div>
  );
}
