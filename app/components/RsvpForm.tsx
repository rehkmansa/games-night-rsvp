"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitRsvp, type RsvpFormState } from "../actions";

const initialState: RsvpFormState = { ok: false };

const STATUSES = [
  { value: "coming", label: "Coming" },
  { value: "maybe", label: "Maybe" },
  { value: "cant", label: "Can't make it" },
] as const;

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
    <form ref={formRef} action={formAction} className="a-form">
      <div className="a-field">
        <label htmlFor="secretName">Your secret name</label>
        <input
          id="secretName"
          name="secretName"
          required
          maxLength={60}
          placeholder="Aux Gremlin. Room 3B. Person From Church."
        />
        <p className="a-hint">This is all she sees.</p>
      </div>

      <fieldset className="a-status">
        <legend>Are you coming</legend>
        <div className="a-chips">
          {STATUSES.map((s) => (
            <label key={s.value} className={`a-chip${status === s.value ? " is-on" : ""}`}>
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

      <div className="a-field">
        <label htmlFor="memory">A memory of you and Hannah</label>
        <textarea
          id="memory"
          name="memory"
          required
          maxLength={500}
          rows={4}
          placeholder="She can't read it until she opens them."
        />
      </div>

      <div className="a-reveal">
        <p className="a-reveal-q">Should she know it&apos;s you?</p>
        <input type="hidden" name="reveal" value={reveal ? "yes" : "no"} />
        <div className="a-chips">
          <button
            type="button"
            className={`a-chip${!reveal ? " is-on" : ""}`}
            onClick={() => setReveal(false)}
          >
            Keep me a mystery
          </button>
          <button
            type="button"
            className={`a-chip${reveal ? " is-on" : ""}`}
            onClick={() => setReveal(true)}
          >
            Fine, tell her
          </button>
        </div>
        {reveal && (
          <div className="a-field a-field-reveal">
            <label htmlFor="realName">Your real name</label>
            <input
              id="realName"
              name="realName"
              maxLength={80}
              placeholder="Shown next to your secret name"
            />
          </div>
        )}
      </div>

      <label className="a-photo">
        <input type="checkbox" name="photoOptOut" value="yes" />
        <span>I&apos;d rather not be in the photos or videos.</span>
      </label>

      {state.error && <p className="a-error font-hand">{state.error}</p>}
      {state.ok && (
        <p className="a-ok font-hand">
          Sealed. See you on the 24th, {state.secretName}.
        </p>
      )}

      <button type="submit" className="a-submit" disabled={pending}>
        {pending ? "Sending..." : "Seal it"}
      </button>
    </form>
  );
}
