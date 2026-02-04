'use client';
import { createContext, useContext, useState } from 'react';
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
  addPet: (pet: Pet) => void;
};

const PetsContext = createContext<PetsContextType | null>(null);

export function PetsProvider({ children }: { children: ReactNode }) {
  const [pets, setPets] = useState<Pet[]>([]);

  const addPet = (pet: Pet) => {
    setPets((prev) => [pet, ...prev]);
  };

  return <PetsContext.Provider value={{ pets, addPet }}>{children}</PetsContext.Provider>;
}

export const usePets = () => {
  const ctx = useContext(PetsContext);
  if (!ctx) throw new Error('usePets must be used inside PetsProvider');
  return ctx;
};
