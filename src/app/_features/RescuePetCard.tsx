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
};

export function RescuePetCard({ post, isFavorite, onToggleFavorite }: RescuePetCardProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div
            className="group flex h-[430px] cursor-pointer flex-col overflow-hidden rounded-3xl border border-amber-200/70 bg-white shadow-[0_10px_30px_rgba(120,80,20,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(120,80,20,0.16)]"
            style={{ fontFamily: 'ui-rounded, system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <div className="relative h-52 w-full overflow-hidden">
              <PetImage image={post.image} />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-amber-900 shadow-sm">
                <PawPrint className="h-3.5 w-3.5" />
                {typeLabels[post.type] ?? 'Бусад'}
              </span>

              <button
                type="button"
                onClick={() => onToggleFavorite(post.id)}
                className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border-2 backdrop-blur-sm transition-all ${
                  isFavorite ? 'border-transparent bg-white/95 text-red-500 shadow-md' : 'border-white/80 bg-white/65 text-gray-700 hover:bg-white/90'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
              <div className="mb-3 flex items-start justify-between gap-2">
                <h3 className="text-xl font-extrabold leading-tight text-black">{post.name || 'Нэр тодорхойгүй'}</h3>
                <span className="shrink-0 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800">#{post.id.slice(0, 6)}</span>
              </div>

              <p className="mb-4 min-h-[62px] line-clamp-3 text-sm leading-relaxed text-zinc-700">{post.description || 'Тайлбар оруулаагүй байна.'}</p>

              <div className="mb-5 grid grid-cols-2 gap-2 text-xs">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 font-medium text-amber-900">
                  <PawPrint className="h-3.5 w-3.5" />
                  {post.breed || 'Үүлдэргүй'}
                </span>
                <span className="inline-flex items-center justify-center rounded-full bg-zinc-100 px-3 py-1.5 font-medium text-zinc-700">Нас: {post.age || '—'}</span>
                <span className="col-span-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 font-medium text-emerald-800">
                  <MapPin className="h-3.5 w-3.5" />
                  {post.location || 'Байршилгүй'}
                </span>
              </div>

              <div className="mt-auto rounded-xl bg-[#FFBE98] px-4 py-2.5 text-center text-sm font-bold text-zinc-900 transition-opacity group-hover:opacity-95">
                Дэлгэрэнгүй харах
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="h-auto max-h-[92vh] w-[96vw] max-w-5xl overflow-y-auto p-2 md:p-4">
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
