import { InviteBoard } from "./components/InviteBoard";
import { MemoryWall } from "./components/MemoryWall";
import { memoriesAreOpen, toPublicRsvps } from "./lib/reveal";
import { readRsvps } from "./lib/storage";

export const dynamic = "force-dynamic";

export default async function Home() {
  const entries = await readRsvps();
  const open = memoriesAreOpen();

  return (
    <main className="px-5 pb-20 pt-6 sm:px-6 sm:pt-14">
      <InviteBoard />
      <MemoryWall entries={toPublicRsvps(entries)} open={open} />
      <p className="mx-auto mt-10 max-w-[900px] text-center font-hand text-[clamp(1.625rem,3.6vw,2.125rem)] -rotate-1 text-coral sm:mt-14">
        see you on the grass
      </p>
    </main>
  );
}
