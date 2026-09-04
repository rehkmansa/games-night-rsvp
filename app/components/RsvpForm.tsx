"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitRsvp, type RsvpFormState } from "../actions";

const initialState: RsvpFormState = { ok: false };

const STATUSES = [
  { value: "coming", label: "I'm in" },
  { value: "maybe", label: "Maybe" },
  { value: "cant", label: "Can't" },
] as const;

const labelClass = "text-[10.5px] font-bold uppercase tracking-[0.22em] text-soft";

const fieldClass =
  "border-0 border-b-2 border-ink/30 bg-[#FFFBF7] px-1 py-[11px] text-[15.5px] text-ink outline-none placeholder:text-[#BFAFA7] focus:border-coral focus:bg-white";

function pill(active: boolean) {
  return `cursor-pointer rounded-full border-2 px-5 py-2.5 text-[15px] font-semibold transition-colors ${
    active
      ? "border-coral bg-coral text-white"
      : "border-ink/30 text-soft hover:border-ink hover:text-ink"
  }`;
}

export function RsvpForm() {
  const [state, formAction, pending] = useActionState(submitRsvp, initialState);
  const [status, setStatus] = useState<string>("coming");
  const [reveal, setReveal] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      setStatus("coming");
      setReveal(false);
      return;
    }
    if (state.error && formRef.current) {
      formRef.current.classList.remove("shake");
      void formRef.current.offsetWidth;
      formRef.current.classList.add("shake");
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="relative mx-auto mt-9 flex w-[min(100%,600px)] -rotate-[0.4deg] flex-col gap-5 bg-card px-6 py-7 paper-shadow-lg sm:mt-14 sm:px-9 sm:py-9"
    >
      <span className="tape -top-3 left-1/2 -ml-[46px] -rotate-2" aria-hidden="true" />

      <h2 className="font-display text-[clamp(1.4375rem,3.6vw,2rem)] font-extrabold tracking-[-0.02em]">
        Add yourself
      </h2>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Your secret name</span>
        <input
          name="secretName"
          required
          maxLength={60}
          placeholder="Bench Philosopher, Room 3B, Aux Gremlin"
          className={fieldClass}
        />
        <span className="font-hand text-[21px] text-coral">this is all she sees</span>
      </label>

      <fieldset className="border-0 p-0">
        <legend className={`mb-2.5 ${labelClass}`}>Are you coming</legend>
        <div className="flex flex-wrap gap-2.5">
          {STATUSES.map((s) => (
            <label key={s.value} className={pill(status === s.value)}>
              <input
                type="radio"
                name="status"
                value={s.value}
                checked={status === s.value}
                onChange={() => setStatus(s.value)}
                className="sr-only"
              />
              {s.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>A memory of you and Meera</span>
        <textarea
          name="memory"
          required
          maxLength={500}
          rows={4}
          placeholder="The one you still bring up. She can't read it until the picnic."
          className={`${fieldClass} resize-y border-2 border-ink/30 p-3`}
        />
      </label>

      <div className="flex flex-col gap-3 border-2 border-dashed border-ink/30 bg-sun/12 p-4">
        <p className={labelClass}>Should she know it&apos;s you?</p>
        <input type="hidden" name="reveal" value={reveal ? "yes" : "no"} />
        <div className="flex flex-wrap gap-2.5">
          <button type="button" onClick={() => setReveal(false)} className={pill(!reveal)}>
            Keep me a mystery
          </button>
          <button type="button" onClick={() => setReveal(true)} className={pill(reveal)}>
            Fine, tell her
          </button>
        </div>
        {reveal && (
          <label className="bounce-in mt-1 flex flex-col gap-1.5">
            <span className={labelClass}>Your real name</span>
            <input
              name="realName"
              maxLength={80}
              placeholder="Shown next to your secret name on the day"
              className={fieldClass}
            />
          </label>
        )}
      </div>

      {state.error && <p className="font-hand text-2xl text-rasp">{state.error}</p>}
      {state.ok && (
        <p className="bounce-in border-l-4 border-coral bg-coral/10 px-4 py-3 font-hand text-2xl text-coral">
          You&apos;re on the board, {state.secretName}. See you on the grass.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="cursor-pointer self-start rounded-full bg-ink px-8 py-3.5 font-display text-lg font-extrabold text-cream transition-all hover:-translate-y-0.5 hover:bg-rasp disabled:opacity-60"
      >
        {pending ? "Pinning..." : "Pin it up"}
      </button>
    </form>
  );
}
