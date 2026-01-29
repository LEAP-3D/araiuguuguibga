"use client";

import { HeroSection } from "./_features/heroSection";
import { RescuePetsSection } from "./_features/rescueSection";
import { VeterinarySection } from "./_features/veterinarySection";
import { ParallaxBackground } from "./_components/ParallaxBackground";
import Chat from "././_components/Chat";
import Footer from "./_features/Footer";
import Headers from "./_features/Headers";

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
      <Chat />
      <Footer />
    </>
  );
};

export default Home;
