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
};

type RescuePetCardProps = {
  post: Post;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};

export default function RescuePetDetail({ post }: RescuePetCardProps) {
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

        <div className="flex gap-1 items-center">
          <p className="text-gray-700">Temdeglel:</p>
          <p className="text-sm">{post.description || '—'}</p>
        </div>
        <div className="flex flex-col gap-2">
          {post.location &&
            typeof post.location === 'string' &&
            (() => {
              const [lat, lng] = post.location.split(',').map(Number);
              return <PostMap lat={lat} lng={lng} />;
            })()}
        </div>

        <span className="flex items-center gap-1.5">
          <p>nas:</p>
          {post.age || '—'}
        </span>
      </div>
    </div>
  );
}
