'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { usePosts } from '@/lib/postsContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FeedPostCard } from './FeedPostCard';
import { RescuePetCard } from '@/app/_features/RescuePetCard';
import shelter from '../../../../public/shelter.png';
import Image from 'next/image';

const FILTERS = [
  { id: 'all', label: 'Бүгд' },
  { id: 'lost', label: 'Алдагдсан' },
  { id: 'found', label: 'Олдсон' },
] as const;

const FEED_POST_LIMIT = 6;

export default function DashboardFeedPage() {
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

  const displayPosts = filteredPosts.slice(0, FEED_POST_LIMIT);

  const { user } = useUser();

  const displayName = user?.fullName || user?.firstName || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || 'Хэрэглэгч';
  const userInitial = (displayName as string).charAt(0).toUpperCase();

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
      <section id="adopt" className="min-h-[70vh] px-4 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 py-16">
          <p className="text-gray-500">Уншиж байна...</p>
        </div>
      </section>
    );
  }
  return (
    <div className="flex flex-col gap-10 p-6 w-360" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div className="flex flex-col items-start text-center" style={{ fontFamily: 'Tahoma, Veerdana, Segoe, sans-serif' }}>
        {' '}
        <div className="flex items-center gap-3">
          <Image src={shelter} alt="Shelter" width={44} height={44} className="shrink-0" />
          <h1 className="text-3xl font-bold leading-none">Амьтдыг олох</h1>
        </div>
        <p className="mt-2 text-muted-foreground">Өөрийн бүс нутагт алдагдсан болон олдсон амьтдыг үзэх</p>
      </div>

      <div className="flex shrink-0 flex-wrap justify-start gap-3">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActiveFilter(f.id)}
            className={`rounded-full px-6 py-1.5 text-sm font-medium transition-colors ${
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
      <div className="mx-auto max-w-xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Feed</h1>
          <p className="text-gray-600">Хэрэглэгчийн оруулсан олдсон амьтдын зарууд</p>
        </div>
        <Link href="/dashboard/add-post" className="mb-6 flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:bg-gray-50">
          <Avatar className="h-10 w-10 rounded-full border-2 border-gray-100">
            <AvatarImage src={user?.imageUrl} alt={displayName as string} />
            <AvatarFallback className="bg-[#f18912] text-white">{userInitial}</AvatarFallback>
          </Avatar>
          <div className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-left text-gray-500 transition-colors hover:bg-gray-100">
            Юу бодож байна вэ? Олдсон амьтад оруулах...
          </div>
        </Link>
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white py-16 shadow-sm">
            <PlusCircle className="mb-4 h-16 w-16 text-gray-300" />
            <p className="mb-2 text-center text-gray-600">Одоогоор пост байхгүй</p>
            <p className="mb-6 text-center text-sm text-gray-500">Анхны пост оруулаад эхлээрэй</p>
            <Link href="/dashboard/add-post" className="inline-flex items-center gap-2 rounded-lg bg-[#f18912] px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#ffa616]">
              <PlusCircle className="h-5 w-5" />
              Пост оруулах
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <FeedPostCard key={post.id} post={post} displayName={displayName as string} userImageUrl={user?.imageUrl} isFavorite={favorites.has(post.id)} onToggleFavorite={toggleFavorite} />
            ))}
            <Link
              href="/dashboard/add-post"
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-4 text-sm font-medium text-gray-600 transition-colors hover:border-[#f18912]/50 hover:bg-[#f18912]/5 hover:text-[#f18912]"
            >
              <PlusCircle className="h-5 w-5" />
              Шинэ пост оруулах
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
