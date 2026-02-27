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

export function ProfileMedicalSection({ pets, records, loading, selectedPetFilter, onFilterChange, onAddRecord }: Props) {
  return (
    <div className="w-full lg:w-6xl h-fit rounded-2xl flex flex-col gap-4 sm:gap-6" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div className="flex flex-col gap-3 p-2 sm:flex-row sm:items-start sm:justify-between sm:p-4">
        <div className="flex gap-3 items-start">
          <div className="p-3 bg-[#ff6f001f] rounded-full">
            <Syringe className="text-orange-300" />
          </div>
          <div className="flex flex-col">
            <p className="text-xl font-bold">Эрүүл мэндийн бүртгэл</p>
            <p className="text-sm text-[#988375]">Вакцин, эмчилгээ, эмийн хэрэглээг хянах</p>
          </div>
        </div>
        <AddMedicalRecord pets={pets} onAddRecord={onAddRecord} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-[#988375] sm:mb-4">
          <Filter className="w-4 h-4" />
          <p>Амьтнаар шүүх:</p>
          <Select value={selectedPetFilter} onValueChange={onFilterChange}>
            <SelectTrigger className="h-9 min-w-[120px] px-3 pr-8 text-[#503f34] rounded-xl border bg-[#faf8f6] sm:px-5 sm:pr-11">
              <SelectValue placeholder="Select Pet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Бүгд</SelectItem>
              {pets.map((pet) => (
                <SelectItem key={pet.id} value={pet.name}>
                  {pet.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap gap-3 sm:gap-5">
          {loading ? (
            <p className="w-full py-6 text-center text-sm text-gray-500 sm:py-8 sm:text-base">Бүртгэлүүдийг ачааллаж байна...</p>
          ) : records.length === 0 ? (
            <p className="w-full py-6 text-center text-sm text-gray-500 sm:py-8 sm:text-base">Одоогоор эрүүл мэндийн бүртгэл байхгүй байна. Эхний бүртгэлээ нэмээрэй!</p>
          ) : (
            records.map((record) => <MedicalCard key={record.id ?? record.medicine + record.date} record={record} />)
          )}
        </div>
      </div>
    </div>
  );
}

