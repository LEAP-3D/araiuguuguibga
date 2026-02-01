"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  Share2,
  PlusCircle,
  PawPrint,
  MapPin,
  User,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { usePosts } from "@/lib/postsContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const typeLabels: Record<string, string> = {
  dog: "Нохой",
  cat: "Муур",
  other: "Бусад",
};

function formatRelativeTime(ms: number) {
  const diff = Date.now() - ms;
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (m < 1) return "Саяхан";
  if (m < 60) return `${m} мин`;
  if (h < 24) return `${h} цаг`;
  if (d < 7) return `${d} өдөр`;
  return new Date(ms).toLocaleDateString("mn-MN");
}

function PetImage({ image }: { image: string }) {
  const isUrl =
    image.startsWith("http") ||
    image.startsWith("/") ||
    image.startsWith("data:");
  if (isUrl) {
    return (
      <img
        src={image}
        alt=""
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-100">
      <PawPrint className="h-20 w-20 text-gray-400" />
    </div>
  );
}

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
        <p className="text-gray-600">
          Хэрэглэгчийн оруулсан олдсон амьтдын зарууд
        </p>
      </div>

      {/* Create post box - Facebook style */}
      <Link
        href="/dashboard/add-post"
        className="mb-6 flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:bg-gray-50"
      >
        <Avatar className="h-10 w-10 rounded-full border-2 border-gray-100">
          <AvatarImage src={user?.imageUrl} alt={displayName as string} />
          <AvatarFallback className="bg-[#4f9669] text-white">
            {userInitial}
          </AvatarFallback>
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
            <article
              key={post.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              {/* Post header - Avatar + Name + Time */}
              <div className="flex items-center gap-3 p-4">
                <Avatar className="h-10 w-10 rounded-full border-2 border-gray-100">
                  <AvatarImage src={user?.imageUrl} alt={displayName as string} />
                  <AvatarFallback className="bg-[#4f9669]/20 text-[#4f9669]">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900">{displayName}</p>
                  <p className="text-xs text-gray-500">
                    {formatRelativeTime(post.createdAt)}
                    {post.location && ` · ${post.location}`}
                  </p>
                </div>
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  {typeLabels[post.type] ?? "Бусад"}
                </span>
              </div>

              {/* Post body - Caption + Image */}
              <div className="px-4 pb-3">
                {(post.name || post.description) && (
                  <p className="mb-3 text-gray-700">
                    {post.name && (
                      <span className="font-medium">{post.name}</span>
                    )}
                    {post.name && post.description && " — "}
                    {post.description || ""}
                    {post.breed && (
                      <span className="text-gray-500"> · {post.breed}</span>
                    )}
                    {post.age && (
                      <span className="text-gray-500"> · {post.age}</span>
                    )}
                  </p>
                )}
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                  <PetImage image={post.image} />
                </div>
                {post.location && (
                  <p className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    {post.location}
                  </p>
                )}
              </div>

              {/* Actions bar - Like, Comment, Share */}
              <div className="border-t border-gray-100">
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(post.id)}
                    className={`flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                      favorites.has(post.id)
                        ? "text-[#4f9669]"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.has(post.id) ? "fill-current" : ""
                      }`}
                    />
                    {favorites.has(post.id)
                      ? "Таалагдлаа"
                      : "Таалагдах"}
                  </button>
                  <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Сэтгэгдэл
                  </button>
                  <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    <Share2 className="h-5 w-5" />
                    Хуваалцах
                  </button>
                </div>
              </div>
            </article>
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
