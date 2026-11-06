import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CtaBanner } from "@/features/home/CtaBanner";
import { Faq } from "@/features/home/Faq";
import { Hero } from "@/features/home/Hero";
import { HowItWorks } from "@/features/home/HowItWorks";
import { IsapresStrip } from "@/features/home/IsapresStrip";
import { Testimonials } from "@/features/home/Testimonials";
import { WhyNexo } from "@/features/home/WhyNexo";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <IsapresStrip />
        <HowItWorks />
        <WhyNexo />
        <CtaBanner />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
