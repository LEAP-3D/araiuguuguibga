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
};

export default function SidebarList({ selectedType, filteredVets, filteredPosts }: Props) {
  const showVets = selectedType === 'all' || selectedType === 'vets';
  const showPosts = selectedType === 'all' || selectedType === 'lost';
  const isEmpty = filteredVets.length === 0 && filteredPosts.length === 0;

  return (
    <div className="h-full flex flex-col border rounded-xl py-3 px-0.5 bg-[#f9cd98]">
      <div className="min-h-0 flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">{showVets && filteredVets.map((vet) => <VetCard key={vet.id} vet={vet} />)}</div>
          <div className="space-y-4">{showPosts && filteredPosts.map((post) => <PostCard key={post.id} post={post} />)}</div>
        </div>
        {isEmpty && <div className="text-center py-10 text-gray-400">No results in this area</div>}
      </div>
      <div className="border-t px-4 py-3 bg-orange-100 text-center text-xs text-gray-700">Нийт {filteredVets.length + filteredPosts.length} байршил олдлоо</div>
    </div>
  );
}
