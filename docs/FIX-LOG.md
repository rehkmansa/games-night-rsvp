# Fix log

Behavioural fixes only: something was wrong, and now behaves differently.
Each entry's ID appears in the code at the site the behaviour changed, so
`rg FIX-2026-10-10-02` goes from a symptom to every place it was touched.

---

## FIX-2026-10-10-01 — Card padding squeezed the form on phones

**Symptom.** On a 390px-wide phone the RSVP form felt cramped: inputs and chips
ran close to the card edge and the chip rows wrapped earlier than they needed to.

**Root cause.** Two gutters stacked. The page (`:root, body`) had a flat `20px`
horizontal padding, and `.a-card` had `clamp(24px, 5vw, 60px)`, whose floor of
24px applies at every width below 480px. 20 + 24 on each side = 88px of the
390px viewport spent on margin before any content.

**Evidence (measured).** Measured in the browser at a 390px viewport by reading
`clientWidth` minus computed horizontal padding off the live `.a-card` node,
once with the old values applied and once with the new:
**271px → 289px, +18px** of usable content width (69.5% → 74.1% of the screen).
An earlier draft of this entry asserted 302 → 330px; that was arithmetic from
the clamp values, not a measurement, and it was wrong — it ignored the scrollbar
and the card's own `min()` width resolution. The numbers above are measured.

**Blast radius.** The page gutter is the other half of the same squeeze and was
reduced in the same change (`20px` → `clamp(12px, 4vw, 20px)`); above ~500px
both clamps return to their old values, so desktop is untouched. The vertical
padding floors were deliberately left alone — the space between sections is what
makes the card read as a card. No sibling surface shares this stylesheet;
`/admin` uses Tailwind utilities and is unaffected.

**Files.** `app/globals.css` (`.a-card`, `:root, body`).

**How verified.** Rendered at 390px in Playwright, measured the live node, then
re-applied the pre-fix padding to the same node and measured again, so both
figures come from the same element in the same layout.

---

## FIX-2026-10-10-02 — Photo consent defaulted to "yes"

**Symptom.** A guest who did not interact with the photo question was recorded
as consenting to being photographed and filmed.

**Root cause.** The question was a single unticked checkbox, "I'd rather not be
in the photos or videos". An unticked checkbox submits nothing, and the server
read `photoOptOut = formData.get("photoOptOut") === "yes"` → `false`. So the
most likely submission of all — someone who skimmed the form — was stored as
consent, indistinguishable from someone who actively agreed.

**Why it mattered.** Hannah is hiring someone to shoot stills and video and
reads `/admin` to brief them. A guest who simply missed the line would have been
filmed.

**Evidence (measured).** Before: 1 of 3 possible user states ("ticked") was
recorded accurately; "never saw it" and "saw it and is fine" both stored
`false`, so **2 of 3 states collapsed into one value**. After: the form cannot
be submitted without an explicit `fine` or `no`, and the server rejects any
other value — **0 states collapse**.

**Blast radius.** Two layers, declared in both comments. The form's `required`
radio group (`app/components/RsvpForm.tsx`) stops the mistake in the browser;
the server check in `submitRsvp` makes it impossible to POST around, and is the
authority. The same silence-is-consent shape exists nowhere else in this repo —
the only other optional input is `realName`, which is gated behind an explicit
"Fine, tell her" and is inert if absent. Existing stored entries keep
`photoOptOut` and are normalised on read in `lib/storage.ts`.

**Files.** `app/components/RsvpForm.tsx`, `app/actions.ts`, `app/lib/types.ts`,
`app/lib/storage.ts`.

**How verified.** Submitted the form with no photo answer and confirmed it is
blocked; submitted each of the two answers and confirmed the stored value.

---

## FIX-2026-10-10-03 — /admin spoiled every memory on sight

**Symptom.** Opening `/admin` to check the headcount printed every guest's
memory in full, with no way to avoid reading them.

**Root cause.** The entry list rendered `{e.memory}` unconditionally. The page
exists to answer "who is coming, and who can't be photographed", but it also
dumped the one thing the entire site is built to keep sealed — and Hannah is one
of only two people who will ever open it.

**Evidence (measured).** Before: **N of N** memories visible on load, where N is
every reply. After: **0 of N** on load; all N after one explicit click on
"Show memories".

**Blast radius.** This is a spoiler guard, NOT a security boundary, and the two
must not be confused. The memory text is already in this page's payload because
an authenticated host is allowed to read it. The boundary that stops *guests*
reading memories early is `toPublicRsvps()` in `app/lib/reveal.ts`, which strips
the text server-side before serialisation — that function is the authority for
the public page and is untouched by this fix. Removing this toggle re-exposes a
spoiler to the host; removing that filter leaks to the world. The public wall
(`app/components/MemoryWall.tsx`) renders only what `toPublicRsvps` hands it and
needs no equivalent guard.

**Files.** `app/admin/EntryList.tsx` (new), `app/admin/page.tsx`.

**How verified.** Loaded `/admin` with a stored entry and confirmed the memory
text is absent until "Show memories" is pressed, and present after.
