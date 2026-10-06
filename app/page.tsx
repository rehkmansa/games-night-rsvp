import { InviteBoard } from "./components/InviteBoard";
import { MemoryWall } from "./components/MemoryWall";
import { toPublicRsvps } from "./lib/reveal";
import { readStore } from "./lib/storage";

export const dynamic = "force-dynamic";

export default async function Home() {
  const store = await readStore();
  const open = store.revealedAt !== null;

  return (
    <main className="px-5 pb-20 pt-6 sm:px-6 sm:pt-14">
      <InviteBoard />
      <MemoryWall entries={toPublicRsvps(store)} open={open} />
      <p className="mx-auto mt-10 max-w-[900px] text-center font-hand text-[clamp(1.625rem,3.6vw,2.125rem)] -rotate-1 text-coral sm:mt-14">
        see you on the 24th
      </p>
    </main>
  );
}
