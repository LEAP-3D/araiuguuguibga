'use client';

import { useState } from 'react';
import PhoneHeader from '../_components/pwa/header';
import { RescuePetsSection } from '../_features/rescueSection';
import { VeterinarySection } from '../_features/veterinarySection';
import { Home, PawPrintIcon, Map as MapIcon, User, MessageSquareHeart } from 'lucide-react';
import ProfileCard from '../_components/Profile/ProfileCard';
import AiGenerator from '../_features/aiGenerator';
import { CuteSleepingCatLoader } from '../_components/loading/CuteSleepingCatLoader';

type Tab = 'home' | 'rescue' | 'map' | 'profile' | 'ai';

export default function HomeMobile() {
  const handleMenuClick = () => {
    console.log('Sidebar menu clicked!');
    // You can open a sidebar or drawer here
  };

  const [active, setActive] = useState<Tab>('home');

  return (
    <div className="min-h-screen bg-[#FFFEF9] pb-20 flex flex-col ">
      <main>
        {active === 'home' && <PhoneHeader logoSrc="/caticon.png" onMenuClick={handleMenuClick} />}
        {active === 'rescue' && <RescuePetsSection />}
        {active === 'map' && <VeterinarySection />}
        {active === 'profile' && <ProfileCard />}
        {active === 'ai' && <AiGenerator />}
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
        <button onClick={() => setActive('ai')}>
          <MessageSquareHeart size={22} />
        </button>
        <button onClick={() => setActive('profile')}>
          <User size={22} />
        </button>
      </nav>
    </div>
  );
}
