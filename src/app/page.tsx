"use client";

import Footer from "./_features/footer";
import Headers from "./_features/headers";
import { HeroSection } from "./_features/heroSection";
import { RescuePetsSection } from "./_features/rescueSection";
import { VeterinarySection } from "./_features/veterinarySection";
import { ParallaxBackground } from "./_components/ParallaxBackground";

const Home = () => {
  return (
    <>
      <Headers />

      <div className="relative">
        <ParallaxBackground>
          <HeroSection />
          <RescuePetsSection />
          <VeterinarySection />
        </ParallaxBackground>
      </div>

      <Footer />
    </>
  );
};

export default Home;
