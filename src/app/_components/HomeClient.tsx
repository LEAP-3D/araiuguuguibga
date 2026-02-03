"use client";

import { useState } from "react";
import { HeroSection } from "../_features/heroSection";
import { RescuePetsSection } from "../_features/rescueSection";
import { VeterinarySection } from "../_features/veterinarySection";
import { ParallaxImageBg } from "./ParallaxImageBg";

import Chat from "./Chat";
import Footer from "../_features/Footer";
import Headers from "../_features/Headers";

export default function HomeClient() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Headers />

      <ParallaxImageBg
        src="/dog.png"
        filter="blur(2.5px) brightness(1)"
        overlay="bg-gradient-to-b from-white/30 via-white/15 to-white/80"
        fixed={true}
        className="min-h-screen"
      >
        <div className="">
        <div className="relative ">
          <HeroSection onOpenChat={() => setChatOpen(true)} />
          <RescuePetsSection />
          <VeterinarySection />
        </div>
        </div>
      </ParallaxImageBg>
      <Chat open={chatOpen} onOpenChange={setChatOpen} />
      <Footer />
    </>
  );
}
