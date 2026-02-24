'use client';

import { useState } from 'react';
import { usePosts } from '@/lib/postsContext';
import { RescuePetCard } from '@/app/_features/RescuePetCard';
import shelter from '../../../../public/shelter.png';
import Image from 'next/image';
import { CuteSleepingCatLoader } from '@/app/_components/loading/CuteSleepingCatLoader';

const FILTERS = [
  { id: 'all', label: 'Бүгд' },
  { id: 'lost', label: 'Алдсан' },
  { id: 'found', label: 'Олсон' },
  { id: 'rescued', label: 'Аврагдсан' },
] as const;

export default function DashboardFindAnimalPage() {
  const { posts, postsLoading } = usePosts();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'dog' && post.type === 'dog') return true;
    if (activeFilter === 'cat' && post.type === 'cat') return true;
    if ((activeFilter === 'bunny' || activeFilter === 'hamster') && post.type === 'other') return true;
    return false;
  });

  const displayPosts = filteredPosts;

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (postsLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-64 h-64">
          <CuteSleepingCatLoader />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5 w-full max-w-6xl mx-auto px-6" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div className="flex flex-col items-start text-center" style={{ fontFamily: 'Tahoma, Veerdana, Segoe, sans-serif' }}>
        <div className="flex items-center gap-3">
          <Image src={shelter} alt="Shelter" width={44} height={44} className="shrink-0" />
          <h1 className="text-3xl font-bold leading-none">Амьтдыг олох</h1>
        </div>
        <p className="mt-2 text-muted-foreground">Өөрийн бүс нутагт алдагдсан болон олдсон амьтдыг үзэх</p>
      </div>

      <div className="flex shrink-0 flex-nowrap justify-start gap-3 overflow-x-auto pb-1">
        {' '}
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActiveFilter(f.id)}
            className={`whitespace-nowrap rounded-full px-6 py-1.5 text-sm font-medium transition-colors ${
              activeFilter === f.id ? 'bg-[#fc8d0e] text-white shadow-sm' : 'border-2 border-[#fc8d0e] bg-white text-[#fc8d0e] hover:bg-[#fc8d0e]/5'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayPosts.map((post) => (
          <RescuePetCard key={post.id} post={post} isFavorite={favorites.has(post.id)} onToggleFavorite={toggleFavorite} />
        ))}
      </div>
    </div>
  );
}
