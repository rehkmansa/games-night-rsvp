import { BlanketScene, FoodScene, NoiseScene, Squiggle, Star } from "./Vignettes";
import { RsvpForm } from "./RsvpForm";

const FACTS = [
  {
    k: "when",
    v: "Sat 12 September",
    p: "Next week Saturday. Keep the afternoon free.",
    rule: "border-t-sun",
  },
  {
    k: "where",
    v: "Alausa, Ikeja",
    p: "By the House of Assembly, beside the Lagos State Secretariat.",
    rule: "border-t-coral",
  },
  {
    k: "bring",
    v: "Something",
    p: "It's a potluck. Food, drink, a mat, a speaker, a game.",
    rule: "border-t-rasp",
  },
  {
    k: "expect",
    v: "Games",
    p: "Yes, you're playing. Everyone plays.",
    rule: "border-t-plum",
  },
];

const TILES = [
  { Art: BlanketScene, caption: "the grass", tilt: "-rotate-2" },
  { Art: FoodScene, caption: "the food", tilt: "rotate-1 mt-3.5" },
  { Art: NoiseScene, caption: "the noise", tilt: "-rotate-1" },
];

export function InviteBoard() {
  return (
    <div className="relative mx-auto w-full max-w-[900px]">
      {/* headline scrap */}
      <div className="torn-light relative -rotate-1 bg-card px-5 pb-8 pt-7 paper-shadow sm:px-10 sm:pb-11 sm:pt-11">
        <span className="tape -top-3 left-[8%] -rotate-6" aria-hidden="true" />
        <span
          className="tape -top-3 right-[10%] rotate-5 bg-coral/50"
          aria-hidden="true"
        />
        <p className="font-hand text-[clamp(1.375rem,3vw,1.75rem)] -rotate-1 text-coral">
          keep your afternoon free
        </p>
        <h1 className="mt-1.5 flex flex-col font-display text-[clamp(2.5rem,8.6vw,5.25rem)] font-extrabold leading-[0.92] tracking-[-0.03em]">
          Meera&apos;s
          <span className="text-coral">birthday picnic</span>
        </h1>
        <Squiggle className="mt-3.5 block h-[18px] w-[min(320px,70%)]" />
      </div>

      <Star className="absolute -top-1.5 right-[2%] hidden h-[34px] w-[34px] fill-sun md:block" />
      <Star className="absolute left-[-14px] top-[20%] hidden h-[22px] w-[22px] fill-plum md:block" />

      {/* the day, in three pictures */}
      <div className="mt-7 grid gap-[18px] sm:mt-10 sm:grid-cols-3">
        {TILES.map(({ Art, caption, tilt }) => (
          <figure
            key={caption}
            className={`m-0 bg-card px-2.5 pb-1.5 pt-2.5 paper-shadow transition-transform hover:rotate-0 hover:-translate-y-1 ${tilt}`}
          >
            <Art />
            <figcaption className="px-0.5 pt-2 font-hand text-[21px] text-soft">
              {caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* pinned facts */}
      <div className="mt-8 grid gap-4 sm:mt-11 sm:grid-cols-2 lg:grid-cols-4">
        {FACTS.map((f, i) => (
          <div
            key={f.k}
            className={`bg-card px-4 pb-4 pt-[18px] paper-shadow border-t-[3px] ${f.rule} ${
              i === 1 ? "rotate-[0.8deg]" : i === 2 ? "-rotate-[0.7deg]" : ""
            }`}
          >
            <span className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-soft">
              {f.k}
            </span>
            <strong className="mt-1.5 block font-display text-[clamp(1.3125rem,2.8vw,1.625rem)] font-extrabold leading-tight">
              {f.v}
            </strong>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-soft">{f.p}</p>
          </div>
        ))}
      </div>

      {/* the mechanic */}
      <div className="torn-dark mt-9 rotate-[0.5deg] bg-ink px-6 py-7 text-cream sm:mt-13 sm:px-9 sm:py-9">
        <h2 className="font-display text-[clamp(1.4375rem,3.6vw,2rem)] font-extrabold tracking-[-0.02em]">
          Everyone leaves one memory
        </h2>
        <p className="mt-2.5 max-w-[58ch] text-[15.5px] leading-relaxed text-cream/85">
          You leave a memory of the two of you, signed with a secret name. Meera sees the memory,
          never who sent it.
        </p>
        <p className="mt-2 font-hand text-2xl text-sun">
          they all open on the day and she has to guess every single one
        </p>
      </div>

      <RsvpForm />
    </div>
  );
}
