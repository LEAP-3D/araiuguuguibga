"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, MapPin, Calendar, PlusCircle, PawPrint } from "lucide-react";
import { usePosts } from "@/lib/postsContext";

const FILTERS = [
  { id: "all", label: "Бүгд" },
  { id: "dog", label: "Нохой" },
  { id: "cat", label: "Муур" },
  { id: "bunny", label: "Туулай" },
  { id: "hamster", label: "Хавраа" },
] as const;

const typeLabels: Record<string, string> = {
  dog: "Нохой",
  cat: "Муур",
  other: "Бусад",
};

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
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
      <PawPrint className="h-16 w-16 text-amber-400" />
    </div>
  );
}

const FEED_POST_LIMIT = 10;

export function RescuePetsSection() {
  const { posts } = usePosts();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "dog" && post.type === "dog") return true;
    if (activeFilter === "cat" && post.type === "cat") return true;
    if ((activeFilter === "bunny" || activeFilter === "hamster") && post.type === "other") return true;
    return false;
  });

  const displayPosts = filteredPosts.slice(0, FEED_POST_LIMIT);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (posts.length === 0) {
    return (
      <section id="adopt" className="min-h-[70vh] px-4 py-12">
        <div className="mb-8 text-center">
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-amber-800/60">
             
            </p>
            <h2 className="mb-2 text-3xl font-bold text-gray-800">
              Хайр хайж буй амьтад
            </h2>
            <p className="text-gray-800">
              Эдгээр эвлүүлэг амьтад мөнхийн гэрийг хүлээж байна.
            </p>
        </div>
        <div className="mx-auto flex h-[600px] max-w-7xl flex-col items-center justify-center rounded-2xl border-2 border-dashed border-amber-200 bg-white/50">
            <PlusCircle className="mb-4 h-12 w-12 text-amber-400" />
            <p className="mb-2 text-center text-gray-700">
              Одоогоор пост байхгүй байна
            </p>
            <p className="mb-6 text-center text-sm text-gray-500">
              Анхны пост оруулаад эхлээрэй
            </p>
            <Link
              href="/dashboard/add-post"
              className="inline-flex items-center gap-2 rounded-full bg-[#6b9b6e] px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#5d8a60]"
            >
              <PlusCircle className="h-5 w-5" />
              Пост оруулах
            </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="adopt" className="min-h-[70vh] px-4 py-12">
      <div className="mb-8 text-center">
          <p className="mb-1 text-xs font-medium uppercase tracking-widest text-amber-800/60">
           
          </p>
          <h2 className="mb-2 text-3xl font-bold text-gray-800 md:text-4xl">
            Хайр хайж буй амьтад
          </h2>
          <p className="mx-auto max-w-2xl text-gray-800">
            Эдгээр эвлүүлэг амьтад мөнхийн гэрийг хүлээж байна. Та тэдний хувьд байж болох уу?
          </p>
      </div>

      <div className="mx-auto flex h-[600px] max-w-7xl flex-col gap-4">
        {/* Filter bar */}
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

        {/* Pet cards grid */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post) => (
            <div
              key={post.id}
              className="group overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-md transition-all hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                <PetImage image={post.image} />
                <button
                  type="button"
                  onClick={() => toggleFavorite(post.id)}
                  className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                    favorites.has(post.id)
                      ? "border-transparent bg-white/90 text-red-500"
                      : "border-white/80 bg-white/60 text-gray-600 hover:bg-white/80"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${favorites.has(post.id) ? "fill-current" : ""}`}
                  />
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
                <p className="mb-2 text-sm text-amber-800/70">
                  {post.breed || "—"}
                </p>
                <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                  {post.description || "—"}
                </p>
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
          ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex shrink-0 flex-wrap justify-center gap-4 py-2">
          {posts.length > FEED_POST_LIMIT && (
            <Link
              href="/dashboard/feed"
              className="inline-flex items-center gap-2 rounded-full border-2 border-amber-300 bg-white px-6 py-2.5 text-sm font-medium text-amber-800 transition-colors hover:bg-amber-50"
            >
              Бүгдийг харах ({posts.length})
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
      </div>
    </section>
  );
}
