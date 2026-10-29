import type { Pillar } from "@/content";
import { About } from "./About";
import { CaseStudies } from "./CaseStudies";
import { Certifications } from "./Certifications";
import { Contact } from "./Contact";
import { ContactForm } from "./ContactForm";
import { FastLane } from "./FastLane";
import { FocusProvider } from "./HiringFocus";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { MotionProvider } from "./MotionProvider";
import { ProofStrip } from "./ProofStrip";
import { RouteTimeline } from "./RouteTimeline";
import { Skills } from "./Skills";
import { ToolsSection } from "./ToolsSection";
import { WaybillStrip } from "./WaybillStrip";

/** The one-page portfolio. /for/[company] renders the same page with a personalised hero. */
export function HomePage({ preparedFor, focus = null }: { preparedFor?: string; focus?: Pillar | null }) {
  return (
    <MotionProvider>
      <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-50 rounded bg-ink px-4 py-3 text-paper">
        Skip to content
      </a>
      <WaybillStrip />
      <Header />
      <FocusProvider initial={focus}>
        <main id="main">
          <Hero preparedFor={preparedFor} />
          <ProofStrip />
          <About />
          <RouteTimeline />
          <CaseStudies />
          <Skills />
          <ToolsSection />
          <Certifications />
          <Contact form={<ContactForm company={preparedFor} />} />
        </main>
      </FocusProvider>
      <Footer />
      <FastLane />
    </MotionProvider>
  );
}
