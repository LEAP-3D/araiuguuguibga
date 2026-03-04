'use client';

import { useEffect, useState } from 'react';
import { Home, Map as MapIcon, User, SquarePlus, Bot } from 'lucide-react';
import Header from './_components/header';
import { AddPostForm } from '../dashboard/add-post/AddPostForm';
import { usePosts } from '@/lib/postsContext';
import { TestNotificationButton } from '@/components/TestNotificationButton';
import HospitalsMap from './_components/hospitalsMap';
import UserTab from './userTab';
import MobileMapTab from './mapTab';
import MobileAiTab from './aiTab';
import { CuteSleepingCatLoader } from '../_components/loading/CuteSleepingCatLoader';
import RescuePetDetail from '../_features/RescuePetDetail';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Tab = 'home' | 'ai' | 'map' | 'post' | 'user';
const MINI_RESCUE_LIMIT = 4;
const STATUS_LABELS = {
  lost: 'Алдагдсан',
  found: 'Олдсон',
  rescued: 'Аврагдсан',
} as const;

const TAB_ITEMS: Array<{ id: Tab; label: string; icon: typeof Home }> = [
  { id: 'home', label: 'Нүүр', icon: Home },
  { id: 'map', label: 'Газрын зураг', icon: MapIcon },
  { id: 'post', label: 'Пост', icon: SquarePlus },
  { id: 'ai', label: 'AI', icon: Bot },
  { id: 'user', label: 'Хэрэглэгч', icon: User },
];

export default function HomeMobile() {
  const [active, setActive] = useState<Tab>('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const { posts, postsLoading } = usePosts();
  const miniRescuePosts = posts.slice(0, MINI_RESCUE_LIMIT);
  const safeCurrentSlide = miniRescuePosts.length > 0 ? currentSlide % miniRescuePosts.length : 0;
  const selectedPost = selectedPostId ? posts.find((post) => post.id === selectedPostId) : null;
  useEffect(() => {
    if (active !== 'home' || miniRescuePosts.length <= 1) return;
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % miniRescuePosts.length);
    }, 2800);
    return () => window.clearInterval(interval);
  }, [active, miniRescuePosts.length]);
  return (
    <div className="mobile-system-font min-h-[100dvh] bg-[#f3efe8] md:px-4 md:py-4" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div className="mx-auto min-h-[100dvh] w-full overflow-hidden bg-[#FFFEF9] md:min-h-[calc(100dvh-2rem)] md:max-w-[560px] md:rounded-[28px] md:border md:border-white/80 md:shadow-[0_16px_60px_rgba(0,0,0,0.12)]">
        <main className="min-h-[100dvh] pb-[calc(env(safe-area-inset-bottom)+88px)]">
          {active === 'home' && (
            <div>
              <Header />
              <section className="px-3 pb-4">
                {postsLoading ? (
                  <CuteSleepingCatLoader />
                ) : miniRescuePosts.length === 0 ? (
                  <p className="rounded-xl bg-white px-3 py-4 text-sm text-[#7a6a5f] shadow-sm">Одоогоор rescue пост алга байна.</p>
                ) : (
                  <div>
                    <div className="overflow-hidden rounded-2xl">
                      <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${safeCurrentSlide * 100}%)` }}>
                        {miniRescuePosts.map((post) => (
                          <button key={post.id} type="button" onClick={() => setSelectedPostId(post.id)} className="w-full shrink-0 overflow-hidden rounded-2xl bg-white text-left shadow-sm">
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
                          </button>
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
                  <h2 className="font-bold text-[#2f241b]">Эмнэлгүүдийн байршил</h2>
                  <button type="button" onClick={() => setActive('map')} className="text-[14px] cursor-pointer font-semibold text-[#fa8500]">
                    Дэлгэрэнгүй
                  </button>
                </div>
                <div className="h-56 overflow-hidden rounded-2xl border border-[#f6d9bf] bg-white shadow-sm">
                  <HospitalsMap className="h-full w-full" />
                </div>
                <div className="mt-3 space-y-3">
                  {postsLoading ? (
                    <CuteSleepingCatLoader />
                  ) : posts.length === 0 ? (
                    <p className="rounded-xl bg-white px-3 py-4 text-sm text-[#7a6a5f] shadow-sm">Одоогоор rescue пост алга байна.</p>
                  ) : (
                    posts.map((post) => (
                      <button
                        key={post.id}
                        type="button"
                        onClick={() => setSelectedPostId(post.id)}
                        className="block w-full overflow-hidden rounded-2xl border border-[#f1dac8] bg-white text-left shadow-sm"
                      >
                        <div className="relative h-44 w-full bg-[#f8efe7]">
                          {post.image ? (
                            // eslint-disable-next-line @next/next/no-img-element -- rescue post images can be external URLs
                            <img src={post.image} alt={post.name || 'Rescue pet'} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-[#a27e64]">No image</div>
                          )}
                          <span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2 py-0.5 text-[10px] text-[#8a4d25]">{STATUS_LABELS[post.status]}</span>
                        </div>
                        <div className="px-3 py-2.5">
                          <p className="line-clamp-1 text-sm text-[#2f241b]">{post.name || 'Нэргүй'}</p>
                          <p className="mt-1 line-clamp-2 text-xs text-[#7a6a5f]">{post.description || 'Тайлбар оруулаагүй байна.'}</p>
                          <p className="mt-1 line-clamp-1 text-xs text-[#7a6a5f]">{post.location || 'Байршилгүй'}</p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </section>
            </div>
          )}{' '}
          {active === 'map' && <MobileMapTab />}
          {active === 'post' && <AddPostForm mobileMode />}
          {active === 'ai' && <MobileAiTab />}
          {active === 'user' && <UserTab />}
        </main>
        <Dialog open={Boolean(selectedPost)} onOpenChange={(open) => !open && setSelectedPostId(null)}>
          <DialogContent className="h-auto max-h-[92vh] w-[96vw] max-w-5xl overflow-y-auto p-2 md:p-4 border-0 outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
            <DialogHeader className="hidden">
              <DialogTitle>Rescue post details</DialogTitle>
            </DialogHeader>
            {selectedPost && <RescuePetDetail post={selectedPost} onClose={() => setSelectedPostId(null)} />}
          </DialogContent>
        </Dialog>

        <nav className={`fixed inset-x-0 bottom-0 z-[5000] px-3 pb-[max(8px,env(safe-area-inset-bottom))] ${selectedPost ? 'hidden' : ''}`}>
          <div className="mx-auto w-full md:max-w-[560px]">
            <div className="flex h-[68px] items-center justify-between rounded-3xl border border-[#f7d8bf] bg-white/95 px-3 shadow-[0_14px_36px_rgba(71,37,14,0.22)] backdrop-blur-sm">
              {TAB_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActive(item.id)}
                    className={`flex h-[52px] min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-2xl transition ${isActive ? 'bg-[#fff0e4] text-[#f28a50]' : 'text-[#7f6a5a]'}`}
                  >
                    <Icon size={20} className={isActive ? 'stroke-[2.5]' : ''} />
                    <span className="text-[10px] font-semibold leading-none">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
