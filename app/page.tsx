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
      <MemoryWall entries={toPublicRsvps(store)} open={open} />
      <footer className="a-footer">
        <p className="font-hand">see you on the 24th</p>
      </footer>
    </>
  );
}
