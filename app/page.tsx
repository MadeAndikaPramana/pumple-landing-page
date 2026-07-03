import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import ChatDemo from "@/components/ChatDemo";
import Community from "@/components/Community";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Faq from "@/components/Faq";
import WaitlistCta from "@/components/WaitlistCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="konten" className="relative overflow-x-hidden">
        <Hero />
        <Ticker />
        <ChatDemo />
        <Community />
        <Features />
        <HowItWorks />
        <Faq />
        <WaitlistCta />
      </main>
      <Footer />
    </>
  );
}
