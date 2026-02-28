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
import Logo from '../_components/Logo';
import { HeaderUserMenu } from '../_features/HeaderParts';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
export type { MedicalRecordItem };
import Image from 'next/image';
import { CuteSleepingCatLoader } from '../_components/loading/CuteSleepingCatLoader';
import { toast } from 'sonner';

export default function Profile() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecordItem[]>([]);
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [selectedPetFilter, setSelectedPetFilter] = useState<string>('all');
  const { pets, refetchPets } = usePets();
  const { user } = useUser();
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.replace('/sign-in');
      return;
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (!isSignedIn) return;
    void refetchPets();
  }, [isSignedIn, refetchPets]);

  useEffect(() => {
    if (!isSignedIn) return;
    let cancelled = false;
    let tid = 0;
    tid = requestAnimationFrame(() => {
      if (!cancelled) setRecordsLoading(true);
    });
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
      cancelAnimationFrame(tid);
    };
  }, [isSignedIn]);

  const handleAddRecord = async (record: PetMedicalForm) => {
    try {
      const res = await fetch('/api/medical-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (!res.ok) {
        toast.error('Эрүүл мэндийн бүртгэл нэмэх үед алдаа гарлаа.');
        return;
      }
      const saved = (await res.json()) as { id: string };
      setMedicalRecords((prev) => [{ ...record, id: saved.id }, ...prev]);
      toast.success('Эрүүл мэндийн бүртгэл амжилттай нэмэгдлээ.');
    } catch {
      toast.error('Эрүүл мэндийн бүртгэл нэмэх үед алдаа гарлаа.');
    }
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
        <div className="h-40 w-40">
          <CuteSleepingCatLoader />
        </div>
      </div>
    );
  }
  if (!isSignedIn) {
    return null;
  }
  return (
    <div className="w-screen relative flex justify-center-safe">
      <div className=" fixed inset-0 z-0 min-h-screen bg-[url('/pet-background.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-background/85 backdrop-blur-xs" />
      </div>
      <main className="container w-7xl relative z-10 flex flex-col items-start pb-8 backdrop-blur-sm" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
        <div className="mb-4 w-full flex justify-between px-8 mt-4 bg-[#fafafa64]">
          <Logo />
          <HeaderUserMenu displayName={user?.fullName || 'User'} initial={user?.firstName?.charAt(0) || 'U'} imageUrl={user?.imageUrl} onSignOut={() => {}} />
        </div>
        <div className="hidden md:block  w-fit mb-3">
          <Link href="/" className="flex text-orange-950 items-center gap-2 rounded-lg px-4 text-sm text-orange-950 transition-colors hover:bg-amber-50 hover:text-amber-700">
            <ArrowLeft className="h-4 w-4" />
            Нүүр лүү буцах
          </Link>
        </div>
        <DueTodayBanner records={dueTodayRecords} />
        <div className="mb-4 flex items-center gap-2 text-sm text-amber-800/90">
          <span>Мэдэгдэл: &quot;Дараагийн огноо&quot; өнөөдөр болсон бүртгэлд л гарна.</span>
          <button
            type="button"
            onClick={async () => {
              triggerTestMedicalNotification();
              try {
                await fetch('/api/send-test-medical-email', { method: 'POST' });
              } catch {}
            }}
            className="rounded bg-amber-200 px-3 py-1.5 font-medium hover:bg-amber-300"
          >
            Мэдэгдэл + Имэйл турших
          </button>
        </div>
        <div className="flex flex-col gap-10 w-7xl items-center border-7 border-white rounded-3xl p-6 shadow-2xl py-14">
          <div className="flex w-full items-center justify-between pr-20 pl-8">
            <ProfileCard />
            <Image src="/Harmony.png" alt="Harmony" width={900} height={600} className="h-60 w-auto object-contain" />
          </div>
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
