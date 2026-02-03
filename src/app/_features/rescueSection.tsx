"use client";

import { useState } from "react";
import { usePosts } from "@/lib/postsContext";
import { RescueEmptyState, RescueHeader } from "./RescueSectionParts";
import { RescuePetCard, RescueFooterActions } from "./RescuePetCard";

const FILTERS = [
  { id: "all", label: "Бүгд" },
  { id: "dog", label: "Нохой" },
  { id: "cat", label: "Муур" },
  { id: "bunny", label: "Туулай" },
  { id: "hamster", label: "Хавраа" },
] as const;

const SECTION_DISPLAY_LIMIT = 6;

export function RescuePetsSection() {
  const { posts } = usePosts();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "dog" && post.type === "dog") return true;
    if (activeFilter === "cat" && post.type === "cat") return true;
    if ((activeFilter === "bunny" || activeFilter === "hamster") && post.type === "other")
      return true;
    return false;
  });

  const displayPosts = filteredPosts.slice(0, SECTION_DISPLAY_LIMIT);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (posts.length === 0) return <RescueEmptyState />;

  return (
    <section id="adopt" className="min-h-[70vh] px-4 py-12">
      <RescueHeader />
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        <div className="flex shrink-0 flex-wrap justify-center gap-3">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFilter(f.id)}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
                activeFilter === f.id
                  ? "bg-[#6b9b6e] text-white shadow-sm"
                  : "border-2 border-[#6b9b6e] bg-white text-[#6b9b6e] hover:bg-[#6b9b6e]/5"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post) => (
            <RescuePetCard
              key={post.id}
              post={post}
              isFavorite={favorites.has(post.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
        <RescueFooterActions postCount={posts.length} limit={SECTION_DISPLAY_LIMIT} />
      </div>
    </section>
  );
}
