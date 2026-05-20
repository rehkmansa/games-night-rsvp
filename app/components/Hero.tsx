export function Hero() {
  return (
    <section className="relative z-10 px-6 pt-12 pb-8 sm:pt-20 sm:pb-12 flex flex-col items-center text-center overflow-hidden">
      <div className="absolute top-10 left-6 sm:left-20 rotate-[-18deg] bg-yellow text-ink border-[3px] border-ink px-3 py-1 font-marker text-lg hard-shadow hidden sm:block">
        BYO HOT TAKE
      </div>
      <div className="absolute top-24 right-6 sm:right-16 rotate-[12deg] bg-cyan text-ink border-[3px] border-ink px-3 py-1 font-marker text-lg hard-shadow hidden sm:block">
        NO LURKERS
      </div>
      <div className="absolute bottom-2 left-10 rotate-[-8deg] bg-lime text-ink border-[3px] border-ink px-3 py-1 font-marker text-sm hard-shadow hidden md:block">
        PAINT INCLUDED
      </div>
      <div className="absolute bottom-12 right-6 sm:right-20 rotate-[6deg] bg-orange text-paper border-[3px] border-ink px-3 py-1 font-marker text-sm hard-shadow hidden md:block">
        🎁 art accepted as gift
      </div>

      <p className="font-marker text-xl sm:text-2xl text-hot-pink rotate-[-2deg] mb-2">
        you, your friends, certified chaos —
      </p>
      <h1 className="font-display text-6xl sm:text-8xl md:text-9xl leading-[0.85] tracking-tight uppercase">
        <span className="inline-block tilt-left bg-hot-pink text-paper px-3 py-1 border-[4px] border-ink hard-shadow-lg wobble">
          Games
        </span>
        <br />
        <span className="inline-block tilt-right outline-text mt-3">Night</span>
      </h1>

      <p className="mt-6 max-w-2xl font-marker text-2xl sm:text-3xl text-ink rotate-[-1deg]">
        paint. hot takes. wordchain. <span className="bg-yellow px-2">be there.</span>
      </p>

      <div className="mt-8 flex flex-wrap gap-3 justify-center font-display text-sm sm:text-base uppercase">
        <span className="bg-ink text-paper px-4 py-2 sticker tilt-left">
          📅 May 30th
        </span>
        <span className="bg-violet text-paper px-4 py-2 sticker tilt-right">
          ⏰ 5 - 8 PM
        </span>
        <span className="bg-orange text-paper px-4 py-2 sticker tilt-more-left">
          📍 Rehk&apos;s House
        </span>
      </div>
    </section>
  );
}
