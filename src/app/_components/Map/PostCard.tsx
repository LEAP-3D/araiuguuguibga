import type { usePosts } from '@/lib/postsContext';

type Post = ReturnType<typeof usePosts>['posts'][number];

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="p-3 border rounded-xl shadow-sm w-65 bg-white">
      <h2 className="font-semibold">{post.name}</h2>
      <p className="text-sm">{post.description}</p>
      <p>📞 {post.contactPhone}</p>
    </div>
  );
}
