'use client';

import { Filter, Syringe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MedicalCard from '../_components/Profile/MedicalCard';
import AddMedicalRecord from '../_components/Profile/AddMedicalRecord';
import type { PetMedicalForm } from '../_components/Profile/AddMedicalRecord';
import type { Pet } from '@/lib/petsContext';

export type MedicalRecordItem = PetMedicalForm & { id?: string };

type Props = {
  pets: Pet[];
  records: MedicalRecordItem[];
  loading: boolean;
  selectedPetFilter: string;
  onFilterChange: (value: string) => void;
  onAddRecord: (record: PetMedicalForm) => Promise<void>;
};

export function ProfileMedicalSection({
  pets,
  records,
  loading,
  selectedPetFilter,
  onFilterChange,
  onAddRecord,
}: Props) {
  return (
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
        <AddMedicalRecord pets={pets} onAddRecord={onAddRecord} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 text-[#988375] items-center h-5 mb-4">
          <Filter className="w-4 h-4" />
          <p>Filter by pet:</p>
          <Select value={selectedPetFilter} onValueChange={onFilterChange}>
            <SelectTrigger className="px-5 py-2 pr-11 text-[#503f34] rounded-xl border bg-[#faf8f6] ">
              <SelectValue placeholder="Select Pet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {pets.map((pet) => (
                <SelectItem key={pet.id} value={pet.name}>
                  {pet.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap gap-5">
          {loading ? (
            <p className="text-gray-500 text-center w-full py-8">Loading records...</p>
          ) : records.length === 0 ? (
            <p className="text-gray-500 text-center w-full py-8">No medical records yet. Add your first record above!</p>
          ) : (
            records.map((record) => (
              <MedicalCard key={record.id ?? record.medicine + record.date} record={record} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
