// Renders public/og.png (1200x630 social preview) from src/content.ts.
// Run after changing the name, role or headline numbers: npm run og
// It is a static file because Cloudflare Workers can't read font files at runtime.
import { readFile, writeFile } from "node:fs/promises";
import { ImageResponse } from "next/og.js";
import { hero, site, waybill } from "../src/content.ts";

const root = new URL("../", import.meta.url);
const font = (f) => readFile(new URL(`src/assets/${f}`, root));
const h = (type, style, children) => ({ type, props: { style: { display: "flex", ...style }, children } });

const card = (x) =>
  h("div", { flexDirection: "column", flex: 1, background: "#fbf9f4", border: "2px solid rgba(15,27,45,0.15)", borderRadius: 12, padding: "24px 24px" }, [
    h("div", { fontFamily: "Archivo", fontSize: 42, fontWeight: 800, color: "#c2410c", letterSpacing: -1, whiteSpace: "nowrap" }, x.value),
    h("div", { fontSize: 26, color: "#4b5b6e", marginTop: 4 }, x.label),
  ]);

const image = h(
  "div",
  {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    background: "#f4f1ea",
    backgroundImage:
      "linear-gradient(rgba(15,27,45,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,27,45,0.06) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    color: "#0f1b2d",
    fontFamily: "Plex",
  },
  [
    h("div", { background: "#0f1b2d", color: "#f4f1ea", padding: "18px 64px", fontSize: 22, letterSpacing: 3 }, waybill.full.replace(/^.*?· /, "")),
    h("div", { flexDirection: "column", padding: "56px 64px 0", flex: 1 }, [
      h("div", { fontFamily: "Archivo", fontSize: 80, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }, site.name),
      h("div", { fontSize: 36, marginTop: 18, color: "#4b5b6e" }, `${site.role} · ${site.location} · Freight, Customs, SAP`),
      h("div", { gap: 24, marginTop: "auto", marginBottom: 56 }, hero.headline.map(card)),
    ]),
    h("div", { height: 14, background: "#c2410c" }, []),
  ],
);

const res = new ImageResponse(image, {
  width: 1200,
  height: 630,
  fonts: [
    { name: "Archivo", data: await font("Archivo-ExtraBold.ttf"), weight: 800, style: "normal" },
    { name: "Plex", data: await font("IBMPlexSans-Regular.ttf"), weight: 400, style: "normal" },
  ],
});
const out = new URL("public/og.png", root);
await writeFile(out, Buffer.from(await res.arrayBuffer()));
console.log(`Wrote ${out.pathname}`);
