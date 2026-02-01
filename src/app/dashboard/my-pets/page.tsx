"use client";

import Link from "next/link";
import { Plus, PawPrint } from "lucide-react";
import { usePosts } from "@/lib/postsContext";

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
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gray-100">
      <PawPrint className="h-12 w-12 text-gray-400" />
    </div>
  );
}

export default function MyPetsPage() {
  const { myPets } = usePosts();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Миний амьтад</h1>
        <p className="text-gray-600">
          Таны бүртгэсэн амьтдын жагсаалт
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {myPets.map((pet) => (
          <Link
            key={pet.id}
            href={`/dashboard/my-pets/${pet.id}`}
            className="group block cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-[#4f9669]/30"
          >
            <div className="mb-4 flex h-20 items-center justify-center">
              <PetImage image={pet.image} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{pet.name}</h3>
            <p className="text-sm text-gray-600">{pet.breed}</p>
            {pet.age && (
              <p className="mt-1 text-xs text-gray-500">{pet.age}</p>
            )}
          </Link>
        ))}

        <Link
          href="/dashboard/add-pet"
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 p-6 transition-colors hover:border-[#4f9669]/50 hover:bg-[#4f9669]/5"
        >
          <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Plus className="h-8 w-8 text-gray-400" />
          </div>
          <span className="font-medium text-gray-600">Амьтан нэмэх</span>
        </Link>
      </div>

      {myPets.length === 0 && (
        <p className="mt-6 text-center text-sm text-gray-500">
          Амьтан бүртгээгүй байна. &quot;Амьтан нэмэх&quot; дээр дарж эхлээрэй.
        </p>
      )}
    </div>
  );
}
