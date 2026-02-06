'use client';

import { useState, useEffect } from 'react';
import { HeroSection } from '../_features/heroSection';
import { RescuePetsSection } from '../_features/rescueSection';
import { VeterinarySection } from '../_features/veterinarySection';
import Chat from './Chat';
import Footer from '../_features/Footer';
import Headers from '../_features/Headers';

export default function HomeClient() {
  const [chatOpen, setChatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen w-full" style={{ backgroundImage: 'url("/7782992.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
    );
  }

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center"
      style={{
<<<<<<< HEAD
        backgroundImage: 'url("/background.png")',
=======
        backgroundImage: 'url("/7782992.jpg")',
>>>>>>> origin/115-hero-zaya
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="relative z-10 w-full flex flex-col flex-grow">
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
