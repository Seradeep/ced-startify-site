import AboutEvent from "@/components/about-event";
import CMQuote from "@/components/cm-quote";
import ECellAwards from "@/components/ecell-awards";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import OurStats from "@/components/our-stats";
import Popup from "@/components/popup";
{
  /*import Schedule from "@/components/schedule";*/
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <CMQuote />
      <AboutEvent />
      <ECellAwards />
      <OurStats />
      <FAQSection />
      <Footer />
      <Popup />
    </>
  );
}
