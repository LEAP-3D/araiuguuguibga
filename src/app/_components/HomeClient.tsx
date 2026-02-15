'use client';

import { useEffect, useState } from 'react';
import Headers from '../_features/Headers';
import Footer from '../_features/Footer';
import { HeroSection } from '../_features/heroSection';
import { RescuePetsSection } from '../_features/rescueSection';
import { VeterinarySection } from '../_features/veterinarySection';
import Chat from './Chat';
import { PawBackground } from './paw-trail/PawBackground';
import HomeMobile from '../_mobile/page'; 

export default function HomeClient() {
  const [chatOpen, setChatOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  if (isMobile) {
    return <HomeMobile />;
  }

  return (
    <PawBackground>
      <div className="relative min-h-screen w-full bg-cover bg-center">
        <div className="relative flex justify-center pt-20 px-6 py-10">
          <div
            className="
              relative
              w-full
              max-w-450
              rounded-[48px]
              border border-white/70
              bg-white/90
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
    </PawBackground>
  );
}
