"use client";

import { useState } from "react";
import { Heart, Info } from "lucide-react";
import type { Pet, FilterCategory } from "./types";

const categories: FilterCategory[] = [
  { id: "all", label: "All", value: "all", icon: "🐾" },
  { id: "dogs", label: "Dogs", value: "dog", icon: "🐕" },
  { id: "cats", label: "Cats", value: "cat", icon: "🐱" },
  { id: "others", label: "Others", value: "other", icon: "🦜" },
];

const mockPets: Pet[] = [
  {
    id: "1",
    name: "Buddy",
    breed: "Golden Retriever",
    age: "2 years",
    type: "dog",
    description:
      "A gentle and loving companion who enjoys long walks and cuddles.",
    location: "San Francisco, CA",
    image: "🐕",
    featured: true,
    distance: "2 years",
  },
  {
    id: "2",
    name: "Luna",
    breed: "Siamese",
    age: "1 year",
    type: "cat",
    description:
      "A calm and elegant lady who loves to play with feathers and pompoms.",
    location: "Oakland, CA",
    image: "🐱",
    distance: "1 year",
  },
  {
    id: "3",
    name: "Max",
    breed: "German Shepherd",
    age: "3 years",
    type: "dog",
    description: "Intelligent and loyal, great with families and children.",
    location: "San Jose, CA",
    image: "🦮",
    distance: "3 years",
  },
  {
    id: "4",
    name: "Charlie",
    breed: "Beagle",
    age: "4 years",
    type: "dog",
    description: "Curious and playful, loves to explore and sniff around.",
    location: "Palo Alto, CA",
    image: "🐶",
    distance: "4 years",
  },
  {
    id: "5",
    name: "Mochi",
    breed: "Scottish Fold",
    age: "8 months",
    type: "cat",
    description: "Sweet and affectionate, enjoys napping in sunny spots.",
    location: "Berkeley, CA",
    image: "🐱",
    distance: "8 months",
  },
  {
    id: "6",
    name: "Rocky",
    breed: "Husky",
    age: "2 years",
    type: "dog",
    description: "Gentle giant with a heart of gold, loves belly rubs.",
    location: "Fremont, CA",
    image: "🐺",
    distance: "2 years",
  },
  {
    id: "7",
    name: "Bella",
    breed: "Maine Coon",
    age: "1 year",
    type: "cat",
    description: "Majestic and friendly, gets along with other pets.",
    location: "Sunnyvale, CA",
    image: "🐈",
    distance: "1 year",
  },
  {
    id: "8",
    name: "Coco",
    breed: "Rescue Cat",
    age: "6 months",
    type: "cat",
    description: "Playful kitten looking for a loving home.",
    location: "San Mateo, CA",
    image: "🐈",
    distance: "6 months",
  },
];

export function RescuePetsSection() {
  const [activeCategory, setActiveCategory] =
    useState<FilterCategory["value"]>("all");

  const filteredPets =
    activeCategory === "all"
      ? mockPets
      : mockPets.filter((pet) => pet.type === activeCategory);

  return (
    <section
      id="adopt"
      className="bg-gradient-to-b from-white to-gray-50 px-6 py-16"
    >
      <div className="container">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-600">
            <Heart className="h-4 w-4" />
            Find Your Perfect Match
          </div>
          <h2 className="mb-4 text-4xl font-bold">
            Rescue Pets <span className="text-orange-500">Waiting for You</span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Each of these adorable animals is looking for their forever home.
            Could you be the one to give them a second chance?
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex gap-2 rounded-full bg-white p-1 shadow-sm">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.value)}
                className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                  activeCategory === category.value
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-base">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pet Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPets.map((pet) => (
            <div
              key={pet.id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-orange-50 to-pink-50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl transition-transform duration-300 group-hover:scale-110">
                    {pet.image}
                  </span>
                </div>

                {/* Featured Badge */}
                {pet.featured && (
                  <div className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                    Featured
                  </div>
                )}

                {/* Like Button */}
                <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-colors hover:bg-white">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>

                {/* Verified Badge */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
                  <svg
                    className="h-4 w-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs font-medium text-gray-700">
                    192+ Vets
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3 p-5">
                {/* Name & Breed */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-orange-500">
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
                  <button className="flex-1 rounded-lg bg-orange-500 px-4 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-orange-600">
                    <Heart className="mx-auto h-5 w-5" />
                  </button>
                  <button className="rounded-lg border border-gray-200 px-4 py-2.5 transition-colors hover:bg-gray-50">
                    <Info className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 rounded-lg border-2 border-orange-500 bg-white px-8 py-3 font-medium text-orange-500 shadow-sm transition-all hover:bg-orange-500 hover:text-white">
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
