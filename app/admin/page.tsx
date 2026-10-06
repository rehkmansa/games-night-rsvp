import { isSignedIn, signOut } from "./actions";
import { PasscodeForm } from "./PasscodeForm";
import { RevealToggle } from "./RevealToggle";
import { readStore } from "../lib/storage";
import type { RsvpStatus } from "../lib/types";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<RsvpStatus, string> = {
  coming: "Coming",
  maybe: "Maybe",
  cant: "Can't",
};

export default async function AdminPage() {
  if (!(await isSignedIn())) {
    return (
      <main className="flex min-h-screen items-center px-5 py-16">
        <PasscodeForm />
      </main>
    );
  }

  const store = await readStore();
  const counts = {
    coming: store.entries.filter((e) => e.status === "coming").length,
    maybe: store.entries.filter((e) => e.status === "maybe").length,
    cant: store.entries.filter((e) => e.status === "cant").length,
  };
  const noPhotos = store.entries.filter((e) => e.photoOptOut);

  return (
    <main className="mx-auto w-full max-w-[900px] px-5 py-10 sm:py-14">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="font-display text-3xl font-extrabold">Guest list</h1>
        <form action={signOut}>
          <button
            type="submit"
            className="cursor-pointer text-sm font-semibold text-soft underline underline-offset-4 hover:text-ink"
          >
            Sign out
          </button>
        </form>
      </div>

      {/* headcount first: it is the whole reason she asked people to reply */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {(["coming", "maybe", "cant"] as const).map((k) => (
          <div key={k} className="bg-card p-5 paper-shadow">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-soft">
              {STATUS_LABEL[k]}
            </p>
            <p className="mt-1 font-display text-4xl font-extrabold tabular-nums">{counts[k]}</p>
          </div>
        ))}
      </div>

      {noPhotos.length > 0 && (
        <p className="mt-4 border-l-4 border-plum bg-plum/10 px-4 py-3 text-[15px]">
          <strong>{noPhotos.length}</strong>{" "}
          {noPhotos.length === 1 ? "person has" : "people have"} asked not to be photographed:{" "}
          {noPhotos.map((e) => e.realName ?? e.secretName).join(", ")}. Tell whoever is shooting.
        </p>
      )}

      <div className="mt-8">
        <RevealToggle revealed={store.revealedAt !== null} />
      </div>

      <h2 className="mt-10 font-display text-xl font-extrabold">
        {store.entries.length} {store.entries.length === 1 ? "reply" : "replies"}
      </h2>

      {store.entries.length === 0 ? (
        <p className="mt-3 text-[15px] text-soft">Nobody has replied yet.</p>
      ) : (
        <ul className="mt-4 flex list-none flex-col gap-3 p-0">
          {store.entries.map((e) => (
            <li key={e.id} className="bg-card p-5 paper-shadow">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="font-display text-lg font-extrabold">
                  {e.secretName}
                  {e.realName && <span className="font-body text-sm font-normal text-soft"> · {e.realName}</span>}
                </p>
                <div className="flex items-center gap-2">
                  {e.photoOptOut && (
                    <span className="rounded-full bg-plum/15 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-plum">
                      No photos
                    </span>
                  )}
                  <span className="rounded-full bg-ink/8 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-soft">
                    {STATUS_LABEL[e.status]}
                  </span>
                </div>
              </div>
              <p className="mt-2.5 text-[15px] leading-relaxed text-soft">{e.memory}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
