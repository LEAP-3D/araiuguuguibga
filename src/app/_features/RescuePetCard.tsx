'use client';

import Link from 'next/link';
import { Heart, MapPin, PawPrint, PlusCircle } from 'lucide-react';
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
  noBorder?: boolean;
};

export function RescuePetCard({ post, isFavorite, onToggleFavorite, noBorder }: RescuePetCardProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div
            className={`group flex h-[500px] cursor-pointer flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-white to-[#fff8f2] shadow-[0_10px_28px_rgba(84,45,16,0.1)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_42px_rgba(84,45,16,0.16)] ${noBorder ? '' : 'border border-[#f6d9bf]'}`}
            style={{ fontFamily: 'ui-rounded, system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <div className="relative h-[290px] w-full overflow-hidden">
              <PetImage image={post.image} />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-[11px] font-extrabold text-[#8a4d25] shadow-sm">
                <PawPrint className="h-3.5 w-3.5" />
                {typeLabels[post.type] ?? 'Бусад'}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleFavorite(post.id);
                }}
                className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border-2 backdrop-blur-sm transition-all ${
                  isFavorite ? 'border-transparent bg-white/95 text-red-500 shadow-md' : 'border-white/80 bg-white/65 text-gray-700 hover:bg-white/90'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="line-clamp-1 text-lg font-black leading-tight text-[#2f241b]">{post.name || 'Нэр тодорхойгүй'}</h3>
                <span className="shrink-0 rounded-full border border-[#f2c9a4] bg-[#fff2e4] px-2 py-0.5 text-[10px] font-bold text-[#bc6e37]">#{post.id.slice(0, 6)}</span>
              </div>

              <p className="mb-3 min-h-[56px] line-clamp-3 text-sm leading-relaxed text-[#675449]">{post.description || 'Тайлбар оруулаагүй байна.'}</p>

              <div className="mb-4 grid grid-cols-2 gap-2 text-[11px]">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#fff0e3] px-2.5 py-1 font-semibold text-[#a25a2f] ring-1 ring-[#f4d2b6]">
                  <PawPrint className="h-3 w-3" />
                  {post.breed || 'Үүлдэргүй'}
                </span>
                <span className="inline-flex items-center justify-center rounded-full bg-[#f8f2eb] px-2.5 py-1 font-semibold text-[#7d634f] ring-1 ring-[#efe2d7]">Нас: {post.age || '—'}</span>
                <span className="col-span-2 inline-flex items-center gap-1 rounded-full bg-[#fff7ec] px-2.5 py-1 font-semibold text-[#8a5a36] ring-1 ring-[#f4dfcb]">
                  <MapPin className="h-3 w-3" />
                  <span className="line-clamp-1">{post.location || 'Байршилгүй'}</span>
                </span>
              </div>

              <div className="mt-auto">
                <span className="inline-block w-full rounded-2xl bg-[#ffbe98] px-5 py-2.5 text-center text-sm font-bold text-zinc-900 transition-all duration-300 group-hover:brightness-95">
                  Дэлгэрэнгүй харах
                </span>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="h-auto max-h-[92vh] w-[96vw] max-w-5xl overflow-y-auto p-2 md:p-4 border-0 outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
          <DialogHeader className="hidden">
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
          </DialogHeader>
          <RescuePetDetail post={post} />
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
          className="inline-flex items-center gap-2 rounded-full border-2 border-[#FFBE98] bg-white px-6 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-[#FFBE98]"
        >
          Бүгдийг харах ({postCount})
        </Link>
      )}
      <Link href="/dashboard/add-post" className="inline-flex items-center gap-2 rounded-full bg-[#FFBE98] px-6 py-2.5 text-sm font-medium text-zinc-900 shadow-sm transition-colors hover:brightness-95">
        <PlusCircle className="h-5 w-5" />
        Пост оруулах
      </Link>
    </div>
  );
}
