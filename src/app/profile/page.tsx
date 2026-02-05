'use client';

import AddPetDialog from '@/app/_components/Profile/AddPetDialog';
import { useRouter } from 'next/navigation';
import { Filter, PawPrint, Syringe } from 'lucide-react';
import ProfileCard from '../_components/Profile/ProfileCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MedicalCard from '../_components/Profile/MedicalCard';
import AddMedicalRecord from '../_components/Profile/AddMedicalRecord';
import type { PetMedicalForm } from '../_components/Profile/AddMedicalRecord';
import { PetCard } from '../_components/Profile/PetCard';
import { usePets } from '@/lib/petsContext';
import { useState } from 'react';

export default function Profile() {
  const [medicalRecords, setMedicalRecords] = useState<PetMedicalForm[]>([]);
  const [selectedPetFilter, setSelectedPetFilter] = useState<string>('all');
  const { pets } = usePets();
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/');
  };
  const handleAddRecord = (record: PetMedicalForm) => {
    setMedicalRecords((prev) => [...prev, record]);
  };

  // Filter medical records based on selected pet
  const filteredRecords = selectedPetFilter === 'all' ? medicalRecords : medicalRecords.filter((record) => record.pet === selectedPetFilter);

  return (
    <div className="w-screen relative flex justify-center-safe">
      <div className=" fixed inset-0 z-0 min-h-screen bg-[url('/pet-background.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-background/85 backdrop-blur-xs" />
      </div>
      <main className="container w-7xl relative z-10 flex flex-col items-start py-8 backdrop-blur-sm">
        <button className="mb-6 font-medium px-4 py-2 hover:text-orange-950 rounded-lg transition" onClick={handleButtonClick}>
          ← Back to home
        </button>
        <div className="flex flex-col gap-10 w-7xl items-center border-7 border-white rounded-3xl p-6 shadow-2xl py-14">
          <div className="w-6xl flex justify-start">
            <ProfileCard />
          </div>

          {/* PETS SECTION */}
          <div className="rounded-2xl w-6xl  flex flex-col overflow-auto ">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <PawPrint className="text-green-700" /> My Pets
            </h3>
            <div className="gap-3 flex  overflow-auto ">
              <AddPetDialog />
              <div className="flex flex-wrap gap-4">
                {pets.map((pet) => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
              </div>
            </div>
          </div>

          <div className="w-6xl h-fit rounded-2xl flex flex-col  gap-6">
            <div className="flex justify-between">
              <div className="flex gap-3 items-start">
                <div className="p-3 bg-[#94c1945b] rounded-full">
                  <Syringe className="text-green-700" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl font-bold">Medical Record</p>
                  <p className="text-sm text-[#988375]">Track vaccinations, treatments & medications</p>
                </div>
              </div>
              <AddMedicalRecord onAddRecord={handleAddRecord} />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 text-[#988375] items-center h-5 mb-4">
                <Filter className="w-4 h-4" />
                <p>Filter by pet:</p>
                <Select value={selectedPetFilter} onValueChange={setSelectedPetFilter}>
                  <SelectTrigger className="px-5 py-2 pr-11 text-[#503f34] rounded-xl border bg-[#faf8f6] ">
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
              <div className="flex flex-wrap gap-5">
                {filteredRecords.length === 0 ? (
                  <p className="text-gray-500 text-center w-full py-8">No medical records yet. Add your first record above!</p>
                ) : (
                  filteredRecords.map((record, index) => <MedicalCard key={index} record={record} />)
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
