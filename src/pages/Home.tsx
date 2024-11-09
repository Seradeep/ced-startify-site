import AboutEvent from "@/components/about-event";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import OurStats from "@/components/our-stats";
import Schedule from "@/components/schedule";
import Sponsors from "@/components/sponsors";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Sponsors />
      <AboutEvent />
      <OurStats />
      <Schedule />
      <FAQSection />
      <Footer />
    </>
  );
}
