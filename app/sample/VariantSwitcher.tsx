"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const VARIANTS = [
  { href: "/sample/b", label: "B" },
  { href: "/sample/c", label: "C" },
  { href: "/sample/d", label: "D" },
];

/**
 * Floating dock so Hannah can flick between the looks without going back to a
 * menu each time. Rendered from the /sample layout, so every variant gets it
 * and no variant has to know about the others.
 */
export function VariantSwitcher() {
  const pathname = usePathname();

  return (
    <nav className="vs-dock" aria-label="Switch design">
      <style>{CSS}</style>
      <span className="vs-label">Look</span>
      {VARIANTS.map((v) => {
        const active = pathname === v.href;
        return (
          <Link
            key={v.href}
            href={v.href}
            className={`vs-btn${active ? " is-on" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            {v.label}
          </Link>
        );
      })}
    </nav>
  );
}

const CSS = `
.vs-dock {
  position: fixed;
  left: 50%;
  bottom: max(16px, env(safe-area-inset-bottom));
  transform: translateX(-50%);
  z-index: 80;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 9px 7px 14px;
  border-radius: 999px;
  background: rgba(18,18,22,0.88);
  backdrop-filter: blur(12px);
  box-shadow: 0 14px 34px -14px rgba(0,0,0,0.65);
  font-family: ui-sans-serif, system-ui, sans-serif;
}
.vs-label {
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin-right: 3px;
}
.vs-btn {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  color: rgba(255,255,255,0.75);
  background: rgba(255,255,255,0.08);
  transition: background 160ms ease, color 160ms ease;
}
.vs-btn:hover { background: rgba(255,255,255,0.2); color: #fff; }
.vs-btn.is-on { background: #fff; color: #121216; }

@media (prefers-reduced-motion: reduce) {
  .vs-btn { transition: none; }
}
`;
