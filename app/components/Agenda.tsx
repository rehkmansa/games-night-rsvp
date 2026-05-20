const ITEMS = [
  {
    badge: "01",
    emoji: "🎨",
    title: "Paint The Wall",
    blurb:
      "You spray-paint a piece of my wall (canvas optional if you're shy). Nobody leaves with anything — it all goes UP on the wall. Congrats, you're an artist now.",
    bg: "bg-cyan",
    tilt: "tilt-left",
  },
  {
    badge: "02",
    emoji: "🎤",
    title: "Hot Topic Slideshow",
    blurb:
      "Every person brings ONE slide on a hot topic. No time limit, go off. Example: \"boiled eggs are a scam, and if you like them, you are a liar.\" Send the slide ahead OR rock up with it.",
    bg: "bg-hot-pink text-paper",
    tilt: "tilt-right",
    star: true,
  },
  {
    badge: "03",
    emoji: "🔗",
    title: "Group Wordchain",
    blurb:
      "Rehk's new game. Rules drop at the party. Just know: hesitate, repeat, or whiff and you're out.",
    bg: "bg-lime",
    tilt: "tilt-more-left",
  },
];

export function Agenda() {
  return (
    <section className="relative z-10 px-6 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display uppercase text-4xl sm:text-6xl leading-none mb-2">
          what&apos;s <span className="bg-orange text-paper px-2 tilt-right inline-block">going down</span>
        </h2>
        <p className="font-marker text-lg text-ink/70 mb-8">
          three acts. zero excuses.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {ITEMS.map((item) => (
            <div
              key={item.badge}
              className={`relative ${item.bg} border-[4px] border-ink rounded-3xl p-6 hard-shadow-lg ${item.tilt} flex flex-col`}
            >
              {item.star && (
                <div className="absolute -top-3 -right-3 bg-yellow text-ink border-[3px] border-ink rounded-full px-3 py-1 font-display uppercase text-sm hard-shadow rotate-[12deg]">
                  ⭐ required
                </div>
              )}
              <div className="font-display text-7xl leading-none opacity-90">
                {item.badge}
              </div>
              <div className="text-5xl mt-2">{item.emoji}</div>
              <h3 className="font-display uppercase text-2xl mt-2 leading-tight">
                {item.title}
              </h3>
              <p className="font-body mt-3 leading-snug">{item.blurb}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-ink text-paper border-[4px] border-ink rounded-3xl p-6 sm:p-8 hard-shadow-pink rotate-[-1deg]">
          <p className="font-display uppercase text-2xl sm:text-3xl leading-tight">
            ⚠ reminder, since you scrolled past it:
          </p>
          <p className="font-marker text-xl sm:text-2xl mt-2 text-yellow">
            you. need. a. hot topic. slide.
          </p>
          <p className="font-body mt-3 text-paper/80">
            One slide. Any topic. Make us laugh, make us mad, make us google
            something at 2am. Send it to Rehk ahead of time OR show up with it
            — your call.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch">
          <div className="flex-1 bg-orange text-paper border-[4px] border-ink rounded-3xl p-6 hard-shadow tilt-right">
            <p className="font-display uppercase text-xl sm:text-2xl leading-tight">
              🎁 P.S.
            </p>
            <p className="font-marker text-xl mt-1">
              also accepting art as a gift.
            </p>
            <p className="font-body text-sm mt-2 text-paper/85">
              if you make something extra, dropping it off is encouraged. wall
              space is generous.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
