"use client";

import { useState } from "react";
import { Heart, Info } from "lucide-react";
import type { FilterCategory } from "../_components/types";
import { mockPets } from "../_components/mockPets";

const categories: FilterCategory[] = [
  { id: "all", label: "All", value: "all", icon: "🐾" },
  { id: "dogs", label: "Dogs", value: "dog", icon: "🐕" },
  { id: "cats", label: "Cats", value: "cat", icon: "🐱" },
  { id: "others", label: "Others", value: "other", icon: "🦜" },
];

export function RescuePetsSection() {
  const [activeCategory, setActiveCategory] =
    useState<FilterCategory["value"]>("all");

  const filteredPets =
    activeCategory === "all"
      ? mockPets
      : mockPets.filter((pet) => pet.type === activeCategory);

  return (
    <section id="adopt" className="flex justify-center px-6 py-16">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Эзэн хайж байгаа{" "}
            <span className="text-orange-300">Олдсон амьтад</span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Гаднаас олдсон эзэнгүй амьтдын тухай оруулсан зарууд
          </p>
        </div>
        <div className="mb-8 flex justify-center">
          <div className="inline-flex gap-2  rounded-full bg-white p-1 shadow-sm">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.value)}
                className={`flex items-center gap-2 cursor-pointer rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                  activeCategory === category.value
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-30"
                }`}
              >
                <span className="text-base">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2  lg:grid-cols-4">
          {filteredPets.map((pet) => (
            <div
              key={pet.id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden  from-orange-50 to-pink-50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl transition-transform duration-300 group-hover:scale-110">
                    {pet.image}
                  </span>
                </div>

                {pet.featured && (
                  <div className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-3 p-5">
                {/* Name & Breed */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 cursor-pointer transition-colors group-hover:text-orange-500">
                    {pet.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-600">
                    {pet.breed} · {pet.age}
                  </p>
                </div>

                {/* Description */}
                <p className="line-clamp-2 text-sm text-gray-600">
                  {pet.description}
                </p>

                {/* Location */}
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {pet.location}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 rounded-lg cursor-pointer bg-orange-500 px-4 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-orange-600">
                    <Heart className="mx-auto h-5 w-5" />
                  </button>
                  <button className="rounded-lg cursor-pointer border border-gray-200 px-4 py-2.5 transition-colors hover:bg-gray-50">
                    <Info className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 cursor-pointer rounded-lg border-2 border-orange-500 bg-white px-8 py-3 font-medium text-orange-500 shadow-sm transition-all hover:bg-orange-500 hover:text-white">
            View All Pets
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
