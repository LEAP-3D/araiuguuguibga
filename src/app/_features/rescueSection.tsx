'use client';

import { useState } from 'react';
import { usePosts } from '@/lib/postsContext';
import { RescueEmptyState, RescueHeader } from './RescueSectionParts';
import { RescuePetCard, RescueFooterActions } from './RescuePetCard';
import { NeonGradientCard } from '@/components/ui/neon-gradient-card';
import { CuteSleepingCatLoader } from '../_components/loading/CuteSleepingCatLoader';

const FILTERS = [
  { id: 'all', label: 'Бүгд' },
  { id: 'dog', label: 'Нохой' },
  { id: 'cat', label: 'Муур' },
  { id: 'Бусад', label: 'Бусад' },
] as const;

const FEED_POST_LIMIT = 6;

export function RescuePetsSection() {
  const { posts, postsLoading } = usePosts();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'dog' && post.type === 'dog') return true;
    if (activeFilter === 'cat' && post.type === 'cat') return true;
    if ((activeFilter === 'Бусад' || activeFilter === 'hamster') && post.type === 'other') return true;
    return false;
  });

  const displayPosts = filteredPosts.slice(0, FEED_POST_LIMIT);

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
      <section id="adopt" className="scroll-mt-28 min-h-[70vh] px-4 py-12 flex flex-col">
        <RescueHeader />
        <div className="flex-1 w-full flex items-center justify-center min-h-[50vh]">
          <div className="w-64 h-64">
            <CuteSleepingCatLoader />
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) return <RescueEmptyState />;

  return (
    <section id="adopt" className="scroll-mt-28 min-h-[70vh] px-4 py-12">
      <RescueHeader />
      <div className="mx-auto max-w-7xl flex flex-col gap-5">
        <div className="flex shrink-0 flex-wrap justify-center gap-3">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFilter(f.id)}
              className={`rounded-full px-6 py-1.5 text-sm font-medium hover:bg-[#fc8d0e] transition-colors ${
                activeFilter === f.id ? 'bg-[#fc8d0e] hover:bg-[#fc8d0e] text-white shadow-sm' : 'border-2 border-[#fc8d0e] bg-white text-[#fc8d0e] hover:bg-[#fc8d0e]/5'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="overflow-visible">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 overflow-visible">
            {displayPosts.map((post) => (
              <NeonGradientCard
                key={post.id}
                borderSize={1}
                borderRadius={24}
                neonColors={{ firstColor: '#ff9a56', secondColor: '#FFBE98' }}
              >
                <RescuePetCard post={post} isFavorite={favorites.has(post.id)} onToggleFavorite={toggleFavorite} noBorder />
              </NeonGradientCard>
            ))}
          </div>
        </div>
        <RescueFooterActions postCount={posts.length} />
      </div>
    </section>
  );
}
