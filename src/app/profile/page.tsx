'use client';

import AddPetDialog from '@/app/_components/Profile/AddPetDialog';
import { useRouter } from 'next/navigation';
import { Filter, PawPrint, Syringe } from 'lucide-react';
import ProfileCard from '../_components/Profile/ProfileCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MedicalCard from '../_components/Profile/MedicalCard';
import AddMedicalRecord from '../_components/Profile/AddMedicalRecord';
import { PetCard } from '../_components/Profile/PetCard';
import { usePets } from '@/lib/petsContext';

export default function Profile() {
  const { pets } = usePets();
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-[#fff8eb]">
      <div className="absolute bottom-0 h-[80%] w-full bg-[url('/paws.svg')] bg-repeat bg-size-[110px] opacity-40 pointer-events-none" />

      <main className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <button className="mb-6 font-medium px-4 py-2 hover:bg-green-100 rounded-lg transition" onClick={() => router.push('/')}>
          ← Back to home
        </button>

        <div className="flex flex-col gap-5 items-center">
          <ProfileCard />

          <div className="rounded-2xl w-200 shadow-lg p-6 flex flex-col overflow-auto bg-white">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <PawPrint className="text-green-700" /> My Pets
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3 overflow-auto">
                <AddPetDialog />
              </div>

              {/* Pets list */}
              <div className="flex flex-wrap gap-4">
                {pets.map((pet) => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
              </div>
            </div>
          </div>

          <div className="w-200 h-fit bg-green-100 rounded-2xl p-6 flex flex-col shadow-lg gap-6">
            <div className="flex justify-between items-start gap-4">
              <div className="flex gap-2 items-start">
                <div className="p-3 bg-[#70a3705b] rounded-full">
                  <Syringe className="text-green-700" />
                </div>

                <div className="flex flex-col">
                  <p className="text-xl font-bold">Medical Record</p>
                  <p className="text-sm text-gray-600">Track vaccinations, treatments & medications</p>
                </div>
              </div>

              <AddMedicalRecord />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2 items-center text-gray-600">
                <Filter className="w-4 h-4" />
                <p className="text-sm">Filter by pet:</p>

                <Select>
                  <SelectTrigger className="w-full max-w-48 rounded-xl border bg-white">
                    <SelectValue placeholder="Select Pet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="bumble">Bumble</SelectItem>
                    <SelectItem value="kitty">Kitty</SelectItem>
                    <SelectItem value="tommy">Tommy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <MedicalCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
