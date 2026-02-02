"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { usePosts } from "@/lib/postsContext";
import { PetDetailContent } from "./PetDetailContent";

export default function PetDetailPage() {
  const params = useParams();
  const { myPets } = usePosts();
  const pet = myPets.find((p) => p.id === params.id);

  if (!pet) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="mb-4 text-gray-600">Амьтан олдсонгүй</p>
        <Link href="/dashboard/my-pets" className="text-[#4f9669] hover:underline">
          ← Миний амьтад руу буцах
        </Link>
      </div>
    );
  }

  return <PetDetailContent pet={pet} />;
}
