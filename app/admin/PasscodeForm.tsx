"use client";

import { useActionState } from "react";
import { signIn, type AdminAuthState } from "./actions";

export function PasscodeForm() {
  const [state, action, pending] = useActionState<AdminAuthState, FormData>(signIn, {});

  return (
    <form
      action={action}
      className="mx-auto flex w-[min(100%,360px)] flex-col gap-4 bg-card p-7 text-ink paper-shadow"
    >
      <h1 className="font-display text-2xl font-extrabold">Admin</h1>
      <label className="flex flex-col gap-1.5">
        <span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-soft">
          Passcode
        </span>
        <input
          name="passcode"
          type="password"
          inputMode="numeric"
          autoComplete="off"
          autoFocus
          className="border-2 border-ink/30 bg-[#FFFBF7] px-3 py-2.5 text-lg tracking-[0.4em] text-ink outline-none focus:border-coral focus:bg-white"
        />
      </label>
      {state.error && <p className="font-hand text-xl text-rasp">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="cursor-pointer self-start rounded-full bg-ink px-6 py-2.5 font-display text-base font-extrabold text-cream transition-colors hover:bg-rasp disabled:opacity-60"
      >
        {pending ? "Checking..." : "Enter"}
      </button>
    </form>
  );
}
