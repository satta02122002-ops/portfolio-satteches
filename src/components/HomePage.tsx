import type { Pillar } from "@/content";
import { About } from "./About";
import { AppShell } from "./AppShell";
import { CaseStudies } from "./CaseStudies";
import { Certifications } from "./Certifications";
import { Contact } from "./Contact";
import { ContactForm } from "./ContactForm";
import { Dashboard } from "./Dashboard";
import { FocusProvider } from "./HiringFocus";
import { Hero } from "./Hero";
import { RouteTimeline } from "./RouteTimeline";
import { Skills } from "./Skills";
import { ToolsSection } from "./ToolsSection";

/** The one-page portfolio. /for/[company] renders the same page with a personalised hero. */
export function HomePage({ preparedFor, focus = null }: { preparedFor?: string; focus?: Pillar | null }) {
  return (
    <AppShell>
      <FocusProvider initial={focus}>
        <Hero preparedFor={preparedFor} />
        <Dashboard />
        <About />
        <RouteTimeline />
        <CaseStudies />
        <Skills />
        <ToolsSection />
        <Certifications />
        <Contact form={<ContactForm company={preparedFor} />} />
      </FocusProvider>
    </AppShell>
  );
}
