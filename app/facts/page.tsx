import Link from "next/link";
import { FactsSlider } from "../components/FactsSlider";
import { readRsvps } from "../lib/storage";

export const dynamic = "force-dynamic";

export default async function FactsPage() {
  const rsvps = await readRsvps();

  return (
    <main className="relative flex-1 flex flex-col px-6 py-10 sm:py-14">
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <Link
          href="/"
          className="font-marker text-sm text-ink/70 hover:text-ink inline-block mb-4"
        >
          ← back to the wall
        </Link>

        <h1 className="font-display uppercase text-4xl sm:text-6xl leading-none mb-2">
          fun <span className="bg-hot-pink text-paper px-2 tilt-right inline-block">facts</span>
        </h1>
        <p className="font-marker text-lg text-ink/70 mb-8">
          one human per slide. swipe through the crew.
        </p>

        {rsvps.length === 0 ? (
          <div className="border-[3px] border-dashed border-ink/40 rounded-2xl p-10 text-center font-marker text-ink/50">
            nobody&apos;s dropped a fact yet. be the first to RSVP.
          </div>
        ) : (
          <FactsSlider rsvps={rsvps} />
        )}
      </div>
    </main>
  );
}
