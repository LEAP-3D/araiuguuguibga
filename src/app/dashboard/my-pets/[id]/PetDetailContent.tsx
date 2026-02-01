"use client";

import Link from "next/link";
import { ArrowLeft, PawPrint } from "lucide-react";
import type { MyPet } from "@/lib/postsContext";
import { VaccineSection } from "./VaccineSection";
import { HistorySection } from "./HistorySection";

export function PetDetailContent({ pet }: { pet: MyPet }) {
  const imageDisplay =
    pet.image.startsWith("http") ||
    pet.image.startsWith("/") ||
    pet.image.startsWith("data:") ? (
      /* eslint-disable-next-line @next/next/no-img-element -- dynamic user content */
      <img
        src={pet.image}
        alt={pet.name}
        className="h-48 w-48 rounded-2xl object-cover"
      />
    ) : (
      <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-gray-100">
        <PawPrint className="h-16 w-16 text-gray-400" />
      </div>
    );

  return (
    <div>
      <Link
        href="/dashboard/my-pets"
        className="mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Буцах
      </Link>
      <div className="mb-8 flex items-center gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-gray-50">
          {imageDisplay}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{pet.name}</h1>
          <p className="text-gray-600">{pet.breed}</p>
          {pet.age && <p className="text-sm text-gray-500">{pet.age}</p>}
        </div>
      </div>
      <div className="space-y-8">
        <VaccineSection pet={pet} />
        <HistorySection pet={pet} />
      </div>
    </div>
  );
}
