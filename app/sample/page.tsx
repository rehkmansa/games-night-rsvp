/* THROWAWAY PREVIEW index. Delete once a direction is picked. */

import Link from "next/link";

const OPTIONS = [
  { href: "/sample/board", label: "A", note: "Warm and handmade, like a scrapbook page." },
  { href: "/sample/flyer", label: "B", note: "Big, bold and yellow, like a poster on a wall." },
  { href: "/sample/riso", label: "C", note: "Bright printed inks on speckled paper." },
  { href: "/sample/postcard", label: "D", note: "A postcard on a desk, typed and handwritten." },
];

export default function SampleIndex() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center gap-5 px-6 py-16 text-stock">
      <div>
        <h1 className="font-display text-3xl font-bold">Meera&apos;s picnic</h1>
        <p className="mt-2 text-stock/70">
          Four looks for the invite. Have a click through and tell us which one you like.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {OPTIONS.map((o) => (
          <Link
            key={o.href}
            href={o.href}
            className="flex cursor-pointer items-center gap-4 rounded bg-stock/10 p-5 transition-colors hover:bg-stock/20"
          >
            <span className="font-display text-3xl font-bold text-marigold">{o.label}</span>
            <span className="text-[15px] text-stock/85">{o.note}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
