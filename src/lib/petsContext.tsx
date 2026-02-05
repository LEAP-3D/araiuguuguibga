'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type Pet = {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  weight: string;
  gender: string;
  note: string;
  allergies?: string;
  microchip?: string;
  image?: string;
};

type PetsContextType = {
  pets: Pet[];
  addPet: (pet: Omit<Pet, 'id'>) => Promise<void>;
  refetchPets: () => Promise<void>;
  petsLoading: boolean;
};

const PetsContext = createContext<PetsContextType | null>(null);

function mapApiPetToPet(p: {
  id: string;
  name: string;
  type: string;
  breed?: string | null;
  age?: string | null;
  weight?: string | null;
  gender?: string | null;
  note?: string | null;
  allergies?: string | null;
  microchip?: string | null;
  image?: string | null;
}): Pet {
  return {
    id: p.id,
    name: p.name,
    type: p.type,
    breed: p.breed ?? '',
    age: p.age ?? '',
    weight: p.weight ?? '',
    gender: p.gender ?? '',
    note: p.note ?? '',
    allergies: p.allergies ?? undefined,
    microchip: p.microchip ?? undefined,
    image: p.image ?? undefined,
  };
}

export function PetsProvider({ children }: { children: ReactNode }) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [petsLoading, setPetsLoading] = useState(false);

  const refetchPets = useCallback(async () => {
    setPetsLoading(true);
    try {
      const res = await fetch('/api/pets');
      const data = res.ok ? await res.json() : [];
      setPets(Array.isArray(data) ? data.map(mapApiPetToPet) : []);
    } catch {
      setPets([]);
    } finally {
      setPetsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetchPets();
  }, [refetchPets]);

  const addPet = useCallback(
    async (pet: Omit<Pet, 'id'>) => {
      const res = await fetch('/api/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: pet.name,
          type: pet.type,
          breed: pet.breed || null,
          age: pet.age || null,
          weight: pet.weight || null,
          gender: pet.gender || null,
          note: pet.note || null,
          allergies: pet.allergies || null,
          microchip: pet.microchip || null,
          image: pet.image || null,
        }),
      });
      if (!res.ok) return;
      const saved = await res.json();
      setPets((prev) => [mapApiPetToPet(saved), ...prev]);
    },
    []
  );

  return (
    <PetsContext.Provider value={{ pets, addPet, refetchPets, petsLoading }}>
      {children}
    </PetsContext.Provider>
  );
}

export const usePets = () => {
  const ctx = useContext(PetsContext);
  if (!ctx) throw new Error('usePets must be used within PetsProvider');
  return ctx;
};
