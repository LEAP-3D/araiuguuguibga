'use client';

import { useState } from 'react';
import { HeroSection } from '../_features/heroSection';
import { RescuePetsSection } from '../_features/rescueSection';
import { VeterinarySection } from '../_features/veterinarySection';
import { Home, PawPrintIcon, Map as MapIcon, User, SquarePlus, Bot } from 'lucide-react';
import Header from './_components/header';
import Map from '../dashboard/map/page';
import { AddPostForm } from '../dashboard/add-post/AddPostForm';
import Profile from '../profile/page';
import ProfileMobile from './profileMobile';

type Tab = 'home' | 'ai' | 'map' | 'post' | 'user';

export default function HomeMobile() {
  const [active, setActive] = useState<Tab>('home');

  return (
    <div className="min-h-screen bg-[#FFFEF9] pb-20">
      <main>
        {active === 'home' && <Header />}
        {active === 'ai' && <RescuePetsSection />}
        {active === 'post' && <AddPostForm />}
        {active === 'map' && <Map />}
        {active === 'user' && <Profile />}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around bg-white border-t h-16 shadow-md">
        <button onClick={() => setActive('home')}>
          <Home size={22} />
        </button>
        <button onClick={() => setActive('ai')}>
          <Bot size={22} />
        </button>
        <button onClick={() => setActive('post')}>
          <SquarePlus size={22} />
        </button>
        <button onClick={() => setActive('map')}>
          <MapIcon size={22} />
        </button>{' '}
        <button onClick={() => setActive('user')}>
          <User size={22} />
        </button>
      </nav>
    </div>
  );
}
