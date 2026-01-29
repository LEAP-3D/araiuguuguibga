"use client";

import { HeroSection } from "../_features/heroSection";
import { RescuePetsSection } from "../_features/rescueSection";
import { VeterinarySection } from "../_features/veterinarySection";
import { ParallaxBackground } from "./ParallaxBackground";
import Chat from "./Chat";
import Footer from "../_features/Footer";
import Headers from "../_features/Headers";

export default function HomeClient() {
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
}
