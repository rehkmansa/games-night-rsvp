import { InviteCard } from "./components/InviteCard";
import { WishWall } from "./components/WishWall";
import { toPublicRsvps, wishesAreOpen } from "./lib/reveal";
import { readRsvps } from "./lib/storage";

export const dynamic = "force-dynamic";

export default async function Home() {
  const entries = await readRsvps();
  const open = wishesAreOpen();

  return (
    <main className="flex flex-col items-center gap-10 px-5 pb-20 pt-7 sm:gap-[88px] sm:px-6 sm:pt-16">
      <InviteCard />
      <WishWall entries={toPublicRsvps(entries)} open={open} />
      <footer className="font-hand text-3xl -rotate-2 text-stock/75">
        <p>see you at Iyeru Okin</p>
      </footer>
    </main>
  );
}
