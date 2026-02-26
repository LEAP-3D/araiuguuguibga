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
import AiGenerator from '../_features/aiGenerator';

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
      <div className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_10%_15%,#ffd7ad_0%,transparent_32%),radial-gradient(circle_at_88%_12%,#ffe8c9_0%,transparent_30%),radial-gradient(circle_at_50%_85%,#ffd9b8_0%,transparent_40%),linear-gradient(165deg,#fff8f0_0%,#fff5e9_45%,#fffaf5_100%)]">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(125deg,rgba(252,165,91,0.08)_0px,rgba(252,165,91,0.08)_1px,transparent_1px,transparent_18px)]" />
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-orange-300/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-28 h-96 w-96 rounded-full bg-amber-200/35 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-140px] left-1/2 h-[380px] w-[620px] -translate-x-1/2 rounded-full bg-orange-100/60 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-white/35" />

        <div className="relative flex justify-center px-6 pb-10 pt-20">
          <div className="relative w-full max-w-450 rounded-[52px] bg-linear-to-b from-white/80 via-white/35 to-amber-100/20 p-[1px] shadow-[0_40px_120px_rgba(94,52,20,0.18)]">
            <div
              className="
                relative
                overflow-hidden
                rounded-[50px]
                border border-white/60
                bg-white/78
                backdrop-blur-2xl
              "
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-white/55 to-transparent" />
              <Headers />
              <main>
                <HeroSection onOpenChat={() => setChatOpen(true)} />
                <RescuePetsSection />
                <AiGenerator />
                <VeterinarySection />
              </main>
              <Footer />
            </div>
          </div>
        </div>

        <Chat open={chatOpen} onOpenChange={setChatOpen} />
      </div>
    </PawBackground>
  );
}
