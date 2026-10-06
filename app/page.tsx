import Link from "next/link";

const OPTIONS = [
  { href: "/sample/b", label: "B", note: "An admit-one pass with a tear-off stub." },
  { href: "/sample/c", label: "C", note: "Cream card on deep green. Warm and classic." },
  { href: "/sample/d", label: "D", note: "Navy banner, straight down to the form." },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center gap-6 px-6 py-16">
      <div>
        <h1 className="font-display text-3xl font-extrabold">Birthday Hangout</h1>
        <p className="mt-2 text-soft">
          Three looks for the invite. Open each one and tell us which you like. You can hop between
          them with the buttons at the bottom of the screen.
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
