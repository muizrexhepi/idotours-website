"use client";
import Footer from "@/components/Footer";
import HeroWrapper from "@/components/hero-wrapper";

import FeaturesSection from "@/components/home/InfoSection";
import MobileAppSection from "@/components/home/MobileAppSection";

export default function Home() {
  return (
    <>
      <HeroWrapper />

      <main>
        <FeaturesSection />
        <MobileAppSection />
      </main>

      <Footer />
    </>
  );
}
