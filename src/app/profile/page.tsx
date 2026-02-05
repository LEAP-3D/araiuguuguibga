'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import AddPetDialog from '@/app/_components/Profile/AddPetDialog';
import { Bell, Filter, PawPrint, Syringe } from 'lucide-react';
import ProfileCard from '../_components/Profile/ProfileCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MedicalCard from '../_components/Profile/MedicalCard';
import AddMedicalRecord from '../_components/Profile/AddMedicalRecord';
import type { PetMedicalForm } from '../_components/Profile/AddMedicalRecord';
import { PetCard } from '../_components/Profile/PetCard';
import { usePets } from '@/lib/petsContext';

export type MedicalRecordItem = PetMedicalForm & { id?: string };

function toDateOnlyStr(d: string | undefined): string {
  if (!d) return '';
  try {
    const date = new Date(d);
    return date.toISOString().split('T')[0];
  } catch {
    return d.slice(0, 10);
  }
}

function getTodayStr(): string {
  return new Date().toISOString().split('T')[0];
}

export default function Profile() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecordItem[]>([]);
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [selectedPetFilter, setSelectedPetFilter] = useState<string>('all');
  const { pets, refetchPets } = usePets();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.replace('/sign-in');
      return;
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (!isSignedIn) return;
    refetchPets();
  }, [isSignedIn, refetchPets]);

  useEffect(() => {
    if (!isSignedIn) return;
    let cancelled = false;
    setRecordsLoading(true);
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

  const handleButtonClick = () => {
    router.push('/');
  };

  const handleAddRecord = async (record: PetMedicalForm) => {
    try {
      const res = await fetch('/api/medical-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (!res.ok) return;
      const saved = (await res.json()) as { id: string };
      setMedicalRecords((prev) => [{ ...record, id: saved.id }, ...prev]);
    } catch {
      // ignore
    }
  };

  const filteredRecords =
    selectedPetFilter === 'all'
      ? medicalRecords
      : medicalRecords.filter((record) => record.pet === selectedPetFilter);

  const dueTodayRecords = useMemo(() => {
    const today = getTodayStr();
    return medicalRecords.filter((r) => {
      const d = toDateOnlyStr(r.date);
      const next = toDateOnlyStr(r.nextDueDate);
      return d === today || (next && next === today);
    });
  }, [medicalRecords]);

  useEffect(() => {
    if (dueTodayRecords.length === 0 || typeof window === 'undefined' || !('Notification' in window)) return;
    const today = getTodayStr();
    const key = 'medical-notif-date';
    const lastShown = localStorage.getItem(key);
    if (lastShown === today) return;
    if (Notification.permission === 'granted') {
      const title = dueTodayRecords.length === 1 ? '1 medical reminder today' : `${dueTodayRecords.length} medical reminders today`;
      const body = dueTodayRecords.slice(0, 3).map((r) => `${r.pet}: ${r.type}${r.nextDueDate ? ' (due)' : ''}`).join('; ');
      try {
        new Notification(title, { body });
        localStorage.setItem(key, today);
      } catch {
        // ignore
      }
      return;
    }
    if (Notification.permission === 'default') {
      Notification.requestPermission().then((p) => {
        if (p === 'granted' && dueTodayRecords.length > 0) {
          try {
            new Notification(
              dueTodayRecords.length === 1 ? '1 medical reminder today' : `${dueTodayRecords.length} medical reminders today`,
              { body: dueTodayRecords.slice(0, 3).map((r) => `${r.pet}: ${r.type}`).join('; ') }
            );
            localStorage.setItem(key, today);
          } catch {
            // ignore
          }
        }
      });
    }
  }, [dueTodayRecords]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background/90">
        <p className="text-gray-600">Loading...</p>
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
      <main className="container w-7xl relative z-10 flex flex-col items-start py-8 backdrop-blur-sm">
        <button className="mb-6 font-medium px-4 py-2 hover:text-orange-950 rounded-lg transition" onClick={handleButtonClick}>
          ← Back to home
        </button>

        {dueTodayRecords.length > 0 && (
          <div className="mb-6 w-full max-w-2xl rounded-xl border border-amber-200 bg-amber-50/95 dark:bg-amber-950/30 dark:border-amber-800 p-4 shadow-sm flex items-start gap-3">
            <Bell className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-amber-900 dark:text-amber-100">Today&apos;s medical reminders</p>
              <ul className="text-sm text-amber-800 dark:text-amber-200 list-disc list-inside space-y-0.5">
                {dueTodayRecords.map((r) => (
                  <li key={r.id ?? `${r.pet}-${r.date}-${r.type}`}>
                    <span className="font-medium">{r.pet}</span>: {r.type}
                    {r.medicine ? ` — ${r.medicine}` : ''}
                    {toDateOnlyStr(r.nextDueDate) === getTodayStr() ? ' (due today)' : ''}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

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
              <AddMedicalRecord pets={pets} onAddRecord={handleAddRecord} />
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
                    {pets.map((pet) => (
                      <SelectItem key={pet.id} value={pet.name}>
                        {pet.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-wrap gap-5">
                {recordsLoading ? (
                  <p className="text-gray-500 text-center w-full py-8">Loading records...</p>
                ) : filteredRecords.length === 0 ? (
                  <p className="text-gray-500 text-center w-full py-8">No medical records yet. Add your first record above!</p>
                ) : (
                  filteredRecords.map((record) => <MedicalCard key={record.id ?? record.medicine + record.date} record={record} />)
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
