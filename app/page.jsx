import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Steps from "@/components/Steps";
import WhyChooseUs from "@/components/WhyChooseUs";
import Gallery from "@/components/Gallery";
import ParallaxBand from "@/components/ParallaxBand";
import Areas from "@/components/Areas";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Reveal from "@/components/Reveal";
import ScrollProgress from "@/components/ScrollProgress";
import Parallax from "@/components/Parallax";
import BackToTop from "@/components/BackToTop";
import BookingPopup from "@/components/BookingPopup";
import BookingModal from "@/components/BookingModal";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Pricing />
        <Steps />
        <WhyChooseUs />
        <Gallery />
        <ParallaxBand />
        <Areas />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <BookingModal />
      <BookingPopup />
      <BackToTop />
      <WhatsAppFloat />
      <Reveal />
      <Parallax />
    </>
  );
}
