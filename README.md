# satteches.com

Portfolio of Sattanathan Chandran, Logistics Coordinator in JAFZA, Dubai. Built to the brief in [`docs/BLUEPRINT.md`](docs/BLUEPRINT.md): a proof-first page for UAE logistics recruiters, in a "manifest" design.

**Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4, `next/font`. No animation library: the counters, stamps and route line use a small IntersectionObserver hook (`src/lib/useReveal.ts`) and CSS, and respect `prefers-reduced-motion`.

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
| WhatsApp buttons | `contact.whatsapp`: international format, digits only, e.g. `9715XXXXXXXX`. Buttons stay hidden while it is empty. |
| Experience timeline | `experience`, plus `nextStop` for the final open milestone |
| Skills, certifications, awards, education | `skills`, `certifications`, `awards`, `education` |
| "I'm hiring for…" pitches | `hiringFor` |

Open `TODO` comments in `src/content.ts` mark the bracketed details from the blueprint that only you can fill (WhatsApp number, optional case-study method lines).

The headshot is `public/images/sattanathan-chandran.jpg`; replace the file to change it.

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

## Deploy (Vercel)

1. Import the repository in Vercel. The defaults work (framework: Next.js).
2. Add the environment variables from `.env.example` that you need:
   - `RESEND_API_KEY`, `CONTACT_FROM` (a sender on a domain verified in Resend), optional `CONTACT_TO`. Without a key, the contact form keeps the message and offers a prefilled email instead.
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=satteches.com` to turn on cookie-free analytics. Events tracked: `cv_download`, `contact_click`, `whatsapp_click`, `linkedin_click`, `contact_form_sent`, `hiring_for`, `tool_open` and `for_visit` (with the company name). In Plausible, add these as custom goals to see them.
3. Point the `satteches.com` domain at the project (Vercel → Settings → Domains). If DNS is on Cloudflare, use DNS-only (grey cloud) records or Vercel's recommended setup.

## Structure

```
src/content.ts               all copy and numbers
src/app/page.tsx             home → components/HomePage.tsx
src/app/cv/                  ATS-friendly CV and print stylesheet
src/app/for/[company]/       personalised recruiter links
src/app/actions/contact.ts   contact form server action (Resend, honeypot, rate limit)
src/app/opengraph-image.tsx  1200×630 social preview
src/components/              sections, fast lane, hiring-for selector
src/components/tools/        freight mini-tools and Mirsal 2 checklist
scripts/generate-cv-pdf.mjs  renders /cv to the PDF
```
