"use client";

import Image from "next/image";
import { PawPrint } from "lucide-react";

export function PetImage({ image }: { image: string }) {
  const isUrl =
    image.startsWith("http") ||
    image.startsWith("/") ||
    image.startsWith("data:");
  if (isUrl) {
    return (
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        unoptimized={image.startsWith("data:")}
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
      <PawPrint className="h-16 w-16 text-amber-400" />
    </div>
  );
}
