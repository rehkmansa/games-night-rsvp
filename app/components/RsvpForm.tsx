'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { submitRsvp, type RsvpFormState } from '../actions';

const initialState: RsvpFormState = { ok: false };

const STATUSES = [
  {
    value: 'coming',
    label: "I'M IN",
    emoji: '🔥',
    bg: 'bg-lime',
    note: 'you better be',
  },
  {
    value: 'maybe',
    label: 'MAYBE',
    emoji: '🤔',
    bg: 'bg-yellow',
    note: 'commitment issues',
  },
  {
    value: 'cant',
    label: "CAN'T",
    emoji: '💀',
    bg: 'bg-hot-pink',
    note: 'ngmi',
  },
] as const;

export function RsvpForm() {
  const [state, formAction, pending] = useActionState(submitRsvp, initialState);
  const [status, setStatus] = useState<string>('coming');
  const [shakeKey, setShakeKey] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok && formRef.current) {
      formRef.current.reset();
      setStatus('coming');
    }
    if (state.error) {
      setShakeKey((k) => k + 1);
    }
  }, [state]);

  return (
    <section className="relative z-10 px-6 py-10 sm:py-14 flex justify-center">
      <form
        ref={formRef}
        action={formAction}
        key={shakeKey}
        className={`relative w-full max-w-2xl bg-paper border-[4px] border-ink rounded-[28px] p-6 sm:p-10 hard-shadow-lg ${state.error ? 'shake' : ''}`}
      >
        <div className="tape -top-3 left-10 rotate-[-6deg]" />
        <div className="tape -top-3 right-10 rotate-[5deg]" />

        <h2 className="font-display text-4xl sm:text-5xl uppercase mb-2 leading-none">
          RSVP <span className="bg-cyan px-2 inline-block tilt-right">now</span>
        </h2>
        <p className="font-marker text-lg text-ink/80 mb-6">
          take 30 seconds, then go make your slide.
        </p>

        <div className="mb-5 bg-hot-pink text-paper border-[3px] border-ink rounded-2xl p-4 sm:p-5 hard-shadow rotate-[-1deg]">
          <p className="font-display uppercase text-xl sm:text-2xl leading-tight">
            🎤 mandatory hot topic slide
          </p>
          <p className="font-body text-sm sm:text-base mt-1">
            Every single person brings ONE slide on a hot topic of their choice. No slide = no
            entry. Yes we are serious. <span className="blink">.</span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="font-marker text-lg block mb-1">your name</span>
            <input
              name="name"
              required
              maxLength={80}
              placeholder="what do they call you"
              className="w-full bg-paper border-[3px] border-ink rounded-xl px-4 py-3 font-body focus:outline-none focus:bg-yellow/40"
            />
          </label>
          <label className="block">
            <span className="font-marker text-lg block mb-1">nickname</span>
            <input
              name="nickname"
              required
              maxLength={40}
              placeholder="what should we call you"
              className="w-full bg-paper border-[3px] border-ink rounded-xl px-4 py-3 font-body focus:outline-none focus:bg-cyan/40"
            />
          </label>
        </div>

        <label className="block mt-4">
          <span className="font-marker text-lg block mb-1">
            one fun fact about someone you think is coming
          </span>
          <textarea
            name="factAbout"
            required
            maxLength={280}
            rows={3}
            placeholder='e.g. "rehk cant spell villain". you can keep it anon too (no name, just the fact). and no, you cant use rehk as your fun fact.'
            className="w-full bg-paper border-[3px] border-ink rounded-xl px-4 py-3 font-body focus:outline-none focus:bg-lime/40 resize-none"
          />
        </label>

        <fieldset className="mt-6">
          <legend className="font-marker text-lg mb-2">are you coming?</legend>
          <div className="grid sm:grid-cols-3 gap-3">
            {STATUSES.map((s) => {
              const active = status === s.value;
              return (
                <label
                  key={s.value}
                  className={`cursor-pointer border-[3px] border-ink rounded-xl px-4 py-3 text-center transition-all font-display uppercase ${s.bg} ${
                    active
                      ? 'hard-shadow-lg translate-x-[-2px] translate-y-[-2px]'
                      : 'hard-shadow opacity-60 hover:opacity-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={s.value}
                    checked={active}
                    onChange={() => setStatus(s.value)}
                    className="sr-only"
                  />
                  <div className="text-2xl">{s.emoji}</div>
                  <div className="text-xl mt-1">{s.label}</div>
                  <div className="font-marker text-xs mt-1 normal-case opacity-80">{s.note}</div>
                </label>
              );
            })}
          </div>
        </fieldset>

        {state.error && <p className="mt-4 font-marker text-hot-pink text-lg">⚠ {state.error}</p>}
        {state.ok && (
          <p className="mt-4 font-marker text-xl bounce-in bg-lime border-[3px] border-ink rounded-xl px-4 py-3 text-ink">
            ✨ locked in, <span className="font-display uppercase">{state.nickname}</span>. start
            prepping that slide.
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full bg-ink text-paper font-display uppercase text-2xl sm:text-3xl py-4 rounded-2xl border-[4px] border-ink hard-shadow-pink transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-1 active:translate-y-1 disabled:opacity-60"
        >
          {pending ? 'sending it...' : 'SEND IT →'}
        </button>
      </form>
    </section>
  );
}
