import { Agenda } from "./components/Agenda";
import { AttendeeBoard } from "./components/AttendeeBoard";
import { Hero } from "./components/Hero";
import { RsvpForm } from "./components/RsvpForm";
import { readRsvps } from "./lib/storage";

export const dynamic = "force-dynamic";

export default async function Home() {
  const rsvps = await readRsvps();

  return (
    <main className="relative flex-1 flex flex-col">
      <Hero />
      <RsvpForm />
      <AttendeeBoard rsvps={rsvps} />
      <Agenda />
      <footer className="relative z-10 mt-8 mb-10 text-center font-marker text-ink/60">
        made with paint-stained fingers ✦ no slides = no entry
      </footer>
    </main>
  );
}
