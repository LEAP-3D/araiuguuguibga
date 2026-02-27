import type { usePosts } from '@/lib/postsContext';
import { MapPin, PawPrint, Phone } from 'lucide-react';

type Post = ReturnType<typeof usePosts>['posts'][number];

type Props = {
  post: Post;
  onClick?: () => void;
  selected?: boolean;
};

function formatRelativeTime(ms: number) {
  const diff = Date.now() - ms;
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (m < 1) return 'Саяхан';
  if (m < 60) return `${m} мин`;
  if (h < 24) return `${h} цаг`;
  if (d < 7) return `${d} өдөр`;
  return new Date(ms).toLocaleDateString('mn-MN');
}

const typeLabels: Record<string, string> = {
  dog: 'Нохой',
  cat: 'Муур',
  other: 'Амьтан',
};

export default function PostCard({ post, onClick, selected = false }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-65 overflow-hidden rounded-2xl border text-left shadow-sm transition ${
        selected ? 'border-[#f28a50] bg-[#fff3eb] ring-2 ring-[#ffd2b8]' : 'border-[#f2e2d5] bg-white hover:border-[#f2b286] hover:bg-[#fff8f3]'
      }`}
    >
      <div className="flex gap-3 p-3">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f6efe8]">
          {post.image ? (
            // eslint-disable-next-line @next/next/no-img-element -- dynamic user content
            <img src={post.image} alt={post.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <PawPrint className="h-6 w-6 text-[#d2b39a]" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 text-sm font-bold text-[#3b2b1f]">{post.name || 'Нэргүй пост'}</h3>
            <span className="shrink-0 rounded-full bg-[#ffe7d4] px-2 py-0.5 text-[10px] font-semibold text-[#a5562b]">{typeLabels[post.type] ?? 'Амьтан'}</span>
          </div>

          <p className="line-clamp-2 text-xs leading-relaxed text-[#6e5747]">{post.description || 'Тайлбар оруулаагүй байна.'}</p>

          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#fff5ec] px-2 py-0.5 text-[#8a5a36]">
              <Phone className="h-3 w-3" />
              {post.contactPhone || 'Утасгүй'}
            </span>

            <span className="text-[#a48672]">{formatRelativeTime(post.createdAt)}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
