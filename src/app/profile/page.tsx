'use client';
/* eslint-disable max-lines */

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import AddPetDialog from '@/app/_components/Profile/AddPetDialog';
import { PawPrint } from 'lucide-react';
import ProfileCard from '../_components/Profile/ProfileCard';
import type { PetMedicalForm } from '../_components/Profile/AddMedicalRecord';
import { PetCard } from '../_components/Profile/PetCard';
import { usePets } from '@/lib/petsContext';
import { getTodayStr, toDateOnlyStr } from './profileDateUtils';
import { DueTodayBanner } from './DueTodayBanner';
import { ProfileMedicalSection, type MedicalRecordItem } from './ProfileMedicalSection';
import { useMedicalNotifications, triggerTestMedicalNotification } from './useMedicalNotifications';
import ProfileMobile from '../_mobile/profileMobile';

export type { MedicalRecordItem };
function useIsMobile(breakpointPx = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpointPx}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [breakpointPx]);
  return isMobile;
}

export default function Profile() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecordItem[]>([]);
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [selectedPetFilter, setSelectedPetFilter] = useState<string>('all');
  const { pets, refetchPets } = usePets();
  const isMobile = useIsMobile(768);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.replace('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (!isSignedIn) return;
    void refetchPets();
  }, [isSignedIn, refetchPets]);

  useEffect(() => {
    if (!isSignedIn) return;
    let cancelled = false;
    fetch('/api/medical-records')
      .then((res) => (res.ok ? res.json() : []))
      .then((data: MedicalRecordItem[]) => {
        if (!cancelled && Array.isArray(data)) {
          setMedicalRecords(
            data.map((r) => ({
              id: r.id,
              pet: r.pet,
              type: r.type as PetMedicalForm['type'],
              medicine: r.medicine,
              vet: r.vet ?? '',
              note: r.note ?? '',
              date: r.date,
              nextDueDate: r.nextDueDate ?? '',
            }))
          );
        }
      })
      .catch(() => {
        if (!cancelled) setMedicalRecords([]);
      })
      .finally(() => {
        if (!cancelled) setRecordsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isSignedIn]);

  const handleButtonClick = () => router.push('/');
  const handleAddRecord = async (record: PetMedicalForm) => {
    try {
      const res = await fetch('/api/medical-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (!res.ok) return;
      const saved = (await res.json()) as { id: string };
      const newRecord: MedicalRecordItem = { id: saved.id, ...record };
      setMedicalRecords((prev) => [newRecord, ...prev]);
    } catch {}
  };

  const filteredRecords = selectedPetFilter === 'all' ? medicalRecords : medicalRecords.filter((r) => r.pet === selectedPetFilter);
  const dueTodayRecords = useMemo(() => {
    const today = getTodayStr();
    return medicalRecords.filter((r) => {
      const d = toDateOnlyStr(r.date);
      const next = toDateOnlyStr(r.nextDueDate);
      return d === today || (next && next === today);
    });
  }, [medicalRecords]);
  useMedicalNotifications(dueTodayRecords);
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background/90">
        <p className="text-gray-600">Aчааллаж байна...</p>
      </div>
    );
  }
  if (!isSignedIn) return null;
  if (isMobile) {
    return (
      <ProfileMobile
        pets={pets}
        dueTodayRecords={dueTodayRecords}
        records={filteredRecords}
        loading={recordsLoading}
        selectedPetFilter={selectedPetFilter}
        onFilterChange={setSelectedPetFilter}
        onAddRecord={handleAddRecord}
        onBack={handleButtonClick}
        onTestNotification={triggerTestMedicalNotification}
      />
    );
  }
  // ✅ DESKTOP LAYOUT 
  return (
    <div className="w-screen relative flex justify-center-safe">
      <div className=" fixed inset-0 z-0 min-h-screen bg-[url('/pet-background.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-background/85 backdrop-blur-xs" />
      </div>
      <main className="container w-7xl relative z-10 flex flex-col items-start py-8 backdrop-blur-sm">
        <button className="mb-6 font-medium px-4 py-2 hover:text-orange-950 rounded-lg transition" onClick={handleButtonClick}>
          ← Нүүр хуудас руу буцах
        </button>

        <DueTodayBanner records={dueTodayRecords} />
        <div className="mb-4 flex items-center gap-2 text-sm text-amber-800/90">
          <span>Мэдэгдэл: &quot;Дараагийн огноо&quot; өнөөдөр болсон бүртгэлд л гарна.</span>
          <button type="button" onClick={triggerTestMedicalNotification} className="rounded bg-amber-200 px-3 py-1.5 font-medium hover:bg-amber-300">
            Мэдэгдэл турших
          </button>
        </div>

        <div className="flex flex-col gap-10 w-7xl items-center border-7 border-white rounded-3xl p-6 shadow-2xl py-14">
          <div className="w-6xl flex justify-start">
            <ProfileCard />
          </div>
          {/* PETS SECTION */}
          <div className="rounded-2xl w-6xl  flex flex-col overflow-auto ">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <PawPrint className="text-orange-400" /> Миний тэжээвэр амьтад
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
          <ProfileMedicalSection
            pets={pets}
            records={filteredRecords}
            loading={recordsLoading}
            selectedPetFilter={selectedPetFilter}
            onFilterChange={setSelectedPetFilter}
            onAddRecord={handleAddRecord}
          />
        </div>
      </main>
    </div>
  );
}
