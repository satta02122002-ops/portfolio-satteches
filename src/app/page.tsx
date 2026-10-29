import { About } from "@/components/About";
import { CaseStudies } from "@/components/CaseStudies";
import { Certifications } from "@/components/Certifications";
import { ContactForm } from "@/components/ContactForm";
import { Contact } from "@/components/Contact";
import { FastLane } from "@/components/FastLane";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MotionProvider } from "@/components/MotionProvider";
import { ProofStrip } from "@/components/ProofStrip";
import { RouteTimeline } from "@/components/RouteTimeline";
import { Skills } from "@/components/Skills";
import { WaybillStrip } from "@/components/WaybillStrip";

export default function Home() {
  return (
    <MotionProvider>
      <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-50 rounded bg-ink px-4 py-3 text-paper">
        Skip to content
      </a>
      <WaybillStrip />
      <Header />
      <main id="main">
        <Hero />
        <ProofStrip />
        <About />
        <RouteTimeline />
        <CaseStudies />
        <Skills />
        <Certifications />
        <Contact form={<ContactForm />} />
      </main>
      <Footer />
      <FastLane />
    </MotionProvider>
  );
}
