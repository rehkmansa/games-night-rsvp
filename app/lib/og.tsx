import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Happy Birthday Oshioke. Saturday 22 August, arrive for 12 noon, Iyeru Okin at the Radisson Blu.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const RIBBON = ["#c9302b", "#e9a317", "#1c7c7c", "#10362e"];

const DETAILS = [
  { label: "THE DAY", value: "Saturday 22 August" },
  { label: "ARRIVAL", value: "12 noon" },
  { label: "THE PLACE", value: "Iyeru Okin" },
];

async function font(file: string) {
  return readFile(join(process.cwd(), "assets/fonts", file));
}

/**
 * Shared by opengraph-image.tsx and twitter-image.tsx so both cards stay
 * identical. Satori only lays out with flexbox, so every container that holds
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
          background: "linear-gradient(160deg, #10362e 0%, #0b2721 100%)",
          padding: 48,
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            background: "#fbf3e2",
            borderRadius: 6,
            padding: "62px 64px 54px",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 12, display: "flex" }}>
            {RIBBON.map((c) => (
              <div key={c} style={{ width: "25%", height: "100%", background: c }} />
            ))}
          </div>

          <div
            style={{
              fontFamily: "Karla",
              fontSize: 21,
              letterSpacing: 6,
              color: "#1c7c7c",
            }}
          >
            YOU ARE INVITED
          </div>

          <div style={{ fontFamily: "Fraunces", fontSize: 44, color: "#17130e", marginTop: 26 }}>
            Happy Birthday,
          </div>

          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: 152,
              lineHeight: 1,
              letterSpacing: -5,
              color: "#17130e",
              marginTop: 4,
            }}
          >
            Oshioke
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 26 }}>
            <div style={{ fontFamily: "Karla", fontSize: 38, color: "#5b5245" }}>the birthday</div>
            <div
              style={{
                fontFamily: "Karla",
                fontSize: 38,
                color: "#5b5245",
                textDecoration: "line-through",
                textDecorationColor: "#c9302b",
              }}
            >
              boy
            </div>
            <div style={{ fontFamily: "Caveat", fontSize: 72, color: "#c9302b" }}>man</div>
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ display: "flex", gap: 62 }}>
            {DETAILS.map((d) => (
              <div key={d.label} style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    fontFamily: "Karla",
                    fontSize: 17,
                    letterSpacing: 3.4,
                    color: "#1c7c7c",
                  }}
                >
                  {d.label}
                </div>
                <div style={{ fontFamily: "Karla", fontSize: 32, color: "#17130e", marginTop: 6 }}>
                  {d.value}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              fontFamily: "Karla",
              fontSize: 22,
              color: "#5b5245",
              marginTop: 22,
            }}
          >
            at the Radisson Blu · leave a wish under a secret name
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
