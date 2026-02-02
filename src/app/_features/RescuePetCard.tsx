"use client";

import Link from "next/link";
import { Heart, MapPin, Calendar, PlusCircle } from "lucide-react";
import { PetImage } from "@/app/_components/PetImage";

const typeLabels: Record<string, string> = {
  dog: "Нохой",
  cat: "Муур",
  other: "Бусад",
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

export function RescuePetCard({
  post,
  isFavorite,
  onToggleFavorite,
}: RescuePetCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-md transition-all hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
        <PetImage image={post.image} />
        <button
          type="button"
          onClick={() => onToggleFavorite(post.id)}
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
            isFavorite
              ? "border-transparent bg-white/90 text-red-500"
              : "border-white/80 bg-white/60 text-gray-600 hover:bg-white/80"
          }`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-amber-900">
            {post.name || "Нэр тодорхойгүй"}
          </h3>
          <span className="shrink-0 rounded-full bg-[#6b9b6e] px-3 py-1 text-xs font-medium text-white">
            {typeLabels[post.type] ?? "Бусад"}
          </span>
        </div>
        <p className="mb-2 text-sm text-amber-800/70">{post.breed || "—"}</p>
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">{post.description || "—"}</p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-amber-600" />
            {post.age || "—"}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-amber-600" />
            {post.location}
          </span>
        </div>
      </div>
    </div>
  );
}

export function RescueFooterActions({ postCount }: { postCount: number }) {
  const FEED_POST_LIMIT = 10;
  return (
    <div className="flex shrink-0 flex-wrap justify-center gap-4 py-2">
      {postCount > FEED_POST_LIMIT && (
        <Link
          href="/dashboard/feed"
          className="inline-flex items-center gap-2 rounded-full border-2 border-amber-300 bg-white px-6 py-2.5 text-sm font-medium text-amber-800 transition-colors hover:bg-amber-50"
        >
          Бүгдийг харах ({postCount})
        </Link>
      )}
      <Link
        href="/dashboard/add-post"
        className="inline-flex items-center gap-2 rounded-full bg-[#6b9b6e] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#5d8a60]"
      >
        <PlusCircle className="h-5 w-5" />
        Пост оруулах
      </Link>
    </div>
  );
}
