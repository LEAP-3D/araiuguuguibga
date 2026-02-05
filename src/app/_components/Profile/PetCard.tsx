'use client';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { Pet } from '@/lib/petsContext';
import { Heart, Weight, Eye, PawPrint } from 'lucide-react';

type PetCardProps = {
  pet: Pet;
};

export function PetCard({ pet }: PetCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-60 rounded-2xl bg-white border border-[#f1e6d9] ">
          {/* Image */}
          <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-2xl relative">
            {pet.image ? (
              <Image src={pet.image} alt={pet.name} fill className="object-cover" sizes="240px" />
            ) : (
              <PawPrint className="h-12 w-12 text-gray-300" />
            )}
          </div>

          {/* Info */}
          <div className="p-4 ">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-[#463327] truncate">{pet.name}</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 capitalize">{pet.type}</span>
            </div>

            <p className="text-sm font-semibold text-[#958071]">{pet.breed}</p>

            {/* Stats */}
            <div className="flex flex-wrap gap-3 text-xs text-[#463327] pt-1">
              <div className="flex items-center gap-1 text-[#61ae7d] font-medium">{pet.age} years</div>

              <div className="flex items-center gap-1">
                <Weight className="h-3 w-3 " />
                {pet.weight} kg
              </div>

              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3 text-pink-500" />
                {pet.gender}
              </div>
            </div>
            {/* {pet.note && <p className="text-xs text-gray-500 line-clamp-2 pt-2">{pet.note}</p>} */}
          </div>

          <div className="flex justify-center">
            <div className="w-50 h-10 bg-[#f6f2e9] text-[#5e493a] font-semibold text-sm rounded-2xl border-2 border-[#eae4dc] flex justify-center gap-2 cursor-pointer items-center">
              <Eye className="w-5 h-5" />
              <p>View details</p>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-lg p-6 rounded-2xl">
        <DialogHeader>
          <DialogTitle>{pet.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-7">
          <div className="max-w-md mx-auto rounded-xl overflow-hidden shadow-md relative h-60">
            {/* Image */}
            {pet.image ? (
              <Image src={pet.image} alt={pet.name} fill className="object-cover" sizes="(max-width: 448px) 100vw, 448px" />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <PawPrint className="h-12 w-12 text-gray-300" />
              </div>
            )}
            <div className="absolute bottom-0 left-0 w-full text-white p-4">
              <h2 className="text-xl font-bold">{pet.name}</h2>
              <p>
                <strong>Төрөл:</strong> {pet.type}
              </p>
              <p>
                <strong>Үүлдэр:</strong> {pet.breed}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-35 h-17 bg-[#f6f2e9] rounded-2xl flex items-center justify-center">
              <p>
                <strong>Нас:</strong> {pet.age}
              </p>
            </div>
            <div className="w-35 h-17 bg-[#f6f2e9] rounded-2xl flex items-center justify-center">
              <p>
                <strong>Жин:</strong> {pet.weight} кг
              </p>
            </div>
            <div className="w-35 h-17 bg-[#f6f2e9] rounded-2xl flex items-center justify-center">
              <p>
                <strong>Huis:</strong> {pet.gender}
              </p>
            </div>
          </div>
          <div className="w-115 h-17 bg-[#f3f4f0] rounded-2xl flex items-center justify-center">
            <p>
              <strong>Тэмдэглэл:</strong> {pet.note}
            </p>
          </div>
          <div className="w-115 h-17 bg-[#faf0ea] rounded-2xl flex items-center justify-center">
            <p>
              <strong>Allergies:</strong> {pet.allergies}
            </p>
          </div>
          <div className="w-115 h-17 bg-[#f6f2e9] rounded-2xl flex items-center justify-center">
            <p>
              <strong>Microchip ID:</strong> {pet.microchip}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
