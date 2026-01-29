"use client";

import React from "react";
import type { PetProfile } from "../_components/mockPets";

const pets: PetProfile[] = [
  {
    id: "1",
    name: "Buddy",
    breed: "Golden Retriever",
    emoji: "🐕",
    vetsNearby: 150,
    gradient: "from-orange-100 to-pink-100",
  },
  {
    id: "2",
    name: "Luna",
    breed: "Persian Cat",
    emoji: "🐱",
    vetsNearby: 192,
    gradient: "from-pink-100 to-purple-100",
  },
  {
    id: "3",
    name: "Coco",
    breed: "Holland Lop",
    emoji: "🐰",
    vetsNearby: 128,
    gradient: "from-blue-100 to-cyan-100",
  },
];

export function HeroPetProfile() {
  const [selectedPet, setSelectedPet] = React.useState<PetProfile>(pets[0]);
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <div className="relative flex items-center  justify-center">
      <div
        className="relative h-137 w-full max-w-sm"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {[...pets].reverse().map((pet, reverseIndex) => {
          const actualIndex = pets.length - 1 - reverseIndex;
          const isSelected = pet.id === selectedPet.id;

          const zIndex = isSelected ? 50 : 40 - actualIndex * 10;
          const stackOffset = actualIndex * 12;

          const centerIndex = Math.floor((pets.length - 1) / 2);
          const sideIndex = actualIndex - centerIndex;

          const baseOffsetX = -40; // ← зүүн талаас зай
          const hoverX = isHovering ? sideIndex * 140 : 0;

          return (
            <div
              key={pet.id}
              onClick={() => setSelectedPet(pet)}
              className="absolute left-1/2 top-1/2 w-full cursor-pointer transition-all duration-500"
              style={{
                zIndex,
                transform: `
                  translate(
                    calc(-50% + ${baseOffsetX}px + ${hoverX}px),
                    calc(-50% - ${stackOffset}px)
                  )
                  scale(${isSelected ? 1 : 0.95 - Math.abs(sideIndex) * 0.05})
                `,
                opacity: isSelected
                  ? 1
                  : isHovering
                    ? 0.9 - actualIndex * 0.1
                    : 0.7 - actualIndex * 0.15,
              }}
            >
              <div className="overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-100">
                <div
                  className={`relative aspect-square bg-linear-to-br ${pet.gradient} ${
                    isSelected ? "p-12" : "p-8"
                  }`}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/30 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/30 blur-3xl" />
                  </div>

                  <div className="relative flex h-full items-center justify-center">
                    <div
                      className={`leading-none transition-all ${
                        isSelected ? "text-[160px]" : "text-[120px]"
                      }`}
                    >
                      {pet.emoji}
                    </div>
                  </div>
                </div>

                <div className={isSelected ? "p-6" : "p-4"}>
                  <h3
                    className={`mb-1 font-bold text-gray-900 ${
                      isSelected ? "text-2xl" : "text-lg"
                    }`}
                  >
                    {pet.name}
                  </h3>
                  <p
                    className={`text-gray-600 ${
                      isSelected ? "text-base" : "text-sm"
                    }`}
                  >
                    {pet.breed}
                  </p>

                  {isSelected && (
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
                      <span className="text-sm font-medium text-orange-600">
                        Вакцин хийлгэсэн
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {!isHovering && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center">
            <p className="max-w-xs whitespace-nowrap text-xs text-gray-400">
              Таны оруулсан тэжээвэр амьтдын profile ингэж харагдана
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
