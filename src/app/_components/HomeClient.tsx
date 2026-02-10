'use client';

import { useState } from 'react';
import Headers from '../_features/Headers';
import Footer from '../_features/Footer';
import { HeroSection } from '../_features/heroSection';
import { RescuePetsSection } from '../_features/rescueSection';
import { VeterinarySection } from '../_features/veterinarySection';
import Chat from './Chat';

export default function HomeClient() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {/* 🔒 FIXED BACKGROUND (never moves) */}
      <div className="fixed inset-0 -z-10 bg-center bg-no-repeat bg-cover" style={{ backgroundImage: 'url("/7782992.jpg")' }} />

      {/* 🧊 SCROLLABLE CONTENT */}
      <div className="min-h-screen flex justify-center pt-20 px-6 py-10">
        <div
          className="
    relative
    w-full
    max-w-360
    rounded-[48px]
    border border-white/70
    bg-white/35
    backdrop-blur-xl
    shadow-[0_40px_120px_rgba(0,0,0,0.25)]
    overflow-hidden

    before:content-['']
    before:absolute
    before:inset-0
    before:rounded-[48px]
    before:bg-linear-to-br
    before:from-white/40
    before:via-white/10
    before:to-transparent
    before:pointer-events-none
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
    </>
  );
}
