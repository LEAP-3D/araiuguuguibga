"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { usePosts } from "@/lib/postsContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FeedPostCard } from "./FeedPostCard";

export default function DashboardFeedPage() {
  const { user } = useUser();
  const { posts } = usePosts();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const displayName =
    user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "Хэрэглэгч";
  const userInitial = (displayName as string).charAt(0).toUpperCase();

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Feed</h1>
        <p className="text-gray-600">Хэрэглэгчийн оруулсан олдсон амьтдын зарууд</p>
      </div>
      <Link
        href="/dashboard/add-post"
        className="mb-6 flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:bg-gray-50"
      >
        <Avatar className="h-10 w-10 rounded-full border-2 border-gray-100">
          <AvatarImage src={user?.imageUrl} alt={displayName as string} />
          <AvatarFallback className="bg-[#4f9669] text-white">{userInitial}</AvatarFallback>
        </Avatar>
        <div className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-left text-gray-500 transition-colors hover:bg-gray-100">
          Юу бодож байна вэ? Олдсон амьтад оруулах...
        </div>
      </Link>
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white py-16 shadow-sm">
          <PlusCircle className="mb-4 h-16 w-16 text-gray-300" />
          <p className="mb-2 text-center text-gray-600">Одоогоор пост байхгүй</p>
          <p className="mb-6 text-center text-sm text-gray-500">
            Анхны пост оруулаад эхлээрэй
          </p>
          <Link
            href="/dashboard/add-post"
            className="inline-flex items-center gap-2 rounded-lg bg-[#4f9669] px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#458559]"
          >
            <PlusCircle className="h-5 w-5" />
            Пост оруулах
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <FeedPostCard
              key={post.id}
              post={post}
              displayName={displayName as string}
              userImageUrl={user?.imageUrl}
              isFavorite={favorites.has(post.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
          <Link
            href="/dashboard/add-post"
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-4 text-sm font-medium text-gray-600 transition-colors hover:border-[#4f9669]/50 hover:bg-[#4f9669]/5 hover:text-[#4f9669]"
          >
            <PlusCircle className="h-5 w-5" />
            Шинэ пост оруулах
          </Link>
        </div>
      )}
    </div>
  );
}
