"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitRsvp, type RsvpFormState } from "../actions";

const initialState: RsvpFormState = { ok: false };

const STATUSES = [
  { value: "coming", label: "Coming" },
  { value: "maybe", label: "Maybe" },
  { value: "cant", label: "Can't make it" },
] as const;

const GAMES = [
  { value: "hottakes", label: "Rage bait hot takes", note: "Defend your worst opinion." },
  { value: "murder", label: "Murder mystery", note: "Play a character, find the killer." },
] as const;

const PHOTOS = [
  { value: "fine", label: "Fine with photos" },
  { value: "no", label: "Please keep me out" },
] as const;

export function RsvpForm() {
  const [state, formAction, pending] = useActionState(submitRsvp, initialState);
  const [status, setStatus] = useState<string>("coming");
  const [reveal, setReveal] = useState(false);
  const [game, setGame] = useState<string>("");
  // No default: see FIX-2026-10-10-02 in actions.ts.
  const [photoPolicy, setPhotoPolicy] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      setStatus("coming");
      setReveal(false);
      setGame("");
      setPhotoPolicy("");
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
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          name="name"
          required
          maxLength={80}
          placeholder="So she knows who's coming"
        />
        <p className="a-hint">For the headcount. Not shown next to your memory.</p>
      </div>

      <div className="a-field">
        <label htmlFor="secretName">Your secret name</label>
        <input
          id="secretName"
          name="secretName"
          required
          maxLength={60}
          placeholder="Aux Gremlin. Room 3B. Person From Church."
        />
        <p className="a-hint">This is what signs your memory.</p>
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

      <fieldset className="a-status">
        <legend>Which game are you in</legend>
        <div className="a-picks">
          {GAMES.map((g) => (
            <label key={g.value} className={`a-pick${game === g.value ? " is-on" : ""}`}>
              <input
                type="radio"
                name="game"
                value={g.value}
                checked={game === g.value}
                onChange={() => setGame(g.value)}
                required
                className="sr-only"
              />
              <span className="a-pick-label">{g.label}</span>
              <span className="a-pick-note">{g.note}</span>
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
        <p className="a-reveal-q">Show your name next to your memory?</p>
        <p className="a-hint">
          She has your name on the guest list either way. This is only about whether the memory is
          signed with it when she opens them.
        </p>
        <input type="hidden" name="showName" value={reveal ? "yes" : "no"} />
        <div className="a-chips">
          <button
            type="button"
            className={`a-chip${!reveal ? " is-on" : ""}`}
            onClick={() => setReveal(false)}
          >
            Keep it a mystery
          </button>
          <button
            type="button"
            className={`a-chip${reveal ? " is-on" : ""}`}
            onClick={() => setReveal(true)}
          >
            Sign it with my name
          </button>
        </div>
      </div>

      <fieldset className="a-status">
        <legend>Photos and videos</legend>
        <p className="a-hint">Someone will be shooting on the day, so we need an answer either way.</p>
        <div className="a-chips">
          {PHOTOS.map((o) => (
            <label key={o.value} className={`a-chip${photoPolicy === o.value ? " is-on" : ""}`}>
              <input
                type="radio"
                name="photoPolicy"
                value={o.value}
                checked={photoPolicy === o.value}
                onChange={() => setPhotoPolicy(o.value)}
                required
                className="sr-only"
              />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

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
