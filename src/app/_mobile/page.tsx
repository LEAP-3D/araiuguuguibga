'use client';

import { useEffect, useState } from 'react';
import { Home, Map as MapIcon, User, SquarePlus, Bot } from 'lucide-react';
import Link from 'next/link';
import Header from './_components/header';
import Map from '../dashboard/map/page';
import { AddPostForm } from '../dashboard/add-post/AddPostForm';
import AiGenerator from '../_features/aiGenerator';
import { usePosts } from '@/lib/postsContext';
import HospitalsMap from './_components/hospitalsMap';
import UserTab from './userTab';

type Tab = 'home' | 'ai' | 'map' | 'post' | 'user';

const MINI_RESCUE_LIMIT = 4;
const STATUS_LABELS = {
  lost: 'Алдагдсан',
  found: 'Олдсон',
  rescued: 'Аврагдсан',
} as const;

const TAB_ITEMS: Array<{ id: Tab; label: string; icon: typeof Home }> = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'ai', label: 'AI', icon: Bot },
  { id: 'post', label: 'Post', icon: SquarePlus },
  { id: 'map', label: 'Map', icon: MapIcon },
  { id: 'user', label: 'User', icon: User },
];

export default function HomeMobile() {
  const [active, setActive] = useState<Tab>('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const { posts, postsLoading } = usePosts();
  const miniRescuePosts = posts.slice(0, MINI_RESCUE_LIMIT);
  const safeCurrentSlide = miniRescuePosts.length > 0 ? currentSlide % miniRescuePosts.length : 0;

  useEffect(() => {
    if (active !== 'home' || miniRescuePosts.length <= 1) return;
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % miniRescuePosts.length);
    }, 2800);
    return () => window.clearInterval(interval);
  }, [active, miniRescuePosts.length]);

  return (
    <div className="min-h-screen bg-[#f3efe8] px-0 py-0 sm:px-4 sm:py-6" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div className="mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-[#FFFEF9] shadow-[0_16px_60px_rgba(0,0,0,0.12)] sm:min-h-[calc(100dvh-3rem)] sm:rounded-[32px] sm:border sm:border-white/80">
        <main className="min-h-[100dvh] pb-[calc(env(safe-area-inset-bottom)+88px)] sm:min-h-[calc(100dvh-3rem)]">
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
                  <div>
                    <div className="overflow-hidden rounded-2xl">
                      <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${safeCurrentSlide * 100}%)` }}>
                        {miniRescuePosts.map((post) => (
                          <Link key={post.id} href="/dashboard/find-animals" className="w-full shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm">
                            <div className="relative h-40 w-full bg-[#f8efe7]">
                              {post.image ? (
                                // eslint-disable-next-line @next/next/no-img-element -- rescue post images can be external URLs
                                <img src={post.image} alt={post.name || 'Rescue pet'} className="h-full w-full object-cover" />
                              ) : (
                                <div className="flex h-full items-center justify-center text-xs font-semibold text-[#a27e64]">No image</div>
                              )}
                              <span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-[#8a4d25]">{STATUS_LABELS[post.status]}</span>
                            </div>
                            <div className="px-3 py-2.5">
                              <p className="line-clamp-1 text-sm font-bold text-[#2f241b]">{post.name || 'Нэргүй'}</p>
                              <p className="line-clamp-1 text-xs text-[#7a6a5f]">{post.location || 'Байршилгүй'}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-1.5">
                      {miniRescuePosts.map((post, idx) => (
                        <button
                          key={post.id}
                          type="button"
                          onClick={() => setCurrentSlide(idx)}
                          className={`h-1.5 rounded-full transition-all ${idx === safeCurrentSlide ? 'w-4 bg-[#f28a50]' : 'w-1.5 bg-[#e0c7b5]'}`}
                          aria-label={`Slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </section>

              <section className="px-3 pb-4">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-base font-bold text-[#2f241b]">Hospitals Map</h2>
                  <Link href="/dashboard/map" className="text-xs font-semibold text-[#fc8d0e]">
                    Дэлгэрэнгүй
                  </Link>
                </div>
                <div className="h-56 overflow-hidden rounded-2xl border border-[#f6d9bf] bg-white shadow-sm">
                  <HospitalsMap className="h-full w-full" />
                </div>
              </section>
            </div>
          )}
          {active === 'ai' && <AiGenerator />}
          {active === 'post' && <AddPostForm />}
          {active === 'map' && <Map />}
          {active === 'user' && <UserTab onBackHome={() => setActive('home')} />}
        </main>

        <nav className="fixed bottom-0 left-1/2 z-[5000] w-full max-w-[430px] -translate-x-1/2 px-3 pb-[max(8px,env(safe-area-inset-bottom))]">
          <div className="flex h-[68px] items-center justify-between rounded-3xl border border-[#f7d8bf] bg-white/95 px-3 shadow-[0_14px_36px_rgba(71,37,14,0.22)] backdrop-blur-sm">
            {TAB_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  className={`flex h-[52px] min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-2xl transition ${
                    isActive ? 'bg-[#fff0e4] text-[#f28a50]' : 'text-[#7f6a5a]'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'stroke-[2.5]' : ''} />
                  <span className="text-[10px] font-semibold leading-none">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
