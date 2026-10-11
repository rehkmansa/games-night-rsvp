import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Birthday Hangout. Saturday 24 October, at her estate. Reply by Wednesday 14 October.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FACTS = [
  { k: "THE DAY", v: "Sat 24 October" },
  { k: "REPLY BY", v: "Wed 14 October" },
  { k: "THE PLACE", v: "Her estate" },
];

async function font(file: string) {
  return readFile(join(process.cwd(), "assets/fonts", file));
}

/**
 * Shared by opengraph-image.tsx and twitter-image.tsx so both cards stay
 * identical. Satori only lays out with flexbox, so every container holding
 * more than one child sets display:flex explicitly.
 */
export async function renderOgImage(): Promise<ImageResponse> {
  const [fraunces, caveat, karla] = await Promise.all([
    font("Fraunces-Bold.ttf"),
    font("Caveat-Bold.ttf"),
    font("Karla-SemiBold.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #10362E 0%, #0B2721 100%)",
          padding: 54,
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            background: "#FBF3E2",
            padding: "62px 64px",
            boxShadow: "0 26px 60px rgba(0,0,0,0.45)",
          }}
        >
          {/* the card's four-colour ribbon, same as the page */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 14, display: "flex" }}>
            {["#C9302B", "#E9A317", "#1C7C7C", "#10362E"].map((c) => (
              <div key={c} style={{ width: "25%", height: "100%", background: c }} />
            ))}
          </div>

          {/* same order as the card: eyebrow, invitation line, name, hand note */}
          <div
            style={{
              fontFamily: "Karla",
              fontSize: 19,
              letterSpacing: 6,
              color: "#1C7C7C",
            }}
          >
            BIRTHDAY HANGOUT
          </div>

          <div style={{ fontFamily: "Fraunces", fontSize: 44, color: "#17130E", marginTop: 20 }}>
            You&apos;re invited to
          </div>
          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: 104,
              color: "#17130E",
              letterSpacing: -4,
              marginTop: -4,
            }}
          >
            Hannah&apos;s hangout
          </div>

          <div style={{ fontFamily: "Caveat", fontSize: 38, color: "#5B5245", marginTop: 12 }}>
            food and drinks are on her, just bring yourself
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ display: "flex", gap: 52, marginTop: 34 }}>
            {FACTS.map((f) => (
              <div key={f.k} style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    fontFamily: "Karla",
                    fontSize: 17,
                    letterSpacing: 4,
                    color: "#5B5245",
                  }}
                >
                  {f.k}
                </div>
                <div
                  style={{
                    fontFamily: "Fraunces",
                    fontSize: 34,
                    color: "#17130E",
                    marginTop: 6,
                  }}
                >
                  {f.v}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              fontFamily: "Karla",
              fontSize: 22,
              color: "#5B5245",
              marginTop: 24,
            }}
          >
            Address closer to the day · two games to pick from · leave her a memory under a secret
            name
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 700 },
        { name: "Caveat", data: caveat, style: "normal", weight: 700 },
        { name: "Karla", data: karla, style: "normal", weight: 600 },
      ],
    },
  );
}
