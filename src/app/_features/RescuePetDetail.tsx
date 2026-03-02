'use client';

import { useState } from 'react';
import { PetImage } from '@/app/_components/PetImage';
import dynamic from 'next/dynamic';
import { BadgeInfo, CheckCircle2, Clock3, MapPin, PawPrint, Phone, RotateCcw, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePosts } from '@/lib/postsContext';
import { toast } from 'sonner';

const PostMap = dynamic(() => import('./PostMap'), {
  ssr: false, // IMPORTANT for Next.js
});

const typeLabels: Record<string, string> = {
  dog: 'Нохой',
  cat: 'Муур',
  other: 'Бусад',
};
type Post = {
  id: string;
  status?: 'lost' | 'found' | 'rescued';
  isOwner?: boolean;
  name: string;
  breed: string;
  age: string;
  type: string;
  description: string;
  location: string | null;
  image: string;
  contactName?: string | null;
  contactPhone?: string | null;
  contactNotes?: string | null;
};

type RescuePetDetailProps = {
  post: Post;
  onClose?: () => void;
};

export default function RescuePetDetail({ post, onClose }: RescuePetDetailProps) {
  const [mapExpanded, setMapExpanded] = useState(false);
  const [updating, setUpdating] = useState(false);
  const { updatePostStatus } = usePosts();
  // parse coords once and validate
  let coords: { lat: number; lng: number } | null = null;
  if (post.location) {
    const parts = post.location.split(',').map((p) => p.trim());
    const lat = Number(parts[0]);
    const lng = Number(parts[1]);
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      coords = { lat, lng };
    }
  }

  const contactName = post.contactName ?? '';
  const contactPhone = post.contactPhone ?? '';
  const contactNotes = post.contactNotes ?? '';

  return (
    <div style={{ fontFamily: 'ui-rounded, system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }} className="overflow-hidden rounded-3xl bg-white">
      <div className="relative h-72 w-full overflow-hidden">
        <PetImage image={post.image} />
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black leading-tight text-white">{post.name || 'Нэр тодорхойгүй'}</h3>
            <p className="mt-1 text-sm text-white/90">{post.description || 'Тайлбар оруулаагүй байна.'}</p>
          </div>
          <span className="shrink-0 rounded-full border border-white/40 bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">{typeLabels[post.type] ?? 'Бусад'}</span>
        </div>
      </div>

      <div className="grid gap-5 p-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-amber-900">Үндсэн мэдээлэл</p>
            <div className="grid gap-2 text-sm text-zinc-800">
              <span className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2">
                <PawPrint className="h-4 w-4 text-amber-600" />
                Үүлдэр: {post.breed || 'Үүлдэргүй'}
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2">
                <Clock3 className="h-4 w-4 text-amber-600" />
                Нас: {post.age || '—'}
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2">
                <MapPin className="h-4 w-4 text-amber-600" />
                Байршил: {post.location || 'Байршилгүй'}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-700">Холбоо барих</p>
            <div className="space-y-2 text-sm text-zinc-800">
              <p className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2">
                <User className="h-4 w-4 text-zinc-600" />
                {contactName || 'Нэр оруулаагүй'}
              </p>
              {contactPhone ? (
                <a href={`tel:${contactPhone}`} className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 font-medium text-emerald-700 transition-colors hover:bg-emerald-100">
                  <Phone className="h-4 w-4" />
                  {contactPhone}
                </a>
              ) : (
                <p className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 text-zinc-500">
                  <Phone className="h-4 w-4" />—
                </p>
              )}
              <p className="rounded-xl bg-zinc-50 px-3 py-2 text-zinc-700">
                <span className="mb-1 inline-flex items-center gap-2 font-medium">
                  <BadgeInfo className="h-4 w-4 text-zinc-600" />
                  Тэмдэглэл
                </span>
                <br />
                {contactNotes || 'Нэмэлт тэмдэглэл оруулаагүй.'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <button
            type="button"
            onClick={() => coords && setMapExpanded(true)}
            className={`w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 transition-all ${coords ? 'cursor-pointer hover:border-amber-300 hover:ring-2 hover:ring-amber-200/50' : 'cursor-default'}`}
          >
            {coords ? (
              <span className="block aspect-[16/9] w-full">
                <PostMap lat={coords.lat} lng={coords.lng} />
              </span>
            ) : (
              <div className="flex aspect-[16/9] w-full items-center justify-center p-6 text-center text-sm text-zinc-500">Байршлын координат бүртгэгдээгүй байна.</div>
            )}
          </button>

          {post.isOwner && (
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={updating}
                onClick={async () => {
                  setUpdating(true);
                  const ok = await updatePostStatus(post.id, 'found');
                  setUpdating(false);
                  if (ok) {
                    toast.success('Олдсон болгон тэмдэглэлээ.');
                    onClose?.();
                  } else toast.error('Өөрчлөлт хадгалахад алдаа гарлаа.');
                }}
                className={`flex flex-1 min-w-[100px] items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                  post.status === 'found' ? 'border-emerald-300 bg-emerald-100 text-emerald-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                <CheckCircle2 className="h-5 w-5" />
                Олдсон
              </button>
              <button
                type="button"
                disabled={updating}
                onClick={async () => {
                  setUpdating(true);
                  const ok = await updatePostStatus(post.id, 'rescued');
                  setUpdating(false);
                  if (ok) {
                    toast.success('Аварсан болгон тэмдэглэлээ.');
                    onClose?.();
                  } else toast.error('Өөрчлөлт хадгалахад алдаа гарлаа.');
                }}
                className={`flex flex-1 min-w-[100px] items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                  post.status === 'rescued' ? 'border-sky-300 bg-sky-100 text-sky-800' : 'border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-100'
                }`}
              >
                <PawPrint className="h-5 w-5" />
                Аварсан
              </button>
              {(post.status === 'found' || post.status === 'rescued') && (
                <button
                  type="button"
                  disabled={updating}
                  onClick={async () => {
                    setUpdating(true);
                    const ok = await updatePostStatus(post.id, 'lost');
                    setUpdating(false);
                    if (ok) {
                      toast.success('Алдсан болгон буцаалаа.');
                      onClose?.();
                    } else toast.error('Өөрчлөлт хадгалахад алдаа гарлаа.');
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-100 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <RotateCcw className="h-5 w-5" />
                  Буцаах
                </button>
              )}
            </div>
          )}

          <Dialog open={mapExpanded} onOpenChange={setMapExpanded}>
            <DialogContent className="w-[96vw] max-w-6xl overflow-hidden border-0 p-0 focus:ring-0 focus-visible:ring-0">
              <DialogHeader className="sr-only">
                <DialogTitle>{post.name} газрын зураг</DialogTitle>
              </DialogHeader>
              <div className="aspect-[16/9] w-full overflow-hidden">{coords && <PostMap lat={coords.lat} lng={coords.lng} />}</div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
