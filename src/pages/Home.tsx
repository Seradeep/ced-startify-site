import AboutEvent from "@/components/about-event";
import CMQuote from "@/components/cm_quote";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import Navbar from "@/components/navbar";
import OurStats from "@/components/our-stats";
import Schedule from "@/components/schedule";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CMQuote />
      <AboutEvent />
      <OurStats />
      <Schedule />
      <FAQSection />
      <Footer />
    </>
  );
}
