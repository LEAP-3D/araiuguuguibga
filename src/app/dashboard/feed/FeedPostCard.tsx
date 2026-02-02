"use client";

import {
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  PawPrint,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Post } from "@/lib/postsContext";

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
    image.startsWith("http") || image.startsWith("/") || image.startsWith("data:");
  if (isUrl) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element -- dynamic user content */
      <img src={image} alt="" className="h-full w-full object-cover" />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-100">
      <PawPrint className="h-20 w-20 text-gray-400" />
    </div>
  );
}

type FeedPostCardProps = {
  post: Post;
  displayName: string;
  userImageUrl?: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};

export function FeedPostCard({
  post,
  displayName,
  userImageUrl,
  isFavorite,
  onToggleFavorite,
}: FeedPostCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 p-4">
        <Avatar className="h-10 w-10 rounded-full border-2 border-gray-100">
          <AvatarImage src={userImageUrl} alt={displayName} />
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
      <div className="px-4 pb-3">
        {(post.name || post.description) && (
          <p className="mb-3 text-gray-700">
            {post.name && <span className="font-medium">{post.name}</span>}
            {post.name && post.description && " — "}
            {post.description || ""}
            {post.breed && <span className="text-gray-500"> · {post.breed}</span>}
            {post.age && <span className="text-gray-500"> · {post.age}</span>}
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
      <div className="border-t border-gray-100">
        <div className="flex">
          <button
            type="button"
            onClick={() => onToggleFavorite(post.id)}
            className={`flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
              isFavorite ? "text-[#4f9669]" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            {isFavorite ? "Таалагдлаа" : "Таалагдах"}
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
  );
}
