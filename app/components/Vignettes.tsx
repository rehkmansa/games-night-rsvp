/*
 * Stand-ins for photos of Meera. Each one fills the frame in InviteBoard the
 * way an <img> would, so swapping in a real picture is a one-line change that
 * keeps the frame, tilt, tape and handwritten caption exactly as they are.
 */

export function BlanketScene() {
  return (
    <svg className="block h-auto w-full bg-[#F3EEE2]" viewBox="0 0 200 130" aria-hidden="true">
      <rect x="18" y="62" width="164" height="52" rx="4" fill="#D9634A" opacity="0.85" />
      <path d="M18 62 h164 M18 79 h164 M18 96 h164" stroke="#FDF8F3" strokeWidth="3" opacity="0.7" />
      <path d="M52 62 v52 M96 62 v52 M140 62 v52" stroke="#FDF8F3" strokeWidth="3" opacity="0.7" />
      <path d="M74 62 a26 22 0 0 1 52 0 z" fill="#B98A4E" />
      <path d="M74 62 h52" stroke="#8A6438" strokeWidth="4" />
      <path d="M86 40 a14 14 0 0 1 28 0" fill="none" stroke="#8A6438" strokeWidth="4" />
      <circle cx="46" cy="52" r="9" fill="#7C5580" />
      <circle cx="158" cy="50" r="11" fill="#DFA046" />
    </svg>
  );
}

export function FoodScene() {
  return (
    <svg className="block h-auto w-full bg-[#F6E9E3]" viewBox="0 0 200 130" aria-hidden="true">
      <circle cx="66" cy="70" r="34" fill="#FDF8F3" stroke="#B8455F" strokeWidth="3" />
      <path d="M66 44 a26 26 0 0 1 0 52 z" fill="#B8455F" opacity="0.75" />
      <rect x="112" y="52" width="52" height="46" rx="5" fill="#DFA046" />
      <path d="M112 66 h52" stroke="#FDF8F3" strokeWidth="3" />
      <circle cx="126" cy="80" r="4" fill="#FDF8F3" />
      <circle cx="140" cy="86" r="4" fill="#FDF8F3" />
      <circle cx="152" cy="78" r="4" fill="#FDF8F3" />
      <path d="M30 104 h140" stroke="#D9634A" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function NoiseScene() {
  return (
    <svg className="block h-auto w-full bg-[#EEEAF1]" viewBox="0 0 200 130" aria-hidden="true">
      <rect x="46" y="44" width="108" height="60" rx="7" fill="#7C5580" />
      <circle cx="76" cy="74" r="16" fill="#FDF8F3" opacity="0.9" />
      <circle cx="76" cy="74" r="7" fill="#7C5580" />
      <circle cx="124" cy="74" r="16" fill="#FDF8F3" opacity="0.9" />
      <circle cx="124" cy="74" r="7" fill="#7C5580" />
      <rect x="92" y="52" width="16" height="6" rx="3" fill="#DFA046" />
      <path d="M164 56 a20 20 0 0 1 0 36" fill="none" stroke="#D9634A" strokeWidth="4" strokeLinecap="round" />
      <path d="M176 46 a34 34 0 0 1 0 56" fill="none" stroke="#D9634A" strokeWidth="4" strokeLinecap="round" opacity="0.55" />
      <path d="M36 56 a20 20 0 0 0 0 36" fill="none" stroke="#D9634A" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Squiggle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 20" aria-hidden="true">
      <path
        d="M4 14 C34 2, 64 22, 96 10 C128 -2, 160 18, 196 6"
        fill="none"
        stroke="var(--color-sun)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 4 C56 36, 64 44, 96 50 C64 56, 56 64, 50 96 C44 64, 36 56, 4 50 C36 44, 44 36, 50 4 Z" />
    </svg>
  );
}
