/* THROWAWAY PREVIEW index. Delete once a direction is picked. */

import Link from "next/link";

const OPTIONS = [
  {
    href: "/sample/brutal",
    label: "D. Brutalist Birthday",
    note: "Rebuilt dark. Ink ground, neon as light, full-bleed colour bands, one giant type moment.",
  },
  {
    href: "/sample/pin",
    label: "F. Pinterest Board",
    note: "An actual board page. Masonry pins, hover to save, bows, cherry and blush.",
  },
  {
    href: "/sample/collage",
    label: "E. Cutout Collage",
    note: "Ransom-note letters, torn paper, grid paper, washi tape, colour bands.",
  },
  {
    href: "/sample/card",
    label: "A. Birthday Card",
    note: "Pine green, cream card stock, sealed envelopes. Earliest pass, kept for contrast.",
  },
];

export default function SampleIndex() {
  return (
    <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center gap-4 px-6 py-16">
      <h1 className="font-display text-3xl uppercase">Pick a direction</h1>
      {OPTIONS.map((o) => (
        <Link
          key={o.href}
          href={o.href}
          className="cursor-pointer border-[3px] border-ink bg-white p-5 transition-transform hover:-translate-y-0.5 hard-shadow"
        >
          <p className="font-display text-lg uppercase">{o.label}</p>
          <p className="mt-1 text-sm text-black/60">{o.note}</p>
        </Link>
      ))}
    </main>
  );
}
