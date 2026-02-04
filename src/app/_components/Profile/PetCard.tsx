'use client';
import type { Pet } from '@/lib/petsContext';
import { Heart, Weight, CakeSlice, PawPrint } from 'lucide-react';

type PetCardProps = {
  pet: Pet;
};

export function PetCard({ pet }: PetCardProps) {
  return (
    <div className="w-60 rounded-2xl bg-[#fefdfc] border border-[#f1e6d9] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
        {pet.image ? <img src={pet.image} alt={pet.name} className="h-full w-full object-cover" /> : <PawPrint className="h-12 w-12 text-gray-300" />}
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg text-gray-800 truncate">{pet.name}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 capitalize">{pet.type}</span>
        </div>

        <p className="text-sm text-gray-500">{pet.breed}</p>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-600 pt-1">
          <div className="flex items-center gap-1">
            <CakeSlice className="h-3 w-3" />
            {pet.age}
          </div>

          <div className="flex items-center gap-1">
            <Weight className="h-3 w-3" />
            {pet.weight}
          </div>

          <div className="flex items-center gap-1">
            <Heart className="h-3 w-3 text-pink-500" />
            {pet.gender}
          </div>
        </div>

        {/* Note */}
        {pet.note && <p className="text-xs text-gray-500 line-clamp-2 pt-2">{pet.note}</p>}
      </div>
    </div>
  );
}
