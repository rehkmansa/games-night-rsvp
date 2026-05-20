# Games Night RSVP

A loud, playful RSVP page for a small games night. Friends drop their name, a
nickname, one fact about somebody else they think is coming, and pick a status.
Everyone sees the live attendee board.

## Stack

- Next.js (App Router) + Tailwind v4
- Vercel Blob — single `rsvps.json` blob holds all entries
- Server actions for writes, server-rendered for reads

## Local dev

```bash
npm install
npm run dev
```

The page renders without a Blob token (attendee board is just empty). Form
submissions need the token — see deploy steps below.

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import it on [vercel.com/new](https://vercel.com/new).
3. In the project's **Storage** tab, create a new **Blob** store and connect it.
   Vercel auto-populates `BLOB_READ_WRITE_TOKEN` as an env var for you.
4. Redeploy. Done.

To pull the env locally:

```bash
npx vercel env pull .env.local
```

## Editing the party details

`app/components/Hero.tsx` — the three info chips (date, time, location) are
placeholders. Swap them for real values.

## Viewing RSVPs

Two options:

- The Attendee Wall on the page itself.
- Vercel dashboard → your project → Storage → Blob → open `rsvps.json` to see
  the raw JSON.
