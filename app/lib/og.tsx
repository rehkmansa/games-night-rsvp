import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Meera's Birthday Picnic. Saturday 12 September, Alausa, Ikeja. Potluck, games, and a memory under a secret name.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FACTS = [
  { k: "WHEN", v: "Sat 12 September" },
  { k: "WHERE", v: "Alausa, Ikeja" },
  { k: "BRING", v: "Something" },
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
  const [bricolage, caveat, work] = await Promise.all([
    font("Bricolage-Bold.ttf"),
    font("Caveat-Bold.ttf"),
    font("WorkSans-Medium.ttf"),
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
          background: "#FDF8F3",
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
            background: "#FFFFFF",
            padding: "58px 62px",
            boxShadow: "0 18px 40px rgba(36,26,23,0.16)",
          }}
        >
          {/* masking tape, same as the page */}
          <div
            style={{
              position: "absolute",
              top: -13,
              left: 90,
              width: 150,
              height: 34,
              background: "rgba(223,160,70,0.62)",
              transform: "rotate(-5deg)",
            }}
          />

          <div style={{ fontFamily: "Caveat", fontSize: 40, color: "#D9634A" }}>
            keep your afternoon free
          </div>

          <div
            style={{
              fontFamily: "Bricolage",
              fontSize: 92,
              color: "#241A17",
              letterSpacing: -3,
              marginTop: 6,
            }}
          >
            Meera&apos;s
          </div>
          <div
            style={{
              fontFamily: "Bricolage",
              fontSize: 92,
              color: "#D9634A",
              letterSpacing: -3,
              marginTop: -8,
            }}
          >
            birthday picnic
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ display: "flex", gap: 58, marginTop: 34 }}>
            {FACTS.map((f) => (
              <div key={f.k} style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    fontFamily: "WorkSans",
                    fontSize: 17,
                    letterSpacing: 4,
                    color: "#8C7A72",
                  }}
                >
                  {f.k}
                </div>
                <div
                  style={{
                    fontFamily: "Bricolage",
                    fontSize: 34,
                    color: "#241A17",
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
              fontFamily: "WorkSans",
              fontSize: 22,
              color: "#8C7A72",
              marginTop: 24,
            }}
          >
            By the House of Assembly, beside the Lagos State Secretariat · leave a memory under a
            secret name
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: bricolage, style: "normal", weight: 700 },
        { name: "Caveat", data: caveat, style: "normal", weight: 700 },
        { name: "WorkSans", data: work, style: "normal", weight: 500 },
      ],
    },
  );
}
