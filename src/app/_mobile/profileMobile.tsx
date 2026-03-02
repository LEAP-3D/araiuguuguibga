'use client';

import AddPetDialog from '@/app/_components/Profile/AddPetDialog';
import { PawPrint } from 'lucide-react';
import ProfileCard from '../_components/Profile/ProfileCard';
import { PetCard } from '../_components/Profile/PetCard';
import { DueTodayBanner } from '../profile/DueTodayBanner';
import { ProfileMedicalSection, type MedicalRecordItem } from '../profile/ProfileMedicalSection';
import type { PetMedicalForm } from '../_components/Profile/AddMedicalRecord';
import type { Pet } from '@/lib/petsContext';

type Props = {
  pets: Pet[];
  dueTodayRecords: MedicalRecordItem[];
  records: MedicalRecordItem[];
  loading: boolean;
  deletingRecordId?: string | null;
  selectedPetFilter: string;
  onFilterChange: (v: string) => void;
  onAddRecord: (record: PetMedicalForm) => Promise<void>;
  onDeleteRecord: (id: string) => Promise<void>;
  onBack: () => void;
  onTestNotification: () => void;
};

export default function ProfileMobile({
  pets,
  dueTodayRecords,
  records,
  loading,
  deletingRecordId,
  selectedPetFilter,
  onFilterChange,
  onAddRecord,
  onDeleteRecord,
  onBack,
  onTestNotification,
}: Props) {
  return (
    <div className="relative w-full min-h-[100dvh]">
      <div className="fixed inset-0 z-0 bg-[url('/pet-background.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-background/85 backdrop-blur-xs" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-[450px] px-4 pt-4 pb-[calc(env(safe-area-inset-bottom)+96px)]">
        <button className="mb-3 rounded-lg px-3 py-2 font-medium transition hover:text-orange-950" onClick={onBack}>
          ← Нүүр хуудас
        </button>

        <DueTodayBanner records={dueTodayRecords} />

        <div className="mt-3 rounded-2xl">
          <ProfileCard />
        </div>

        <section className="mt-4">
          <div className="mb-3 flex items-center justify-between px-1">
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <PawPrint className="text-orange-400" /> Миний тэжээвэр амьтад
            </h3>
            <span className="rounded-full bg-white/70 px-2.5 py-1 text-xs text-[#6d5d50]">{pets.length}</span>
          </div>

          <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2">
            <div className="shrink-0 snap-start rounded-2xl bg-white/70 p-1 backdrop-blur-sm">
              <AddPetDialog />
            </div>

            {pets.map((pet) => (
              <div key={pet.id} className="shrink-0 snap-start">
                <PetCard pet={pet} />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-xl backdrop-blur-md">
          <div className="mb-3 flex flex-col gap-2 text-sm text-amber-800/90">
            <span>Мэдэгдэл: &quot;Дараагийн огноо&quot; өнөөдөр болсон бүртгэлд л гарна.</span>
            <button type="button" onClick={onTestNotification} className="w-fit rounded-lg bg-amber-200 px-3 py-2 font-medium hover:bg-amber-300">
              Мэдэгдэл турших
            </button>
          </div>

          <ProfileMedicalSection
            pets={pets}
            records={records}
            loading={loading}
            deletingRecordId={deletingRecordId}
            selectedPetFilter={selectedPetFilter}
            onFilterChange={onFilterChange}
            onAddRecord={onAddRecord}
            onDeleteRecord={onDeleteRecord}
          />
        </section>
      </main>
    </div>
  );
}
