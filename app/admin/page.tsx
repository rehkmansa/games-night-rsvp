import { isSignedIn, signOut } from "./actions";
import { EntryList } from "./EntryList";
import { PasscodeForm } from "./PasscodeForm";
import { RevealToggle } from "./RevealToggle";
import { readStore } from "../lib/storage";
import { GAME_LABEL } from "../lib/types";

export const dynamic = "force-dynamic";

const STATUS_LABEL = {
  coming: "Coming",
  maybe: "Maybe",
  cant: "Can't",
} as const;

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
  const noPhotos = store.entries.filter((e) => e.photoPolicy === "no");
  const games = {
    hottakes: store.entries.filter((e) => e.game === "hottakes").length,
    murder: store.entries.filter((e) => e.game === "murder").length,
  };

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
          <div key={k} className="bg-card p-5 text-ink paper-shadow">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-soft">
              {STATUS_LABEL[k]}
            </p>
            <p className="mt-1 font-display text-4xl font-extrabold tabular-nums">{counts[k]}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {(["hottakes", "murder"] as const).map((g) => (
          <div key={g} className="bg-card p-4 text-ink paper-shadow">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-soft">
              {GAME_LABEL[g]}
            </p>
            <p className="mt-1 font-display text-2xl font-extrabold tabular-nums">{games[g]}</p>
          </div>
        ))}
      </div>

      {noPhotos.length > 0 && (
        <p className="mt-4 border-l-4 border-plum bg-plum/10 px-4 py-3 text-[15px]">
          <strong>{noPhotos.length}</strong>{" "}
          {noPhotos.length === 1 ? "person has" : "people have"} asked not to be photographed:{" "}
          {noPhotos.map((e) => e.name || "unnamed").join(", ")}. Tell whoever is shooting.
        </p>
      )}

      <div className="mt-8">
        <RevealToggle revealed={store.revealedAt !== null} />
      </div>

      <div className="mt-10">
        <EntryList entries={store.entries} />
      </div>
    </main>
  );
}
