import { PetImage } from '@/app/_components/PetImage';
import { MapPin, Calendar } from 'lucide-react';

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

export default function RescuePetDetail({ post }: RescuePetCardProps) {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div className="relative w-full h-68 overflow-hidden rounded-t-xl group">
        <PetImage image={post.image} />
      </div>
      <div className="p-6 mt-2 flex flex-col gap-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-lg font-extrabold text-black">{post.name || 'Нэр тодорхойгүй'}</h3>
          <span className="shrink-0 rounded-full border-2 border-[#efac48] px-3 py-1 text-xs font-extrabold text-black">{typeLabels[post.type] ?? 'Бусад'}</span>
        </div>

        <div className="flex gap-1 items-center">
          <p className="text-gray-700">Temdeglel:</p>
          <p className="text-sm">{post.description || '—'}</p>
        </div>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-amber-600" />
          {post.location}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-amber-600" />
          {post.age || '—'}
        </span>
      </div>
    </div>
  );
}
