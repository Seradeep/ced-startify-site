import AboutEvent from "@/components/about-event";

import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import NotificationButton from "@/components/notification";
//import OurStats from "@/components/our-stats";



{
  /*import Schedule from "@/components/schedule";*/
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutEvent />


      <FAQSection />
      <Footer />
      <NotificationButton />


    </>
  );
}
