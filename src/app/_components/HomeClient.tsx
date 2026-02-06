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
    <div
      className="relative min-h-screen w-full flex flex-col items-center"
      style={{
        backgroundImage: 'url("/background.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* 1. Шилэн Контейнер */}
      <div className="relative z-10 w-[94%] max-w-360 my-24  backdrop-blur-[25px]  rounded-[50px] shadow-2xl overflow-hidden flex flex-col ">
        <Headers />

        <main className="flex-grow">
          <HeroSection onOpenChat={() => setChatOpen(true)} />
          <div className="relative">
            <RescuePetsSection />
            <div className="h-20" />
            <VeterinarySection />
          </div>
        </main>

        <Footer />
      </div>

      <Chat open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
}
