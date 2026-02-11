'use client';

import { useState } from 'react';
import Headers from '../_features/Headers';
import Footer from '../_features/Footer';
import { HeroSection } from '../_features/heroSection';
import { RescuePetsSection } from '../_features/rescueSection';
import { VeterinarySection } from '../_features/veterinarySection';
import Chat from './Chat';
import { SparklesPreview } from '@/components/ui/SparkStar';

export default function HomeClient() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-cover bg-center">
      {/* ✨ FIXED BACKGROUND */}
      <div className="fixed inset-0 w-full h-screen -z-10 overflow-hidden">
        <SparklesPreview className="w-full h-full" />
      </div>

      {/* 🧊 CONTENT AREA */}
      <div className="relative flex justify-center pt-20 px-6 py-10">
        <div
          className="
            relative
            w-full
            max-w-[1800px]
            rounded-[48px]
            border border-white/70
            bg-white/10
            backdrop-blur-xl
            shadow-[0_40px_120px_rgba(0,0,0,0.25)]
            overflow-hidden
          "
        >
          <Headers />
          <main>
            <HeroSection onOpenChat={() => setChatOpen(true)} />
            <RescuePetsSection />
            <VeterinarySection />
          </main>
          <Footer />
        </div>
      </div>

      <Chat open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
}
