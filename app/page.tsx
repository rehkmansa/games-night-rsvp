import { InviteCard } from "./components/InviteCard";
import { MemoryWall } from "./components/MemoryWall";
import { toPublicRsvps } from "./lib/reveal";
import { readStore } from "./lib/storage";

export const dynamic = "force-dynamic";

export default async function Home() {
  const store = await readStore();
  const open = store.revealedAt !== null;

  return (
    <>
      <InviteCard />

      {/*
       * [FIX-2026-10-13-01] The public page lists nobody until the host reveals.
       *
       * This used to render the wall unconditionally. Memories were stripped
       * server-side, but every guest's SECRET NAME, their status and their game
       * were still printed for anyone holding the link — so the invite doubled
       * as a public attendance list. A guest who said "can't make it" was
       * published as such to everyone else who opened it, which is nobody's
       * business but Hannah's, and she reads /admin for that.
       *
       * The guard is this conditional, not a CSS rule and not a prop on the
       * component: when `open` is false the entries are never passed, so
       * toPublicRsvps() is never called and nothing about any reply is
       * serialised into the HTML. Rendering the wall with an empty array would
       * be weaker and a hidden-by-default prop weaker still — both leave the
       * data one mistake away from the payload.
       *
       * What this does NOT cover, because a sibling layer owns it: the memory
       * TEXT. That is stripped inside toPublicRsvps() in lib/reveal.ts, which
       * stays the authority for memory content even after the host reveals.
       * This layer owns "is there a list at all"; that one owns "what is in it".
       */}
      {open && <MemoryWall entries={toPublicRsvps(store)} open />}

      <footer className="a-footer">
        <p className="font-hand">see you on the 24th</p>
      </footer>
    </>
  );
}
