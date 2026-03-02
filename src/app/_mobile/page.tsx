'use client';

import { useState } from 'react';
import { Home, Map as MapIcon, User, SquarePlus, Bot } from 'lucide-react';
import Link from 'next/link';
import Header from './_components/header';
import Map from '../dashboard/map/page';
import { AddPostForm } from '../dashboard/add-post/AddPostForm';
import Profile from '../profile/page';
import AiGenerator from '../_features/aiGenerator';
import { usePosts } from '@/lib/postsContext';

type Tab = 'home' | 'ai' | 'map' | 'post' | 'user';
const MINI_RESCUE_LIMIT = 4;
const STATUS_LABELS = {
  lost: 'Алдагдсан',
  found: 'Олдсон',
  rescued: 'Аврагдсан',
} as const;

export default function HomeMobile() {
  const [active, setActive] = useState<Tab>('home');
  const { posts, postsLoading } = usePosts();
  const miniRescuePosts = posts.slice(0, MINI_RESCUE_LIMIT);

  return (
    <div className="min-h-screen bg-[#FFFEF9] pb-20">
      <main>
        {active === 'home' && (
          <div>
            <Header />
            <section className="px-3 pb-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-bold text-[#2f241b]">Mini Rescue</h2>
                <Link href="/dashboard/find-animals" className="text-xs font-semibold text-[#fc8d0e]">
                  Бүгдийг харах
                </Link>
              </div>

              {postsLoading ? (
                <p className="rounded-xl bg-white px-3 py-4 text-sm text-[#7a6a5f] shadow-sm">Rescue постууд ачаалж байна...</p>
              ) : miniRescuePosts.length === 0 ? (
                <p className="rounded-xl bg-white px-3 py-4 text-sm text-[#7a6a5f] shadow-sm">Одоогоор rescue пост алга байна.</p>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {miniRescuePosts.map((post) => (
                    <Link key={post.id} href="/dashboard/find-animals" className="overflow-hidden rounded-2xl bg-white shadow-sm">
                      <div className="relative h-24 w-full bg-[#f8efe7]">
                        {post.image ? (
                          // eslint-disable-next-line @next/next/no-img-element -- rescue post images can be external URLs
                          <img src={post.image} alt={post.name || 'Rescue pet'} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs font-semibold text-[#a27e64]">No image</div>
                        )}
                        <span className="absolute bottom-1 left-1 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-[#8a4d25]">{STATUS_LABELS[post.status]}</span>
                      </div>
                      <div className="px-2.5 py-2">
                        <p className="line-clamp-1 text-xs font-bold text-[#2f241b]">{post.name || 'Нэргүй'}</p>
                        <p className="line-clamp-1 text-[11px] text-[#7a6a5f]">{post.location || 'Байршилгүй'}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
        {active === 'ai' && <AiGenerator />}
        {active === 'post' && <AddPostForm />}
        {active === 'map' && <Map />}
        {active === 'user' && <Profile />}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-[4000] flex h-16 items-center justify-around border-t bg-white px-10 shadow-md">
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
