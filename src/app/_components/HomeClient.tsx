'use client';

import { useState } from 'react';
import { HeroSection } from '../_features/heroSection';
import { RescuePetsSection } from '../_features/rescueSection';
import { VeterinarySection } from '../_features/veterinarySection';
import Chat from './Chat';
import Footer from '../_features/Footer';
import Headers from '../_features/Headers';

export default function HomeClient() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Headers />

      <main>
        {/* 1. HERO SECTION WITH VIDEO BACKGROUND */}
        <section className="relative h-[100vh] w-full overflow-hidden">
          <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0" poster="/dog-fallback.png">
            <source src="/NiggaCat.mp4" type="video/mp4" />
          </video>

          {/* Харанхуйлах overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/5 z-5" />

          {/* Hero Content */}
          <div className="relative z-20 h-full">
            <HeroSection onOpenChat={() => setChatOpen(true)} />
          </div>
        </section>

        {/* 2. БУСАД ХЭСГҮҮД (Видеогүй хэсэг) */}
        <div className="relative bg-white z-30">
          <RescuePetsSection />
          <VeterinarySection />
        </div>
      </main>

      <Chat open={chatOpen} onOpenChange={setChatOpen} />
      <Footer />
    </>
  );
}
