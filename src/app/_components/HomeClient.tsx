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
      <div className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_8%_12%,#ffc891_0%,transparent_30%),radial-gradient(circle_at_92%_10%,#ffe2be_0%,transparent_28%),radial-gradient(circle_at_54%_88%,#ffd9b3_0%,transparent_36%),linear-gradient(160deg,#fff6ec_0%,#fff2e4_48%,#fffaf3_100%)]">
        <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:repeating-linear-gradient(125deg,rgba(251,146,60,0.08)_0px,rgba(251,146,60,0.08)_1px,transparent_1px,transparent_16px)]" />
        <div className="pointer-events-none absolute -left-28 -top-28 h-96 w-96 rounded-full bg-orange-300/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 top-20 h-[28rem] w-[28rem] rounded-full bg-amber-200/40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-120px] left-1/2 h-[360px] w-[700px] -translate-x-1/2 rounded-full bg-orange-100/60 blur-3xl" />
        <div className="pointer-events-none absolute left-[8%] top-[28%] h-44 w-44 rounded-full border border-amber-200/70 bg-white/20 backdrop-blur-sm" />
        <div className="pointer-events-none absolute right-[10%] top-[42%] h-36 w-36 rounded-full border border-white/70 bg-white/35 backdrop-blur-sm" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-white/45" />

        <div className="relative flex justify-center px-6 pb-12 pt-16">
          <div className="relative w-full max-w-450 rounded-[54px] bg-linear-to-br from-white/90 via-white/45 to-amber-100/30 p-[1px] shadow-[0_45px_120px_rgba(94,52,20,0.2),0_12px_28px_rgba(124,64,16,0.12)]">
            <div
              id="home-theme"
              className="
                relative
                overflow-hidden
                rounded-[52px]
                border border-white/70
                bg-white/74
                backdrop-blur-[22px]
              "
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-white/60 to-transparent" />
              <div className="pointer-events-none absolute -left-10 top-20 h-40 w-40 rounded-full bg-orange-100/40 blur-2xl" />
              <div className="pointer-events-none absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-amber-100/45 blur-2xl" />
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

      <style jsx global>{`
        #home-theme .bg-\\[\\#FF782D\\],
        #home-theme .bg-\\[\\#fc8d0e\\],
        #home-theme .bg-\\[\\#fba925\\],
        #home-theme .bg-\\[\\#f88a0c\\],
        #home-theme .bg-\\[\\#4f9669\\] {
          background-color: #FFBE98 !important;
        }

        #home-theme .hover\\:bg-\\[\\#f06f23\\]:hover,
        #home-theme .hover\\:bg-\\[\\#fc8d0e\\]:hover,
        #home-theme .hover\\:bg-\\[\\#f89d35\\]:hover,
        #home-theme .hover\\:bg-\\[\\#5d8a60\\]:hover,
        #home-theme .hover\\:bg-\\[\\#f47d46\\]:hover {
          background-color: #FFBE98 !important;
        }

        #home-theme .text-\\[\\#FF782D\\],
        #home-theme .text-\\[\\#fc8d0e\\],
        #home-theme .text-\\[\\#fba925\\] {
          color: #FFBE98 !important;
        }

        #home-theme .border-\\[\\#FF782D\\],
        #home-theme .border-\\[\\#fc8d0e\\],
        #home-theme .border-\\[\\#f88a0c\\],
        #home-theme .border-\\[\\#4f9669\\] {
          border-color: #FFBE98 !important;
        }
      `}</style>
    </PawBackground>
  );
}
