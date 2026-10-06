/* THROWAWAY PREVIEW index. Delete once a direction is picked. */

import Link from "next/link";

const OPTIONS = [
  { href: "/sample/b", label: "B", note: "An admit-one pass with a tear-off stub." },
  { href: "/sample/c", label: "C", note: "Cream card on deep green. Warm and classic." },
  { href: "/sample/d", label: "D", note: "A landscape envelope that opens and slides the card out." },
  { href: "/studio-sample", label: "Studio", note: "Dark and kinetic, on its own page." },
];

export default function SampleIndex() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center gap-5 px-6 py-16">
      <div>
        <h1 className="font-display text-3xl font-extrabold">Birthday Hangout</h1>
        <p className="mt-2 text-soft">
          Four looks. Have a click through and tell us which one you like.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {OPTIONS.map((o) => (
          <Link
            key={o.href}
            href={o.href}
            className="flex cursor-pointer items-center gap-4 bg-card p-5 paper-shadow transition-transform hover:-translate-y-0.5"
          >
            <span className="font-display text-3xl font-extrabold text-coral">{o.label}</span>
            <span className="text-[15px]">{o.note}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
