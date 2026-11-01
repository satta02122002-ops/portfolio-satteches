# satteches.com

Portfolio of Sattanathan Chandran, Logistics Coordinator in JAFZA, Dubai. Built to the brief in [`docs/BLUEPRINT.md`](docs/BLUEPRINT.md): a proof-first page for UAE logistics recruiters, laid out as a logistics "control tower" dashboard: sidebar modules, KPI panels, a shipment-style career tracker, case files, a warehouse-rack skills map and freight tools.

**Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4, `next/font`, deployed to Cloudflare Workers. No animation library: the counters, stamps and route line use a small IntersectionObserver hook (`src/lib/useReveal.ts`) and CSS, and respect `prefers-reduced-motion`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # type-check
```

## Edit content

Every word and number lives in **`src/content.ts`**. Components only render what is there.

| To change | Edit in `src/content.ts` |
| --- | --- |
| Headline, sub-headline, hero numbers | `hero` |
| The six proof counters | `proof` (`to` is the animated number, `display` is the text used elsewhere) |
| "Zero customs holds as of …" date | `site.asOf` |
| Reply time on the contact section | `site.replyTime` |
| Email, LinkedIn, GitHub | `contact` |
| Mobile and WhatsApp | `contact.phone` (shown), `contact.phoneHref` (tap-to-call) and `contact.whatsapp` (digits only; empty hides WhatsApp buttons) |
| Experience timeline | `experience`, plus `nextStop` for the final open milestone |
| Skills, certifications, awards, education | `skills`, `certifications`, `awards`, `education` |
| "I'm hiring for…" pitches | `hiringFor` |
| Overview KPI tiles | `headlineKpis` |
| Dashboard meters, before→after charts, scale figures | `meters`, `beforeAfter`, `scope`, `customsDocs` |
| Module names, order and icons (sidebar) | `sections` |

Open `TODO` comments in `src/content.ts` mark the bracketed details from the blueprint that only you can fill (WhatsApp number, optional case-study method lines).

The headshot is `public/images/sattanathan-chandran.webp`; replace the file to change it.

### Add a case study

Add an object to `caseStudies` in `src/content.ts`:

```ts
{
  id: "billing-tracker",            // unique, URL-safe
  title: "Month-end billing without the bottleneck",
  problem: "…",
  action: "…",
  result: "…",                      // only numbers you can defend in an interview
  tools: ["Excel"],
  stamp: "ACCURATE",                // ACCURATE | ON TIME | CLEARED
  pillars: ["warehouse"],           // freight | customs | warehouse | sap, used by the hiring-for selector
},
```

### Update the CV PDF

`public/Sattanathan-Chandran-CV.pdf` is generated from the `/cv` page, so the two always match. After changing content:

```bash
npm run build && npm start      # terminal 1
npx playwright install chromium # first time only
npm run cv:pdf                  # terminal 2, writes public/Sattanathan-Chandran-CV.pdf
```

Check that it is still one page, then commit the PDF.

## Personalised links

`https://satteches.com/for/<company-slug>` shows "Prepared for <Company>" in the hero and pre-fills the company in the contact form. Add `?focus=freight|customs|warehouse|sap` to put the matching results first, for example `/for/dp-world?focus=customs`. These pages are `noindex`.

## Deploy (Cloudflare Workers)

The site runs on Cloudflare Workers through the [OpenNext adapter](https://opennext.js.org/cloudflare). Config: `wrangler.jsonc` (Worker name `portfolio-satteches`) and `open-next.config.ts`.

### Option A: from your computer

```bash
npx wrangler login     # opens the browser, once
npm run deploy         # builds for Workers and deploys
```

The first deploy prints a `https://portfolio-satteches.<your-subdomain>.workers.dev` URL. `npm run preview` runs the same build locally first.

### Option B: auto-deploy on every push (Workers Builds)

Cloudflare dashboard → **Workers & Pages → Create → Import a repository** → pick `satta02122002-ops/portfolio-satteches`, then set:

- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx opennextjs-cloudflare deploy`
- Branch: the branch you want live

### Domains

Add `satteches.com` and `www.satteches.com` in the dashboard (Workers & Pages → portfolio-satteches → Domains → Add Domain); Cloudflare creates their DNS records and certificates. The `satteches.com` zone must be **Active** in Cloudflare (its nameservers set at your registrar).

### Settings

- **Contact form:** `npx wrangler secret put RESEND_API_KEY`, plus `CONTACT_FROM` (a sender on a domain verified in Resend) and optionally `CONTACT_TO`, set as variables in the Worker's Settings. Without a key the form keeps the message and offers a prefilled email instead.
- **Analytics:** `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=satteches.com` is read at build time, so set it as a build variable (Workers Builds) or in `.env.production` before `npm run deploy`. Events: `cv_download`, `contact_click`, `phone_click`, `whatsapp_click`, `linkedin_click`, `contact_form_sent`, `hiring_for`, `tool_open`, `for_visit`. Add them as custom goals in Plausible.

### Social preview image

`public/og.png` is a static file (Workers can't read font files at runtime). After changing your name, role or headline numbers, run `npm run og` and commit the new image.

## Structure

```
src/content.ts               all copy and numbers
src/app/page.tsx             home → components/HomePage.tsx
src/app/cv/                  ATS-friendly CV and print stylesheet
src/app/for/[company]/       personalised recruiter links
src/app/actions/contact.ts   contact form server action (Resend, honeypot, rate limit)
scripts/generate-og.mjs      renders public/og.png (social preview)
src/components/              AppShell (sidebar, status bar, module nav), one component per module
src/components/viz/          stat tile, meter and before→after charts (inline SVG/CSS, no chart library)
src/components/tools/        freight mini-tools and Mirsal 2 checklist
scripts/generate-cv-pdf.mjs  renders /cv to the PDF
```
