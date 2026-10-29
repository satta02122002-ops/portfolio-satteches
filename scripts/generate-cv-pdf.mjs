// Renders /cv to public/Sattanathan-Chandran-CV.pdf so the PDF always matches the page.
// Usage: npm run build && npm start (in another terminal), then: npm run cv:pdf
// Override the URL with CV_URL=http://localhost:3000/cv npm run cv:pdf
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";

const url = process.env.CV_URL ?? "http://localhost:3000/cv";
const out = fileURLToPath(new URL("../public/Sattanathan-Chandran-CV.pdf", import.meta.url));

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(url, { waitUntil: "load" });
await page.emulateMedia({ media: "print", colorScheme: "light" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: out, format: "A4", printBackground: false, preferCSSPageSize: true, tagged: true, outline: true });
await browser.close();
console.log(`Wrote ${out}`);
