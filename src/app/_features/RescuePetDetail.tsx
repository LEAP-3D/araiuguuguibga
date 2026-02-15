import { PetImage } from '@/app/_components/PetImage';
import dynamic from 'next/dynamic';
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
  name: string;
  breed: string;
  age: string;
  type: string;
  description: string;
  location: string | null; // Change this to string
  image: string;
  contactName?: string | null;
  contactPhone?: string | null;
  contactNotes?: string | null;
};

type RescuePetCardProps = {
  post: Post;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};

export default function RescuePetDetail({ post }: RescuePetCardProps) {
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
    <div style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }} className="bg-white rounded-2xl">
      <div className="relative w-full h-68 overflow-hidden rounded-t-2xl group">
        <PetImage image={post.image} />
      </div>
      <div className="p-6 mt-2 flex flex-col gap-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-lg font-extrabold text-black">{post.name || 'Нэр тодорхойгүй'}</h3>
          <span className="shrink-0 rounded-full border-2 border-[#efac48] px-3 py-1 text-xs font-extrabold text-black">{typeLabels[post.type] ?? 'Бусад'}</span>
        </div>

        <p className="text-sm">{post.description || '—'}</p>
        <span className="flex items-center gap-1.5">
          <p>nas:</p>
          {post.age || '—'}
        </span>
        <p className="text-sm">{post.breed || '—'}</p>

        <div className="flex flex-col gap-2">{coords && <PostMap lat={coords.lat} lng={coords.lng} />}</div>

        <p className="text-sm">👤 {contactName || '—'}</p>

        {contactPhone ? (
          <a href={`tel:${contactPhone}`} className="text-sm text-blue-500 underline">
            📞 {contactPhone}
          </a>
        ) : (
          <p className="text-sm text-gray-600">📞 —</p>
        )}

        {contactNotes && <p className="text-sm text-muted-foreground">📝 {contactNotes}</p>}
      </div>
    </div>
  );
}
