'use client';

import AddPetDialog from '@/app/_components/Profile/AddPetDialog';
import { useRouter } from 'next/navigation';
import { PawPrint, Syringe } from 'lucide-react';
import ProfileCard from '../_components/Profile/ProfileCard';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectLabel, SelectValue } from '@/components/ui/select';
import VaccinationCard from '../_components/Profile/VaccinationCard';

import AddVaccineRecord from '../_components/Profile/AddVaccineRecord';

export default function Profile() {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/');
  };
  return (
    <div className="relative min-h-screen bg-[linear-gradient(#4fa673_0_20%,#faf8f5_20%_100%)]">
      <div className="absolute bottom-0 h-[80%] w-full bg-[url('/paws.svg')] bg-repeat bg-size-[110px] opacity-40 pointer-events-none" />
      <main className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <button className="mb-6 font-medium px-4 py-2 hover:bg-green-100 rounded-lg transition" onClick={handleButtonClick}>
          ← Back to home
        </button>
        <div className="flex flex-col gap-5 items-center">
          <ProfileCard />

          {/* PETS SECTION */}
          <div className="rounded-2xl w-200 shadow-lg p-6 flex flex-col overflow-auto ">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <PawPrint className="text-green-700" /> My Pets
            </h3>
            <div className="gap-3 flex  overflow-auto ">
              <AddPetDialog />
            </div>
          </div>

          <div className="w-200 h-fit bg-green-100 rounded-2xl p-6 flex flex-col shadow-lg gap-6">
            <div className="flex justify-between">
              <div className="flex gap-1 items-start">
                <div className="p-3 bg-[#70a3705b] rounded-full">
                  <Syringe className="text-green-700" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl font-bold">Vaccination Record</p>
                  <p className="text-sm text-gray-600">Keep track of your pets vaccinations</p>
                </div>
              </div>
              <AddVaccineRecord />
            </div>
            <div className="flex flex-col gap-4">
              <Select>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="All Pets" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>All Pets</SelectLabel>
                    <SelectItem value="pet">All Pets</SelectItem>
                    <SelectItem value="pet">Bumble</SelectItem>
                    <SelectItem value="pet">Kitty</SelectItem>
                    <SelectItem value="pet">Tommy</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <VaccinationCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
