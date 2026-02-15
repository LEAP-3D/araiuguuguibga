'use client';

import Link from 'next/link';
import { Heart, PlusCircle } from 'lucide-react';
import { PetImage } from '@/app/_components/PetImage';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import RescuePetDetail from './RescuePetDetail';

const typeLabels: Record<string, string> = {
  dog: 'Нохой',
  cat: 'Муур',
  other: 'Бусад',
};

type Post = {
  id: string;
  name: string;
  breed: string;
  age: string;
  type: string;
  description: string;
  location: string;
  image: string;
};

type RescuePetCardProps = {
  post: Post;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};

export function RescuePetCard({ post, isFavorite, onToggleFavorite }: RescuePetCardProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div
            className="group flex h-[420px] flex-col overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-md transition-all hover:shadow-lg"
            style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <div className="relative w-full h-50 overflow-hidden rounded-t-2xl">
              <PetImage image={post.image} />

              <button
                type="button"
                onClick={() => onToggleFavorite(post.id)}
                className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                  isFavorite ? 'border-transparent bg-white/90 text-red-500' : 'border-white/80 bg-white/60 text-gray-600 hover:bg-white/80'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="text-lg font-extrabold text-black">{post.name || 'Нэр тодорхойгүй'}</h3>
                <span className="shrink-0 rounded-full border-2 border-[#efac48] px-3 py-1 text-xs font-extrabold text-black">{typeLabels[post.type] ?? 'Бусад'}</span>
              </div>

              <p className="mb-4 line-clamp-3 text-sm text-gray-800 min-h-[60px]">{post.description || '—'}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <p>nas:</p>
                  {post.age || '—'}
                </span>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="w-220 h-auto flex flex-col justify-between ">
          <DialogHeader className="hidden">
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
          </DialogHeader>
          <RescuePetDetail post={post} isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} />
        </DialogContent>
      </form>
    </Dialog>
  );
}

export function RescueFooterActions({ postCount }: { postCount: number }) {
  const FEED_POST_LIMIT = 10;
  return (
    <div className="flex shrink-0 flex-wrap justify-center gap-4 py-2">
      {postCount > FEED_POST_LIMIT && (
        <Link
          href="/dashboard/find-animals"
          className="inline-flex items-center gap-2 rounded-full border-2 border-amber-300 bg-white px-6 py-2.5 text-sm font-medium text-amber-800 transition-colors hover:bg-amber-50"
        >
          Бүгдийг харах ({postCount})
        </Link>
      )}
      <Link href="/dashboard/add-post" className="inline-flex items-center gap-2 rounded-full bg-[#ff9900ec] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#5d8a60]">
        <PlusCircle className="h-5 w-5" />
        Пост оруулах
      </Link>
    </div>
  );
}
