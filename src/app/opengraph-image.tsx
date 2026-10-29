import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero, site } from "@/content";

export const alt = `${site.name}, ${site.role} in ${site.location}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [archivo, plex] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/Archivo-ExtraBold.ttf")),
    readFile(join(process.cwd(), "src/assets/IBMPlexSans-Regular.ttf")),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#f4f1ea",
          backgroundImage:
            "linear-gradient(rgba(15,27,45,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,27,45,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          color: "#0f1b2d",
          fontFamily: "Plex",
        }}
      >
        <div style={{ display: "flex", background: "#0f1b2d", color: "#f4f1ea", padding: "18px 64px", fontSize: 22, letterSpacing: 3 }}>
          DXB / JAFZA · STATUS: OPEN TO SENIOR LOGISTICS ROLES
        </div>
        <div style={{ display: "flex", flexDirection: "column", padding: "56px 64px 0", flex: 1 }}>
          <div style={{ fontFamily: "Archivo", fontSize: 80, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>{site.name}</div>
          <div style={{ display: "flex", fontSize: 36, marginTop: 18, color: "#4b5b6e" }}>
            {`${site.role} · ${site.location} · Freight, Customs, SAP`}
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: "auto", marginBottom: 56 }}>
            {hero.headline.map((h) => (
              <div
                key={h.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  background: "#fbf9f4",
                  border: "2px solid rgba(15,27,45,0.15)",
                  borderRadius: 12,
                  padding: "24px 24px",
                }}
              >
                <div style={{ fontFamily: "Archivo", fontSize: 42, fontWeight: 800, color: "#c2410c", letterSpacing: -1, whiteSpace: "nowrap" }}>{h.value}</div>
                <div style={{ fontSize: 26, color: "#4b5b6e", marginTop: 4 }}>{h.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", height: 14, background: "#c2410c" }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivo, weight: 800, style: "normal" },
        { name: "Plex", data: plex, weight: 400, style: "normal" },
      ],
    },
  );
}
