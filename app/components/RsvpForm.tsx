"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitRsvp, type RsvpFormState } from "../actions";

const initialState: RsvpFormState = { ok: false };

const STATUSES = [
  { value: "coming", label: "Coming" },
  { value: "maybe", label: "Maybe" },
  { value: "cant", label: "Can't make it" },
] as const;

const fieldClass =
  "rounded-[3px] border-[1.5px] border-ink/30 bg-white/60 px-4 py-3 text-base text-ink outline-none placeholder:text-ink-soft/55 focus:border-red focus:bg-white";

const chipClass =
  "cursor-pointer rounded-full border-[1.5px] px-5 py-2.5 text-[15px] font-semibold transition-colors";

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
    <form ref={formRef} action={formAction} className="flex flex-col gap-6">
      <label className="flex flex-col gap-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft">
          Your secret name
        </span>
        <input
          name="secretName"
          required
          maxLength={60}
          placeholder="Aux Gremlin. Person From Church. Jollof Enthusiast."
          className={fieldClass}
        />
        <span className="text-[13px] italic text-ink-soft">
          The only name on your wish. Make it guessable, or don&apos;t.
        </span>
      </label>

      <fieldset className="border-0 p-0">
        <legend className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft">
          Are you coming
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {STATUSES.map((s) => {
            const active = status === s.value;
            return (
              <label
                key={s.value}
                className={`${chipClass} ${
                  active
                    ? "border-pine bg-pine text-stock"
                    : "border-ink/30 text-ink-soft hover:border-ink hover:text-ink"
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
                {s.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className="flex flex-col gap-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft">
          Your birthday wish
        </span>
        <textarea
          name="wish"
          required
          maxLength={500}
          rows={4}
          placeholder="Sealed until noon on the 22nd. Say the sweet thing."
          className={`${fieldClass} resize-y`}
        />
      </label>

      <div className="flex flex-col gap-3 rounded border-[1.5px] border-dashed border-marigold/70 bg-marigold/15 p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft">
          Do you want him to know?
        </p>
        <input type="hidden" name="reveal" value={reveal ? "yes" : "no"} />
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => setReveal(false)}
            className={`${chipClass} ${
              !reveal
                ? "border-pine bg-pine text-stock"
                : "border-ink/30 text-ink-soft hover:border-ink hover:text-ink"
            }`}
          >
            Keep me a mystery
          </button>
          <button
            type="button"
            onClick={() => setReveal(true)}
            className={`${chipClass} ${
              reveal
                ? "border-pine bg-pine text-stock"
                : "border-ink/30 text-ink-soft hover:border-ink hover:text-ink"
            }`}
          >
            Fine, tell him
          </button>
        </div>
        {reveal && (
          <label className="bounce-in mt-1 flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft">
              Your real name
            </span>
            <input
              name="realName"
              maxLength={80}
              placeholder="Sits beside your secret name on the day"
              className={`${fieldClass} bg-white`}
            />
          </label>
        )}
      </div>

      {state.error && <p className="font-hand text-2xl text-red">{state.error}</p>}
      {state.ok && (
        <p className="bounce-in rounded border-[1.5px] border-teal bg-teal/15 px-4 py-3 font-hand text-2xl text-teal">
          Sealed. See you on the 22nd, {state.secretName}.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="cursor-pointer self-start rounded-full bg-red px-9 py-4 text-sm font-bold uppercase tracking-[0.06em] text-stock transition-all hover:-translate-y-px hover:bg-red-deep disabled:opacity-60"
      >
        {pending ? "Sealing..." : "Seal it"}
      </button>
    </form>
  );
}
