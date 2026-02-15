'use client';

import { useState } from 'react';
import { HeroSection } from '../_features/heroSection';
import { RescuePetsSection } from '../_features/rescueSection';
import { VeterinarySection } from '../_features/veterinarySection';
import { Home, PawPrintIcon, Map as MapIcon } from 'lucide-react';

type Tab = 'home' | 'rescue' | 'map';

export default function HomeMobile() {
  const [active, setActive] = useState<Tab>('home');

  return (
    <div className="min-h-screen bg-[#FFFEF9] pb-20">

      <main>
        {active === 'home' && <HeroSection />}
        {active === 'rescue' && <RescuePetsSection />}
        {active === 'map' && <VeterinarySection />}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around bg-white border-t h-16 shadow-md">
        <button onClick={() => setActive('home')}>
          <Home size={22} />
        </button>
        <button onClick={() => setActive('rescue')}>
          <PawPrintIcon size={22} />
        </button>
        <button onClick={() => setActive('map')}>
          <MapIcon size={22} />
        </button>
      </nav>
    </div>
  );
}
