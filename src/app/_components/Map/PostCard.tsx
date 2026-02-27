import type { usePosts } from '@/lib/postsContext';

type Post = ReturnType<typeof usePosts>['posts'][number];

type Props = {
  post: Post;
  onClick?: () => void;
  selected?: boolean;
};

export default function PostCard({ post, onClick, selected = false }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-65 rounded-xl border p-3 text-left shadow-sm transition ${
        selected ? 'border-orange-400 bg-orange-50 ring-1 ring-orange-300' : 'bg-white hover:border-orange-200 hover:bg-orange-50/40'
      }`}
    >
      <h2 className="font-semibold">{post.name}</h2>
      <p className="text-sm">{post.description}</p>
      <p>📞 {post.contactPhone}</p>
    </button>
  );
}
