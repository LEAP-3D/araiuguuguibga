'use client';

import AddPetDialog from '@/app/_components/Profile/AddPetDialog';
import MedicalCard from '@/app/_components/Profile/MedicalCard';
import AddMedicalRecord from '@/app/_components/Profile/AddMedicalRecord';
import type { PetMedicalForm } from '../_components/Profile/AddMedicalRecord';
import type { Pet } from '@/lib/petsContext';
import { LogOut } from 'lucide-react';
import { CuteSleepingCatLoader } from '../_components/loading/CuteSleepingCatLoader';
import UserProfileCardMobile from './_components/UserProfileCardMobile';

type Props = {
  pets: Pet[];
  dueTodayRecords: Array<PetMedicalForm & { id?: string }>;
  records: Array<PetMedicalForm & { id?: string }>;
  loading: boolean;
  deletingRecordId?: string | null;
  selectedPetFilter: string;
  onFilterChange: (v: string) => void;
  onAddRecord: (record: PetMedicalForm) => Promise<void>;
  onDeleteRecord: (id: string) => Promise<void>;
  onLogout: () => void;
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
  onLogout,
  onTestNotification,
}: Props) {
  void dueTodayRecords;
  void selectedPetFilter;
  void onFilterChange;

  return (
    <div className="relative w-full min-h-[100dvh]" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div className="fixed inset-0 z-0 bg-[url('/pet-background.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-background/85 backdrop-blur-xs" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-[430px] px-3.5 pt-3.5 pb-[calc(env(safe-area-inset-bottom)+96px)] text-[#121212]">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[25px] font-semibold leading-none">Миний Профайл</h2>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onTestNotification} className="rounded-full border border-[#53aaf0] px-3 py-2.5 text-sm font-bold text-[#2393ea]">
              Мэдэгдэл
            </button>
            <button type="button" className="rounded-2xl border border-[#f7c5c5] bg-[#ffeaea] p-2.5 text-[#d52d2d]" onClick={onLogout}>
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
        <UserProfileCardMobile pets={pets} />
        <section className="py-4">
          {' '}
          {pets.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#dbe5f0] bg-[#f8fbff] p-3 text-center text-sm text-[#667085]">Одоогоор нэмсэн pet байхгүй байна.</div>
          ) : (
            <div className="-mx-0.5 flex gap-2 overflow-x-auto px-0.5 pb-1">
              {pets.map((pet) => (
                <div key={pet.id} className="w-34 shrink-0 rounded-2xl border border-[#d8e5f3] bg-[#eff7ff] p-2">
                  <div className="mb-1.5 h-20 w-full overflow-hidden rounded-xl bg-white">
                    {pet.image ? (
                      // eslint-disable-next-line @next/next/no-img-element -- dynamic pet image URL
                      <img src={pet.image} alt={pet.name || 'pet'} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xl">{pet.type === 'dog' ? '🐶' : pet.type === 'cat' ? '🐱' : '🐾'}</div>
                    )}
                  </div>
                  <p className="line-clamp-1 text-sm font-black text-[#12263a]">{pet.name || 'Pet'}</p>
                  <p className="line-clamp-1 text-xs font-medium text-[#4a647a]">{pet.breed || 'Үүлдэргүй'}</p>
                  <p className="mt-0.5 text-xs text-[#5d7488]">Нас: {pet.age || '—'}</p>
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="px-0.5">
          <AddPetDialog compact trigger="button" buttonLabel="Амьтан нэмэх" />
        </section>

        <section className="mt-4 rounded-2xl border border-white/60 bg-white/75 p-3 shadow-xl backdrop-blur-md">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xl font-semibold">Эмчилгээний бүртгэл</p>
          </div>

          <div className="mb-3">
            <AddMedicalRecord pets={pets} onAddRecord={onAddRecord} compact />
          </div>

          {loading ? (
            <CuteSleepingCatLoader />
          ) : records.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-500">доогоор эмчилгээний бүртгэл байхгүй.</p>
          ) : (
            <div className="space-y-3">
              {records.map((record) => (
                <MedicalCard key={record.id ?? record.medicine + record.date} record={record} deleting={Boolean(record.id && deletingRecordId === record.id)} onDelete={onDeleteRecord} compact />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
