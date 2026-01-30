"use client";

import React from "react";

type Pet = {
  id: string;
  name: string;
  breed: string;
  emoji: string;
  Age: number;
  gradient: string;
};

const pets: Pet[] = [
  {
    id: "1",
    name: "Buddy",
    breed: "Golden Retriever",
    emoji: "🐕",
    Age: 1,
    gradient: "from-orange-100 to-pink-100",
  },
  {
    id: "2",
    name: "Luna",
    breed: "Persian Cat",
    emoji: "🐱",
    Age: 1,
    gradient: "from-pink-100 to-purple-100",
  },
  {
    id: "3",
    name: "Coco",
    breed: "Holland Lop",
    emoji: "🐰",
    Age: 2,
    gradient: "from-blue-100 to-cyan-100",
  },
];

const SLOTS = {
  center: { x: 0, rotate: 0, scale: 1.05, z: 30 },
  backLeft: { x: -120, rotate: -8, scale: 1, z: 20 },
  backRight: { x: 120, rotate: 8, scale: 1, z: 10 },
};

export function HeroPetProfile() {
  const [activeId, setActiveId] = React.useState("2");
  const [hoveredPet, setHoveredPet] = React.useState<Pet | null>(null);

  const getSlot = (petId: string) => {
    if (petId === activeId) return SLOTS.center;

    const others = pets.filter((p) => p.id !== activeId);
    return petId === others[0].id ? SLOTS.backLeft : SLOTS.backRight;
  };

  return (
    <div className="relative flex  justify-center py-8 ">
      <div className="relative h-280 w-full max-w-md">
        {pets.map((pet) => {
          const slot = getSlot(pet.id);

          return (
            <div
              key={pet.id}
              onMouseEnter={() => setActiveId(pet.id)}
              className="absolute left-1/2 top-1/2 w-full cursor-pointer transition-all duration-500 ease-out"
              style={{
                zIndex: slot.z,
                transform: `
                  translate(-50%, -50%)
                  translateX(${slot.x}px)
                  rotate(${slot.rotate}deg)
                  scale(${slot.scale})
                `,
              }}
            >
              {/* CARD */}
              <div className="overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-100">
                {/* TOP */}
                <div className="flex justify-center pt-10 pb-6">
                  <div
                    className={`h-60 w-60 rounded-full bg-linear-to-br ${pet.gradient} flex items-center justify-center`}
                  >
                    <span className="text-8xl">{pet.emoji}</span>
                  </div>
                </div>

                {/* BOTTOM */}
                <div className="pb-6 text-center">
                  <h3 className="text-2xl font-bold">{pet.name}</h3>
                  <p className="text-sm text-gray-600">
                    {pet.breed} * {pet.Age} years old
                  </p>
                  {pet.id === activeId && (
                    <div className="mt-4 text-sm font-medium text-orange-600">
                      ● Вакцин хийлгэсэн
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
