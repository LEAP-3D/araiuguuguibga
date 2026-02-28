import type { mockVets } from '@/app/_components/HeroSection/mockVets';
import type { usePosts } from '@/lib/postsContext';
import VetCard from './VetCard';
import PostCard from './PostCard';

type Post = ReturnType<typeof usePosts>['posts'][number];
type Vet = (typeof mockVets)[number];

type Props = {
  selectedType: 'all' | 'lost' | 'vets';
  filteredVets: Vet[];
  filteredPosts: Post[];
  selectedVetId: string | null;
  selectedPostId: string | null;
  onSelectVet: (vet: Vet) => void;
  onSelectPost: (post: Post) => void;
};

export default function SidebarList({ selectedType, filteredVets, filteredPosts, selectedVetId, selectedPostId, onSelectVet, onSelectPost }: Props) {
  const showVets = selectedType === 'all' || selectedType === 'vets';
  const showPosts = selectedType === 'all' || selectedType === 'lost';
  const vetsToRender = showVets ? filteredVets : [];
  const postsToRender = showPosts ? filteredPosts : [];
  const isEmpty = vetsToRender.length === 0 && postsToRender.length === 0;

  return (
    <div className="h-full  flex flex-col border rounded-xl py-3 px-0.5 bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {isEmpty ? (
          <div className="py-10 text-center text-gray-400">No results in this area</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {showPosts && postsToRender.map((post) => <PostCard key={post.id} post={post} selected={selectedPostId === post.id} onClick={() => onSelectPost(post)} />)}
            {showVets && vetsToRender.map((vet) => <VetCard key={vet.id} vet={vet} selected={selectedVetId === vet.id} onClick={() => onSelectVet(vet)} />)}
          </div>
        )}
      </div>
      <div className="border-t bg-orange-100 px-4 py-3 text-center text-xs text-gray-700">Нийт {vetsToRender.length + postsToRender.length} байршил олдлоо</div>
    </div>
  );
}
